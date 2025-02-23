const {_bindQueryParams, _bindQueryParamsNameTable} = require('./supports/service.support');
const managerConnectionDB = require('../repository/manager-connection');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = {
    
  async executeQueryPOSTGRESQL({statement, values = {}}, nameDB) {
    const query = await _bindQueryParams( statement, values);
    const response = await managerConnectionDB(nameDB, query);
    return response;
    },
    
    async addNameTable({statement, values = {}}) {
        return await _bindQueryParamsNameTable( statement, values);
    },

    async executeQueryPOSTGRESQLBuilding({statement, values = {}}, nameDB) {
      const query = await _bindQueryParamsBuilding( statement, values);
      const response = await managerConnectionDB(nameDB, query);
      return response;
  },
    
    async calculationRegistrationDate(){
      return new Date().toISOString();
    },

    httpConstant(){
      var httpConstant = {
        OK_STATUS: { code: 200, description: "OK" },
        CREATED_STATUS: { code: 201, description: "CREATED" },
        NO_CONTENT_STATUS: { code: 204, description: "NO CONTENT" },
        BAD_REQUEST_STATUS: { code: 400, description: "BAD REQUEST" },
        UNAUTHORIZED_STATUS: { code: 401, description: "UNAUTHORIZED" },
        FORBIDDEN_STATUS: { code: 403, description: "FORBIDDEN" },
        NOT_FOUND_STATUS: { code: 404, description: "NOT FOUND" },
        UNPROCESSABLE_ENTITY_STATUS: { code: 422, description: "UNPROCESSABLE ENTITY" },
        INTERNAL_SERVER_ERROR_STATUS: { code: 500, description: "INTERNAL SERVER ERROR" }
      };
      return Object.freeze(httpConstant);
    },
    async createAccessToken(user) {
      function genJti() {
        let jti = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 16; i++) {
            jti += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return jti;
      }
      
      const userNotId = _.omit(user, 'key_user');
      return jwt.sign(userNotId, process.env.TOKEN_SECRET,{
      issuer: process.env.ISSUER,
      audience: process.env.AUDIENCE,
      expiresIn: '15m',
      subject: "software|orders",
      jwtid: genJti(), 
      algorithm: 'HS256'
      });
    },
  async createRefreshAccessToken(user) {
      function genJti() {
        let jti = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 16; i++) {
            jti += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return jti;
      }
      const userNotId = _.omit(user, 'key_user');
      return jwt.sign(userNotId,process.env.REFRESH_TOKEN_SECRET,{
        issuer: process.env.ISSUER,
        audience: process.env.AUDIENCE,
        expiresIn: '24h',
        subject: "software|orders",
        jwtid: genJti(), 
        algorithm: 'HS256'
      });
    },
}
