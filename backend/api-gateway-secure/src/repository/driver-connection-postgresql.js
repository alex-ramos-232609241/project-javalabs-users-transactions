const { Pool } = require('pg');
class CreateDbConnection {
    
    constructor(){
       try {
        this.pool = new Pool({
            user: process.env.USER_NAME_DB,
            host: process.env.DB_MAIN_HOST,
            password: process.env.PASSWORD,
            database: process.env.DATA_BASE_NAME
        });
        this.pool.connect((err, client, release) => {
            if (err) {
                console.error('Error to connected db:', err);
            } else {
                console.log('db connection success');
                release();
            }
        });
       } catch (error) {
           console.error(`Error to create connection ${error}`);
       }
   }
    executeQueryPostgreSQL = async (query) => {
       console.log('QUERY', query)
       return this.pool.query(query);
   }
}

class SingletonCreateDbConnectionPOSTGRESQL {
    constructor(){
        throw new Error('Use Singleton.getInstance()');
    }
    static getInstance() {
        if (!SingletonCreateDbConnectionPOSTGRESQL.instance) {
            SingletonCreateDbConnectionPOSTGRESQL.instance = new CreateDbConnection();
        }
        return SingletonCreateDbConnectionPOSTGRESQL.instance;
    }
}

module.exports = {
    SingletonCreateDbConnectionPOSTGRESQL
}
