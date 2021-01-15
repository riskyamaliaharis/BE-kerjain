const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  authPekerja: (request, response, next) => {
    let token = request.headers.authPekerja
    console.log(token)
    token = token.split(' ')[1]
    jwt.verify(token, 'KERJAIN', (error, result) => {
      if (
        (error && error.name === 'JsonWebTokenError') ||
        (error && error.name === 'TokenExpiredError')
      ) {
        console.log(error)
        return helper.response(response, 400, error.message)
      } else {
        console.log(result)
        request.token = result
        next()
      }
    })
  },
  authRequiter: (request, response, next) => {
    let token = request.headers.authRequiter
    token = token.split(' ')[1]
    jwt.verify(token, 'KERJAIN', (error, result) => {
      if (
        (error && error.name === 'JsonWebTokenError') ||
        (error && error.name === 'TokenExpiredError')
      ) {
        console.log(error)
        return helper.response(response, 400, error.message)
      } else {
        console.log(result)

        if (result.user_role === 1) {
          request.token = result
          next()
        } else {
          return helper.response(
            response,
            202,
            'Sorry :)) Just Requiter Can do that '
          )
        }
      }
    })
  }
}
