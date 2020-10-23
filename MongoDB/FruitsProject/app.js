//jshint esversion: 6
//assert is always to do with testing

//use mongoose
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name specified"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

//create a doc called 'fruit' from the model/collection above called 'Fruit'
const fruit = new Fruit({
  rating: 10,
  review: "Peaches are yummy!"
});

//save the fruit doc into the Fruit collection in the fruitsDB
//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema //relationship and embedding document
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "Mango",
  score: 9,
  review: "Juicy mango!"
});

//mango.save();

Person.updateOne({
  name: "John"
}, {
  favoriteFruit: mango
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully update the document.")
  }
});

//person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit!"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   score: 5,
//   review: "Too sour for me"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Weird texture"
// });

//add batch of data
// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });

//find a certain element
Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    //remember to close the connection whenever done
    mongoose.connection.close();

    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    })
  }
});


//update data using Mongoose
// Fruits.updateOne({_id:""}, {name:"Peach"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully update the document.")
//   }
// });


//delete data using Mongoose
Fruit.deleteOne({
  _id: "5f8bc0c64f5556dd04c76f6b"
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully delete the document.")
  }
});

Person.deleteOne({
  _id: "5f8bb1897d4377da47938eca"
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully delete the document.")
  }
});
