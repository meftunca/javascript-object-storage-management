
## React native için yönetilebilir AsyncStorage sınıfı

### Amaç
***React native*** ve ***Web*** için 3.paket uygulama ihtiyacı duymadan ***react native*** ile gelen **AsyncStorage** kullanarak yerel veritabanı kullanmayı sağlamak.

#### Çalışma mantığı
İlk önce AsyncStorage ile yeni bir item oluşturulur veya hali hazırda varsa alınır. Class içinde bir değere bu item atanır. İtem'ın varsayılan değeri [ ] boş bir dizidir. Bu sebeple atanan değer push methoduyla diziye aktarılır. Sınıfın save methoduylada AsyncStorage güncellenir.

#### Database Oluşturma

```js
import  {AsyncStorage} from "react-native";
import DataStore from "javascript-object-storage-management"
const DB = new DataStore("user",AsyncStorage);//localStorage yada sessionStorage
```

#### Veri ekleme

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
#### Çoklu Veri ekleme

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
DB.set(data);	
```
##### Veri Çekme

```js
DB.get();//tüm verileri çeker
DB.get(5);//ilk 5 veriyi çeker	
DB.take(5);//ilk 5 veriyi çeker
DB.takeRight(5);//son 5 veriyi çeker
DB.slice(4,10);//indis değerleri 4-10 arasında olan verileri çeker    
```

##### Veri Güncelleme
Veri güncellenirken güncellenecek nesneyi bulmak için nesneye ait değerleri **sorguNesnesi**'ne ekleyerek sorgulamak tüm nesnelerin **yeniDeger**'deki verilerle güncellenmesini engelleyecektir.
```js
let yeniDeger ={first_name:"meftunca"};
let sorguNesnesi = {id:12}
DB.update(yeniDeger,sorguNesnesi);//tüm verileri çeker
```

##### Veri Silme

```js
DB.delete(id,20);
```
##### Verileri Kaydetme
```js
DB.save();
```
##### Veritabanını Sıfırlama
```js
DB.destroy();
```

### Sorgular
#### Sıralama Fonksiyonları

##### sortBy => sort(key="id",type="asc" || "desc")
```js
DB.sortBy("first_name","desc")
```
##### orderBy => orderBy(keyArray, typeArray)
```js 
let users = [//örnek dizi
 { 'user': 'fred',   'age': 48 },
 { 'user': 'barney', 'age': 34 },
 { 'user': 'fred',   'age': 40 },
 { 'user': 'barney', 'age': 36 }
];
DB.orderBy(['user','age'], ['asc','desc'])
```

#### Seçim Fonksiyonları

##### select => select(keyArray)
```js
DB.select("user","age");//girilen anahtar isimlerini seçer.(sql select gibi çalışır)
```
##### notSelect => notSelect(keyArray)
```js
DB.notSelect("user","age");//girilen anahtar isimleri dışındaki değerleri seçer.
```

#### Arama Fonksiyonları
##### find => find(Array || Object ||  Function )
[Lodashta inceleyin](https://lodash.com/docs/4.17.11#find)
```js
let data= [
	{ 'user': 'barney', 'age': 36, 'active': true },
	{ 'user': 'fred', 'age': 40, 'active': false },
	{ 'user': 'pebbles', 'age': 1, 'active': true }
];
DB.find( function(o) { return o.age < 40; });
// => 'barney'
DB.find( { 'age': 1, 'active': true });
// => 'pebbles'
DB.find( ['active', false]);
// => 'fred'
DB.find( 'active');
```

#### difference => difference(key, value)
Veritabanı içinden girilen key, value çiftiyle aynı olamayan verileri listeler

```js
DB.difference("id",3);
//=>[{id:1,...},{id:2,...}....]
```
