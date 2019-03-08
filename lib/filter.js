export default class Filter {
  setData(data) {
    this.data = data;
  }
  sortBy(attr, type) {
    if (typeof a[attr] == "string") {
      return this.data.sort((a, b) => ("" + a[attr].attr).localeCompare(b[attr].attr));
    }
    return this.data.sort((a, b) => (type == "desc" ? b[attr] - a[attr] : type == "asc" ? a[attr] - b[attr] : a[attr]));
  }
  find(findObject) {
    const data = [];
    this.data.map(item => {
      let query = false;
      for (let [k, v] of Object.entries(findObject)) {
        if (item[k] == v) {
          query = true;
        } else {
          query = false;
          break;
        }
      }
      if (query) data.push(item);
    });
    return data;
  }
  select(attrs) {
    const data = [];
    this.data.map(item => {
      let obj = {};
      for (let [k, v] of Object.entries(item)) {
        for (let key of attrs) {
          if (k == key) obj[k] = v;
        }
      }
      data.push(obj);
    });

    return data;
  }
  notSelect(attrs) {
    const data = [];
    this.data.map(item => {
      let obj = {};
      for (let [k, v] of Object.entries(item)) {
        for (let key of attrs) {
          if (k != key) obj[k] = v;
        }
      }
      data.push(obj);
    });
    return data;
  }
  slice(start, end) {
    return this.data.slice(start, end);
  }
  take(limit = 5) {
    return this.data.slice(0, limit);
  }
  takeRight(limit = 5) {
    return this.data.reverse().slice(0, limit);
  }
  difference(key, value) {
    return this.data.filter(item => item[key] != value);
  }
  delete(key, id) {
    const data = [];
    this.data.map(item => {
      item[key] != id ? data.push(item) : null;
    });
    return data;
  }
}
