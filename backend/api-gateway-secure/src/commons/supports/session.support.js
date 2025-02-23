const {LIST_USER_X_ID} = require('./database.constant')
const {executeQuery} = require('../service');

module.exports= {
    async getKeyOfUser(payload){
        const {
            id,
            name,
        } = payload;
        const dateUser = await executeQuery({
            statement: LIST_USER_X_ID,
            values: {
                id,
                name
            }
        }, 'SQLite', 'keyAll')
        const { key_user } = dateUser[0];
        return key_user;
        
    }
}
