const {
    LIST_USERS,
    SAVE_USERS,
    EXISTS_USER_EMAIL
} = require('./supports/database.constant');
const { executeQueryPOSTGRESQL, addNameTable } = require('../commons/service');
module.exports={
    async listUsers(payload){
        
        const users = 'users'
        const LIST_USERS_BIND = await addNameTable({
            statement: LIST_USERS,
            values: {
                users
            }
        });
        
        const response = await executeQueryPOSTGRESQL({
            statement: LIST_USERS_BIND,
            values:{
               
            }
        }, 'POSTGRESQL')

         return {
            amountOfUsers: response.rowCount,
            listOfUsers: response.rows.reverse()
         };
    },
async saveUsers(payload){
        
        const users = 'users';
        const {name, email} = payload.body;
        const SAVE_USERS_BIND = await addNameTable({
            statement: SAVE_USERS,
            values: {
                users
            }
        });
        
        const response = await executeQueryPOSTGRESQL({
            statement: SAVE_USERS_BIND,
            values:{
               name,
               email
            }
        }, 'POSTGRESQL')
        
         return {
            userSave: response.rows[0]
         };
    },
    async existsUser(payload){
        const {
            email
        } = payload;
        return await executeQueryPOSTGRESQL({
            statement: EXISTS_USER_EMAIL,
            values:{
               email
            }
        }, 'POSTGRESQL');
    },
}
