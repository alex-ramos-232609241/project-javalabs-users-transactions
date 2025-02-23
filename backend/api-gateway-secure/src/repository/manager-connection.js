const {SingletonCreateDbConnectionPOSTGRESQL} = require('./driver-connection-postgresql');

    async function managerConnectionDB(d, query){
        switch (d) {
            case 'POSTGRESQL':
                const instDb = await SingletonCreateDbConnectionPOSTGRESQL.getInstance();
                return await instDb.executeQueryPostgreSQL(query);
            default:
                break;
        }
    }

module.exports=managerConnectionDB;
