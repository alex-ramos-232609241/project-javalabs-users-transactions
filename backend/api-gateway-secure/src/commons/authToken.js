const jwt = require('jsonwebtoken');
const utilSupport = require('../auth-user-service/util.support');

const ErrorConstant = require('./supports/error.constant');
const CustomException = require('./supports/custom.exception');

const { createAccessToken, createRefreshAccessToken } = require('../commons/service');
const CommonsService = require('../commons/service');

let HttpConstant = CommonsService.httpConstant();

module.exports = {
    async handleRefreshToken(req, res){
      const refreshTokenOfChange = req.cookies.jwt || "";
      console.log("refreshTokenOfChange", refreshTokenOfChange)
      let email = "";
      if (!refreshTokenOfChange) {
        return new CustomException(
          ErrorConstant.ERROR_AUTH_NOT_EXISTS.code,
          ErrorConstant.ERROR_AUTH_NOT_EXISTS.message,
          'The token does not exist.',
          HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
        );
      }
      try {
        const jwtSecretRefresh = process.env.REFRESH_TOKEN_SECRET;
        console.log("jwtSecretRefresh", jwtSecretRefresh)
          await jwt.verify(refreshTokenOfChange, jwtSecretRefresh,
            async function (err, decoded) {
              if (err) {
                return new CustomException(
                  ErrorConstant.ERROR_INV_TOKEN_ACCESS.code,
                  ErrorConstant.ERROR_INV_TOKEN_ACCESS.message,
                  'Invalid token of access.',
                  HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
               );
            } 
            
            try {
              if (!decoded) {
                throw new Error("User not found");
              }
              email = decoded.email;
            } catch (error) {
              return new CustomException(
                ErrorConstant.ERROR_GET_EMAIL_TOKEN.code,
                ErrorConstant.ERROR_GET_EMAIL_TOKEN.message,
                'Error getting token email.',
                HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
             );
            }
          });
        
          const isEmailExist = await utilSupport.existsUser({ email });
          console.log('IS EMAIL EXIST REFRESH TOKEN', isEmailExist)
          if (isEmailExist && isEmailExist.length == 0) {
             return new CustomException(
                ErrorConstant.ERROR_USER_NOT_EXISTS.code,
                ErrorConstant.ERROR_USER_NOT_EXISTS.message,
                'The user is not registered.',
                HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
             );
          }
          const { name, id } = isEmailExist[0];
       
          const user ={
              email,
              id, 
              name,
          }
          // generate access token
          const accessToken = await createAccessToken(user);
          const refreshToken = await createRefreshAccessToken(user);
      
          return {
            email,
            id,
            name,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          return new CustomException(
            ErrorConstant.ERROR_HAND_TOKEN.code,
            ErrorConstant.ERROR_HAND_TOKEN.message,
            'Handle token error.',
            HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
         );
        }
      }
}

