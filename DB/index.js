const mongodb = require('mongodb');
const DBconfig = require('./Config.json');


class DB {
    DB_Client;

    constructor() {
        this.DB_Client = new mongodb.MongoClient(`mongodb://${DBconfig.user}:${DBconfig.pwd}@${DBconfig.host}/${DBconfig.DataBase}`);
        this.DB_Client.connect();
        console.log("DB connected");

        this.test();
    }

    async test() {
        let db = await this.GetConnection();
        let result = await db.collection('Account').findOne({});

        console.log("Test Data", result);
    }

    GetConnection() {
        return this.DB_Client.db();
    }
}



module.exports = new DB();