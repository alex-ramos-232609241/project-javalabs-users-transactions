const AppException = require('../../commons/supports/error.support')

class CustomException extends AppException {
    constructor(
      code,
      message,
      details,
      httpStatus,
      exception
    ) {
      super(code, message);
      this.name = 'CustomException';
      this.message = message;
      if (details) this.details = details;
  
      this.httpStatus = httpStatus;
      if (exception) {
        console.error(exception);
      }
    }
  }
  
  module.exports = CustomException;
