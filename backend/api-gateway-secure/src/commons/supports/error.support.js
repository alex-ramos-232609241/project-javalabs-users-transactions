 const {Types} = require('../supports/util.support')
 class AppException {
    constructor(code = "0000", message = 0) {
      if (Types.isEmpty(code, message)) {
        throw new Error("Code and message are required");
      }
      this.code = code;
      this.message = Array.isArray(message) ? message : [message];
      this.name = "AppException";
      
    }
    throw(condition) {
      const appException = this;
      if (typeof condition === "undefined") {
        throw appException;
      }
      if (condition instanceof Function) {
        if (condition()) {
          throw appException;
        }
      }
      if (condition) {
        console.log("condition", condition);
        throw appException;
      }
    }
  };

  module.exports = AppException;
