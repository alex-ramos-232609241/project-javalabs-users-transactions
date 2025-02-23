const Joi = require('@hapi/joi');
const Ajv = require("ajv");
const localize = require("ajv-i18n")
const ValidationException = require('./supports/validation.support');
const ExceptionConstant = require('./supports/exception.support');

module.exports = {
    async validate(schema, payload){
        if (Joi.isSchema(schema)) {
          const validation = schema.validate(payload, {
            abortEarly: false,
            allowUnknown: true,
            convert: false,
            errors: { language: "spanish" }
          });
          if (validation.error) {
            const messagesError = [];
            validation.error.details.forEach((value) => {
              messagesError.push(value.message);
            });
            new ValidationException(
              ExceptionConstant.VALIDATION_EXCEPTION.code,
              messagesError
            ).throw();
          }
        } else {

          const ajv = new Ajv({ allErrors: true, jsonPointers: false });
          require('ajv-errors')(ajv);
          ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
          const valid = ajv.validate(schema, payload);
          if (!valid) {
            localize.es(ajv.errors);
            const messagesError = ajv.errors.map((obj) => {
              if (obj.keyword === "type") {
                return `${obj.dataPath.replace(/\//g, ".")} ${obj.message}`;
              }
              return obj.message;
            });
            new ValidationException(
              ExceptionConstant.VALIDATION_EXCEPTION.code,
              messagesError
            ).throw();
          }
        }
      }
}
