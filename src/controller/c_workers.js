const bcrypt = require('bcrypt')
const helper = require('../helper/response')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const {
  loginCheckModel,
  registerUserModel,
  dataWorkersModel,
  dataByIdModel,
  settingWorkersModel
} = require('../model/m_workers')

module.exports = {
  DataWorkers: async (request, response) => {
    try {
      const result = await dataWorkersModel()
      return helper.response(response, 200, 'get Data suscces full', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  dataById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await dataByIdModel(id)
      return helper.response(
        response,
        200,
        'get Data history suscces full',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      console.log(request.body)

      if (request.body.user_email === '') {
        return helper.response(response, 400, 'Insert email Please :)')
      } else if (request.body.user_password === '') {
        return helper.response(response, 400, 'Insert Password Please :)')
      } else {
        const checkDataUser = await loginCheckModel(user_email)
        console.log(checkDataUser)
        if (checkDataUser.length > 0) {
          const checkPassword = bcrypt.compareSync(
            user_password,
            checkDataUser[0].user_password
          )
          console.log(checkPassword)
          if (checkPassword) {
            const {
              user_id,
              user_name,
              user_email,
              user_role
            } = checkDataUser[0]
            const paylot = {
              user_id,
              user_name,
              user_email,
              user_role
            }
            const token = jwt.sign(paylot, 'KERJAIN', { expiresIn: '10h' })
            const result = { ...paylot, token }
            return helper.response(
              response,
              200,
              'Succes Login + Pekerja +',
              result
            )
          } else {
            return helper.response(response, 404, 'wrong password !')
          }
        } else {
          return helper.response(response, 404, 'account not register !')
        }
      }
    } catch (error) {
      return helper.response(response, 404, 'bad request', error)
    }
  },
  registerWorkers: async (request, response) => {
    try {
      //   console.log(request.body)
      const { user_name, user_email, user_password } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      const setData = {
        user_name,
        user_email,
        user_password: encryptPassword
      }
      const checkDataUser = await loginCheckModel(user_email)
      if (checkDataUser.length >= 1) {
        return helper.response(response, 400, 'Email has been register :((')
      } else if (request.body.user_email === '') {
        return helper.response(response, 400, 'Insert EMAIL Please :))')
      } else if (request.body.user_password === '') {
        return helper.response(response, 400, 'Insert Password Please')
      } else if (request.body.user_phone === '') {
        return helper.response(response, 400, 'Insert your Phone Please')
      } else {
        const result = await registerUserModel(setData)
        return helper.response(response, 200, 'ok', result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  settingWorkers: async (request, response) => {
    try {
      console.log(request.body)
      const { id } = request.params
      const {
        user_image,
        user_name,
        user_jobdesc,
        user_location,
        user_workplace,
        user_description
      } = request.body
      const setData = {
        user_image: request.file === undefined ? '' : request.file.filename,
        user_name,
        user_jobdesc,
        user_location,
        user_workplace,
        user_description,
        user_updated_at: new Date()
      }
      const checkUser = await dataByIdModel(id)
      // console.log(checkUser)
      // fs.unlink(`uploads/workers/${checkUser[0].user_image}`, async (error) => {
      //   if (error) return helper.response(response, 400, 'gagal')
      // })
      if (checkUser.length > 0) {
        const result = await settingWorkersModel(id, setData)
        console.log(result)
        return helper.response(response, 200, 'Data updated', result)
      } else {
        return helper.response(response, 404, `Data Not Found By Id ${id}`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad request', error)
    }
  }
}
