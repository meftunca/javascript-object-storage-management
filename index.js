import Filter from "./lib/filter";
export default class DataStore extends Filter {
  constructor(db, storage) {
    super(db, storage);
    this.storage = storage;
    this.destroy();
    this.prefix = "dataStore@";
    this.dbName = this.prefix + db;
    this.db = [];
    this.dataStore();
    this.setData(this.db);
  }
  async dataStore() {
    try {
      const hasDataStore = await this.storage.getItem(this.dbName);
      this.db = hasDataStore != null ? this.selectDb() : this.createDb();
    } catch (e) {
      throw new Error(e);
    }
  }

  async selectDb() {
    try {
      const dataStore = await this.storage.getItem(this.dbName);
      this.db = JSON.parse(dataStore);
    } catch (e) {
      throw new Error(e);
    }
  }
  async createDb() {
    try {
      const dataStore = await this.storage.setItem(this.dbName, JSON.stringify([]));
      this.db = dataStore;
    } catch (e) {
      throw new Error(e);
    }
  }
  async save() {
    try {
      await this.storage.setItem(this.dbName, JSON.stringify(this.db));
    } catch (e) {
      throw new Error(e);
    }
  }
  multipleSet(dataArray) {
    dataArray.map(i => this.set(i));
  }
  async set(data) {
    data.id = data.id || this.db.length + 1;
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
      await this.storage.removeItem(this.dbName);
    } catch (e) {
      throw new Error(e);
    }
  }
  // query() {
  //   return new Filter(this.db);
  // }
}
