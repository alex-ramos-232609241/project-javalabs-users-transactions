const AppException = require('../../commons/supports/error.support')

class CustomException extends AppException {
  constructor(code, message, details, httpStatus) {
    super(code, message);
    this.name = 'CustomException';
    this.message = message;
    this.httpStatus = httpStatus;
    if (details) {
      if (Array.isArray(details) && details.length > 0) {
        let detailsMod = [];
        details.forEach((element) => {
          detailsMod.push(element.replace('\"', '*'));
        });
        this.details = detailsMod;
      } else {
        this.details = details;
      }
    }

  }
}

module.exports = CustomException;