const DataAccess = require('../data-access');

module.exports= {
    async existsUser(value){
        return await DataAccess.existsUser(value);
    }
}