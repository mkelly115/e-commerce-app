const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection.js'); // Replace with the actual path to your Sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync sequelize models to the database
sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every server start
  .then(() => {
    console.log('Sequelize models synced to the database');
    
    // Start the server after syncing the models
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error('Error syncing Sequelize models:', error);
  });