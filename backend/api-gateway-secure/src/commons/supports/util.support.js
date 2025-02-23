  class Types{
    static isEmpty(...values) {
      for (let i = 0; i < values.length; i++) {
        const valor = values[i];
        if ([null, void 0, "undefined", "null", "", 0, false, "false", []].includes(valor) || Array.isArray(valor) && valor.length === 0 || valor.constructor === Object && Object.entries(valor).length === 0) {
          return true;
        }
      }
      return false;
    }
  }
  
module.exports = {
  Types
}
