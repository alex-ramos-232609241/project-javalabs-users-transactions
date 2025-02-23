
const Joi = require('@hapi/joi');
const Validation = require('../commons/validation')
const ErrorConstant = require('./supports/error.constant');
const CommonsService = require('../commons/service');
let HttpConstant = CommonsService.httpConstant();

const {Types} = require('../commons/supports/util.support');
const CustomException = require('../commons/supports/custom.exception');
module.exports = {
    async validationSaveTransactions(payload){
        const schemaSaveTransactions = Joi.object({
            user_id: Joi.number().greater(0).required(),
            amount: Joi.number().positive().precision(2).required(),
            type: Joi.string()
            .valid('deposit', 'withdrawal')
            .required()
            .messages({
              'any.only': 'The "type" field can only be "deposit" or "withdrawal".',
            }),
        });
        await Validation.validate(schemaSaveTransactions, payload).catch((reason) => {
            new CustomException(
              ErrorConstant.ERROR_VALIDATION_DATA_TRANSACTIONS.code,
              ErrorConstant.ERROR_VALIDATION_DATA_TRANSACTIONS.message,
              HttpConstant.BAD_REQUEST_STATUS.code,
            ).throw(!Types.isEmpty(reason));
          });
    },
    
}
