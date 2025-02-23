const Service = require('./services');
const Validations = require('./validations');
const CommonsService = require('../commons/service');
const ErrorConstant = require('./supports/error.constant');
const CustomException = require('./supports/custom.exception');

let HttpConstant = CommonsService.httpConstant();
module.exports={
    async listUsers(payload){
                try {
                    return await Service.listUsers(payload);
                } catch (error) {
                    return new CustomException(
                        ErrorConstant.ERROR_LIST_USERS,
                        ErrorConstant.ERROR_LIST_USERS,
                        error,
                        HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
            )
        }
    },
async saveUsers(payload){
        try {
            console.log('SAVE USER')
            console.log(payload)
            console.log('****SAVE USER')
            await Validations.validationSaveUser(payload.body)
            return await Service.saveUsers(payload);
        } catch (error) {
            return new CustomException(
                ErrorConstant.ERROR_SAVE_USERS,
                ErrorConstant.ERROR_SAVE_USERS,
                error,
                HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
            )
        }
    },
}
