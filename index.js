const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const recipe = {
      title: "Boeuf lok lak",
      level: "Amateur Chef",
      ingredients: ["rice", "tomato", "onion", "beef"],
      cuisine: "asian",
      dishType: "main_course",
      duration: 60,
      creator: "Francois",
      created: new Date()
    };
    // CREATE
    Recipe.create([recipe])
      .then((createdDocument) => {
        console.log("Create Success !!");
        console.log(createdDocument);
      })
      .catch((error) => {
        console.log(error);
      });

    // Recipe.insertMany(recipe)
    // .then((createdDocument) => {
    //   console.log("Success !!");
    //   console.log(createdDocument);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    Recipe.create(data)
      .then((createdDocument) => {
        console.log("Insert many Success !!");
        console.log(createdDocument);
        Recipe.findOneAndUpdate({
            title: "Rigatoni alla Genovese"
          }, {
            duration: 100
          }, {
            useFindAndModify: false
          })
          .then(() => {
            console.log("Update success")

            Recipe.deleteOne({
                title: "Carrot Cake"
              })
              .then(() => {
                console.log("Delete Success")
                mongoose.connection.close()
                  .then(() => console.log ("connection closed"))
                  .catch((error)=> console.log(error))
              })
              .catch(error => console.log(error))
          })
          .catch(error => console.log(error))

      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });