const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('yahoo360', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

const checkConnectDatabase = async ()=> {
    try {
        await sequelize.authenticate();
        console.log('Connection database successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export default checkConnectDatabase;