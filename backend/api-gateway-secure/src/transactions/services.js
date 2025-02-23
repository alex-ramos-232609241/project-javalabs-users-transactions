const ServiceSupport = require("./supports/service.support");
const UtilSupport = require('./supports/util.supports')
const ErrorConstant = require('./supports/error.constant');
const CommonsService = require('../commons/service');
let HttpConstant = CommonsService.httpConstant();
const CustomException = require("../commons/supports/custom.exception");
module.exports={
    async listTransactionsUser(payload){
            return await ServiceSupport.listTransactionsUser(payload);
    },
    async saveTransactions(payload){
        const isEmailExist = await UtilSupport.existsUserId({ user_id: payload.body.user_id });
        
        new CustomException(
              ErrorConstant.ERROR_EXIST_EMAIL.code,
              ErrorConstant.ERROR_EXIST_EMAIL.message,
              'the user has already been registered.',
              HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
           ).throw(isEmailExist.rows && isEmailExist.rows.length === 0);
        
        if (payload.body.type === "withdrawal"){
            
            const dataBalance = await UtilSupport.handleBalance(payload);
            const {amount} = payload.body;
            const balance = dataBalance.rows[0].balance;
            new CustomException(
                ErrorConstant.ERROR_NOT_BALANCE.code,
                ErrorConstant.ERROR_NOT_BALANCE.message,
                'you do not have enough balance.',
                HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
               ).throw(balance < amount);
             
        }
        
        return await ServiceSupport.saveTransactions(payload);
    },
}
