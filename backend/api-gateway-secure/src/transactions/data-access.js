const {
    LIST_TRANSACTIONS,
    SAVE_TRANSACTIONS,
    EXISTS_USER_EMAIL
} = require('./supports/database.constant');
const { executeQueryPOSTGRESQL, addNameTable } = require('../commons/service');
module.exports={
    async listTransactionsUser(payload){
        const {user_id} = payload.params;
        const transactions = 'transactions'
        const LIST_TRANSACTIONS_BIND = await addNameTable({
            statement: LIST_TRANSACTIONS,
            values: {
                transactions
            }
        });
        
        const response = await executeQueryPOSTGRESQL({
            statement: LIST_TRANSACTIONS_BIND,
            values:{
               user_id
            }
        }, 'POSTGRESQL')

         return {
            amountOfTransactions: response.rowCount,
            listOfTransactions: response.rows.reverse()
         };
    },
async saveTransactions(payload){
        const {user_id,amount, type} = payload.body;
        const transactions = 'transactions'
        const SAVE_TRANSACTIONS_BIND = await addNameTable({
            statement: SAVE_TRANSACTIONS,
            values: {
                transactions
            }
        });
        
        const response = await executeQueryPOSTGRESQL({
            statement: SAVE_TRANSACTIONS_BIND,
            values:{
                user_id,
                amount, 
                type
            }
        }, 'POSTGRESQL')
        
         return {
            saveTransaction: response.rows[0]
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
    async handleBalance(payload){
        // continue...
        return await executeQueryPOSTGRESQL({
            statement: '',
            values:{
            }
        }, 'POSTGRESQL');
    },
}
