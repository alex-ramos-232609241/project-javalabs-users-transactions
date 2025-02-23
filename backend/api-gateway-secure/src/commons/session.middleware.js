const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { handleRefreshToken } = require('./authToken');
const { getKeyOfUser } = require('./supports/session.support');
const CommonsService = require('../commons/service');

module.exports = {
    clearToken(res){
      res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'strict' });
    },
    async authenticateMiddleware(req, res, next){
      console.log('authenticate middleware')
    try {
        let accessToken = (req.headers.authorization.split(" ")[1] === 'undefined') ? undefined : req.headers.authorization.split(" ")[1];
        let refreshToken = (req.cookies.jwt === 'undefined') ? undefined : req.cookies.jwt;

      if (!refreshToken && !accessToken){
         return res.status(401).json({message: 'Authentication required'})
      }  
        const jwtSecret = process.env.TOKEN_SECRET;
        const jwtSecretRefresh = process.env.REFRESH_TOKEN_SECRET;
        let decodedAccessToken, decodedRefreshToken;

        if (accessToken) {
            decodedAccessToken = jwt.verify(accessToken, jwtSecret);
        }

        if (refreshToken) {
            decodedRefreshToken = jwt.verify(refreshToken, jwtSecretRefresh);
        }

        if (!decodedAccessToken && decodedRefreshToken) {
            decodedAccessToken = jwt.verify(refreshToken, jwtSecretRefresh);
            const user = {
              id: decodedAccessToken.id,
              name: decodedAccessToken.name,
              email: decodedAccessToken.email
            }
            const newAccessToken = CommonsService.createAccessToken(user)
            res.setHeader('Authorization', `Bearer ${newAccessToken}`);
        }

        if (!decodedAccessToken) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
        } catch (err) {
          if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'token expiration' });
        }
      }
    },
    async getKeyUserMiddleware(req, res, next) {
      let refreshToken = req.cookies.jwt;
      const jwtSecretRefresh = process.env.REFRESH_TOKEN_SECRET;
      const decoded = jwt.decode(refreshToken, jwtSecretRefresh)
      const key_user = await getKeyOfUser(decoded);
      
      if (!req.user) {
        req.user = {};
      }
      const {id, name} = decoded;
      req.user["id"] = id;
      req.user["name"] = name;
      req.user["key_user"] = key_user;
      next();
    },
    async handleRefreshTokenMiddleware(req, res){
      const responseHandleRefreshToken = await handleRefreshToken(req, res);
      const {
        accessToken,
        refreshToken, 
        email,
        id,
        name
      } = responseHandleRefreshToken;
        
        res.cookie("jwt", refreshToken, { 
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });
     
      res.status(200).send({
          accessToken,
          name,
          id, 
          email
      });
    }
}
