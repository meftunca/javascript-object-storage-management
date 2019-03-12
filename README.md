[![HitCount](http://hits.dwyl.com/senturk/javascript-object-storage-management.svg)](http://hits.dwyl.com/senturk/javascript-object-storage-management)

## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)


[![https://nodei.co/npm/javascript-object-storage-management.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/javascript-object-storage-management.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/javascript-object-storage-management)

# javascript-object-storage-management
## For using react-native and web projects 
```js
npm install --save javascript-object-storage-management
//or
yarn add javascript-object-storage-management
```
## Capabilities
#### Database Creation

```js
import  {AsyncStorage} from "react-native";
import DataStore from "javascript-object-storage-management"
const DB = new DataStore("user",AsyncStorage);//You can use localStorage or sessionStorage.
```

#### Adding data

```js
const data = {
	"id":  18,
	"first_name":  "Hodge",
	"last_name":  "Attaway",
	"email":  "hattawayh@yellowpages.com",
	"gender":  "Male",
	"ip_address":  "248.133.97.218"
	};
DB.set(data);	
```
#### Adding Multiple Data

```js
 const data = [
	 {
		"id":  18,
		"first_name":  "Hodge",
		"last_name":  "Attaway",
		"email":  "hattawayh@yellowpages.com",
		"gender":  "Male",
		"ip_address":  "248.133.97.218"
	},
	{
		"id":  19,
		"first_name":  "Onida",
		"last_name":  "Grouer",
		"email":  "ogroueri@nationalgeographic.com",
		"gender":  "Female",
		"ip_address":  "179.7.171.189"
	}
];
DB.multipleSet(data);	
```
##### pull data from the database

```js
DB.get();//pulls all data
DB.get(5);//pulls first 5 data	
DB.take(5);//pulls first 5 data
DB.takeRight(5);//pulls last 5 data
DB.slice(4,10);//pulls data with index values ​​between 4-10    
```

##### Data Update
 
```js
let newValueObject ={first_name:"meftunca"};
let queryObject = {id:12}
DB.update(newValueObject,queryObject);
```

##### To delete data from a database

```js
DB.delete(id,20);
```
##### Saving Data

```js
DB.save();
```
> New data is not stored unless you save changes

##### Resetting Database
```js
DB.destroy();
```

### Database queries

#### Sorting Functions

##### sortBy => sort(key="id",type="asc" || "desc")
```js
DB.sortBy("first_name","desc")
```
 

#### Selection Functions

##### select => select(keyArray)
```js
DB.select("user","age");//Selects key names entered.
```
##### notSelect => notSelect(keyArray)
```js
DB.notSelect("user","age");//Not selects key names entered..
```

#### Search Functions

##### find => find(Array || Object ||  Function )
```js
let data= [
	{ 'user': 'barney', 'age': 36, 'active': true },
	{ 'user': 'fred', 'age': 40, 'active': false },
	{ 'user': 'pebbles', 'age': 1, 'active': true }
];
 
DB.find( { 'age': 1, 'active': true });
// => 'pebbles', => 'barney'
 
```

#### difference => difference(key, value)
> Lists data that is not the same as the key and value pair entered from within the database
```js
DB.difference("id",3);
//=>[{id:1,...},{id:2,...},{id:4,...}....]
```
