const SqlString = require('sqlstring');
module.exports = {
  async _bindQueryParams(sql, values) {
    try {
      let bindSql = `${sql}`;
      Object.keys(values).forEach((tp) => {
        const value2 = SqlString.escape(values[tp]);
        bindSql = bindSql.replace(new RegExp(`:${tp}\\b`, "g"), value2);
      });
      return bindSql;
    } catch (error) {
      console.log(error);
    }
  },

  async _bindQueryParamsNameTable(sql, values) {
    try {
      let bindSql = `${sql}`;
      let bindSqlNotCom = '';
      Object.keys(values).forEach((tp) => {
        const value2 = SqlString.escape(values[tp]);

        bindSql = bindSql.replace(new RegExp(`::${tp}\\b`, "g"), value2);
        bindSqlNotCom = bindSql.replaceAll("'", "");
      });
      return bindSqlNotCom;
    } catch (error) {
      console.log(error);
    }
  },
  async _bindQueryParamsBuilding(sql, values) {
    try {
      let bindSql = `${sql}`;
      let bindSqlNotCom= '';
      Object.keys(values).forEach((tp) => {
        const value2 = SqlString.escape(values[tp]);
        bindSql = bindSql.replace(new RegExp(`:${tp}\\b`, "g"), value2);
        bindSqlNotCom = bindSql.replaceAll("'", "");
      });
      return bindSqlNotCom;
    } catch (error) {
      console.log(error);
    }
  },

}
