const DataAccess = require('../data-access');

module.exports= {
    async existsUserId(value){
        return await DataAccess.existsUserId(value);
    },
    async handleBalance(payload){
        return await DataAccess.handleBalance(payload);
    }
}