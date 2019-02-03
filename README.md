# javascript-object-storage-management
Web, server ve mobil için depolama yönetimi sistemi

```js

const config = {
     prefix:"controllerStorage",
     uniqueKey:"_id",
     sync : true,
     timestamp:{
         enable:true,
         type:"toLocaleString()"
     }
 }
 const db = new Database(config)

 **** veri ekle ****
const config = {
     prefix:"controllerStorage",
     uniqueKey:"_id",
     sync : true,
     timestamp:{
         enable:true,
         type:"toLocaleString()"
     }
 }
 const db = new Database(config)

 **** veri ekle ****
 @example 
 db.create(data) // yeni veri oluştur
  /-* parametre içerikleri 
  create(
      data:data, // eklenecek veriler
      timestamp:true, // created_at ve updated_at eklenir
      dataMultiple:true // data çoğul ise veriler döngü içinde eklenir
      ) 


 **** verileri çek ****
 @example 
 db.get() // son veriyi çeker

 @example 
 db.getAll() // tüm verileri çeker
 
 @example 
 db.getInMonth() // 30 gün içindeki verileri çeker

 @example 
 db.getInMonth(14) // 14 gün içindeki verileri çeker

 @example 
 db.getInWeek() // hafta içinde eklenen verileri çeker

 @example 
 db.getInDay() // gün içinde eklenen verileri çeker
    
    *** sorgularla veri çekme  ***
    db = db.where("a","==",a)
    db.get()

 **** Düzenlemeler ****
 
 @example 
 db.where("id","==",id).delete() // veriyi sil
 //eğer verinin karşılığı birden fazlaysa ...
 @example 
 db.where("name","==",name).deleteAll() // veriyi sil


 **** Koşullar ****
 @example 
 db.where("a","==",a) //tekil where :)

 @example 
 db.where("a","!=",a) //tekil where :)

 @example 
 db.wherePlural([ //çoğul and where :)
     ["a","==",a],
     ["a","==",b],
     ["c","==",b],
 ])

 @example 
 db.orWherePlural([ //çoğul or where :)
     ["a","==",a],
     ["a","==",b],
     ["c","==",b],
 ])

 @example 
 db.whereGroup({ //where group :)
     $and:[
         ["a","==",a],
        ["a","==",b],
        ["c","==",b],
     ],
    $or:[
        ["a","==",a],
        ["a","==",b],
        ["c","==",b],
     ],
 })

@example 
db.limit(100) // Limit :)

@example 
db.take(10,24) // take :)

@example 
db.order("id") // order :)

@example 
db.select("id","name","created_at") // select :)

```
