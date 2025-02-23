const DataAccess = require('../data-access');
module.exports={
    async listTransactionsUser(payload){
        return await DataAccess.listTransactionsUser(payload);
    },
async saveTransactions(payload){
        return await DataAccess.saveTransactions(payload);
    },

}
