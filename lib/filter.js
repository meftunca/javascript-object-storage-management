import _ from "lodash";
export default class Filter {
  setData(data) {
    this.data = data;
  }
  orderBy(attrs, types) {
    const data = [];
    _.filter(this.data, function(o) {
      data.push(_.orderBy(o, attrs, types));
    });
    return data;
  }
  sortBy(attr, type) {
    return this.data.sort((a, b) => (type == "desc" ? b[attr] - a[attr] : type == "asc" ? a[attr] - b[attr] : a[attr]));
  }
  find(attr) {
    return _.find(this.data, attr);
  }
  select(attrs) {
    const data = [];
    _.filter(this.data, function(o) {
      data.push(_.pick(o, attrs));
    });
    return data;
  }
  notSelect(attrs) {
    const data = [];
    _.filter(this.data, function(o) {
      data.push(_.omit(o, attrs));
    });
    return data;
  }
  slice(start, end) {
    return _.slice(this.data, start, end);
  }
  take(limit = 5) {
    return _.take(this.data, limit);
  }
  takeRight(limit = 5) {
    return _.takeRight(this.data, limit);
  }
  difference(key, value) {
    return _.differenceBy(this.data, [{ [key]: value }], key);
  }
  delete(key, id) {
    return _.remove(this.data, function(n) {
      return n[key] == id;
    });
  }
}
/* 
let data= [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];
 
DB.find( function(o) { return o.age < 40; });
// => 'barney'
 
DB.find( { 'age': 1, 'active': true });
// => 'pebbles'
 
DB.find( ['active', false]);
// => 'fred'
 
DB.find( 'active');
*/
