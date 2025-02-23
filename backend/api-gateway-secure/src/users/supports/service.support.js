const DataAccess = require('../data-access');
module.exports={
    async listUsers(payload){
        return await DataAccess.listUsers(payload);
    },
async saveUsers(payload){
        return await DataAccess.saveUsers(payload);
    },
}
