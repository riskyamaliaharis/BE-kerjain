const connection = require('../config/mysql')

module.exports = {
  getJobseekerCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) FROM user WHERE user_role=0',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },

  getFulltimeFreelanceCountModel: (sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) FROM user WHERE user_role=0 AND user_job_type=${sort}`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },

  getJobseekerModel: (sort, search, limit, offset) => {
    return new Promise((resolve, reject) => {
      if (sort === '') {
        connection.query(
          `SELECT * FROM user WHERE user_name LIKE %${search}% ORDER BY user_name LIMIT ${limit} OFFSET ${offset}`,
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error))
          }
        )
      } else if (search === '') {
        if (sort === 'user_name' || sort === 'user_location') {
          connection.query(
            `SELECT * FROM user WHERE user_name LIKE %${search}% ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error))
            }
          )
        }
      }
    })
  }
}
