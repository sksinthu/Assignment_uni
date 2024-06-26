const mongoose = require('mongoose');

module.exports = function(callback) {
  const mongoURI = process.env.MONGO_URI; // Use environment variable for MongoDB URI

  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
      console.log("Connected to MongoDB");

      const foodCollection = mongoose.connection.db.collection("food_items");
      const foodData = await foodCollection.find({}).toArray();
      console.log("Food Items:", foodData);

      const categoryCollection = mongoose.connection.db.collection("foodCategory");
      const categoryData = await categoryCollection.find({}).toArray();
      console.log("Categories:", categoryData);

      callback(null, foodData, categoryData);
    })
    .catch(err => {
      console.error("Error connecting to MongoDB:", err);
      callback(err, null, null);
    });
};
