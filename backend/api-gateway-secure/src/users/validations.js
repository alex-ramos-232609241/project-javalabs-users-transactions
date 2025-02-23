const Joi = require('@hapi/joi');
const Validation = require('../commons/validation')
const ErrorConstant = require('./supports/error.constant');
const CommonsService = require('../commons/service');
let HttpConstant = CommonsService.httpConstant();

const {Types} = require('../commons/supports/util.support');
const CustomException = require('../commons/supports/custom.exception');
module.exports = {
    async validationSaveUser(payload){
        const schemaSaveUser = Joi.object({
            name: Joi.string().min(6).max(255).required(),
            email: Joi.string().min(6).max(255).required().email(),
        });
        await Validation.validate(schemaSaveUser, payload).catch((reason) => {
            new CustomException(
              ErrorConstant.ERROR_VALIDATION_DATA_USER.code,
              ErrorConstant.ERROR_VALIDATION_DATA_USER.message,
              HttpConstant.BAD_REQUEST_STATUS.code,
            ).throw(!Types.isEmpty(reason));
          });
    },
    
}
