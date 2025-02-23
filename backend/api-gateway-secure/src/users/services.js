const ServiceSupport = require("./supports/service.support");
const UtilSupport = require('./supports/util.supports')
const ErrorConstant = require('./supports/error.constant');
const CommonsService = require('../commons/service');
let HttpConstant = CommonsService.httpConstant();
const CustomException = require("../commons/supports/custom.exception");
module.exports={
    async listUsers(payload){

            return await ServiceSupport.listUsers(payload);
    },
async saveUsers(payload){
    const isEmailExist = await UtilSupport.existsUser({ email: payload.body.email });
        
         new CustomException(
               ErrorConstant.ERROR_EXIST_EMAIL.code,
               ErrorConstant.ERROR_EXIST_EMAIL.message,
               'the user has already been registered.',
               HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
            ).throw(isEmailExist.rows && isEmailExist.rows.length > 0);
        return await ServiceSupport.saveUsers(payload);
    },
}
