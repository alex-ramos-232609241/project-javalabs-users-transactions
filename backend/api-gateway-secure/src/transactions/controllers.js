const Service = require('./services');
const CommonsService = require('../commons/service');
const ErrorConstant = require('./supports/error.constant');
const CustomException = require('./supports/custom.exception');
const Validation = require('./validations');
let HttpConstant = CommonsService.httpConstant();
module.exports={
    async listTransactionsUser(payload){
                try {
                    return await Service.listTransactionsUser(payload);
                } catch (error) {
                    return new CustomException(
                        ErrorConstant.ERROR_LIST_TRANSACTIONS,
                        ErrorConstant.ERROR_LIST_TRANSACTIONS,
                        error,
                        HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
            )
        }
    },
async saveTransactions(payload){
        try {
            await Validation.validationSaveTransactions(payload.body);
            return await Service.saveTransactions(payload);
        } catch (error) {
            return new CustomException(
                ErrorConstant.ERROR_SAVE_TRANSACTIONS,
                ErrorConstant.ERROR_SAVE_TRANSACTIONS,
                error,
                HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
            )
        }
    },

}
