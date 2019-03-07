import { AsyncStorage } from "react-native";
import uuid from "react-native-uuid";
import _ from "lodash";
import Filter from "./lib/filter";

export default class DataStore extends Filter {
  constructor(db) {
    super(db);
    this.destroy();
    this.prefix = "dataStore@";
    this.dbName = this.prefix + db;
    this.db = [];
    this.dataStore();
    this.setData(this.db);
  }
  async dataStore() {
    try {
      const hasDataStore = await AsyncStorage.getItem(this.dbName);
      this.db = hasDataStore != null ? this.selectDb() : this.createDb();
    } catch (e) {
      throw new Error(e);
    }
  }

  async selectDb() {
    try {
      const dataStore = await AsyncStorage.getItem(this.dbName);
      this.db = JSON.parse(dataStore);
    } catch (e) {
      throw new Error(e);
    }
  }
  async createDb() {
    try {
      const dataStore = await AsyncStorage.setItem(this.dbName, JSON.stringify([]));
      this.db = dataStore;
    } catch (e) {
      throw new Error(e);
    }
  }
  async save() {
    try {
      await AsyncStorage.setItem(this.dbName, JSON.stringify(this.db));
    } catch (e) {
      throw new Error(e);
    }
  }
  multipleSet(dataArray) {
    dataArray.map(i => this.set(i));
  }
  async set(data) {
    data.id = data.id || uuid.v1();
    try {
      this.db.push(data);
      this.setData(this.db);
    } catch (e) {
      throw new Error(e);
    }
  }
  get(limit) {
    return limit ? this.db.slice(0, limit) : this.db;
  }

  update(dataObject, findAttr) {
    let data = this.find(findAttr);
    let changeData = this.difference(data, dataObject, "id");
    changeData.map((i, k) => {
      Object.entries(dataObject).map(item => {
        changeData[k][item[0]] = item[1];
      });
    });
    let newData = _.unionBy(changeData, this.db, "id");
    this.db = [];
    this.multipleSet(newData);
  }

  async destroy() {
    try {
      await AsyncStorage.removeItem(this.dbName);
    } catch (e) {
      throw new Error(e);
    }
  }
  // query() {
  //   return new Filter(this.db);
  // }
}
