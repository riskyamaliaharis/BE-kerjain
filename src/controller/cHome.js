const {
  getJobseekerCountModel,
  getFulltimeFreelanceCountModel,
  getJobseekerModel
} = require('../model/mHome')

const helper = require('../helper/response')
const qs = require('querystring')

module.exports = {
  getJobseeker: async (req, res) => {
    try {
      let { page, limit, sort, search } = req.query
      page = parseInt(page)
      limit = parseInt(limit)

      let totalData

      if (sort === 'fulltime' || sort === 'freelance') {
        totalData = await getFulltimeFreelanceCountModel(sort)
      } else {
        totalData = await getJobseekerCountModel()
      }
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1 ? qs.stringify({ ...req.query, ...{ page: page + 1 } }) : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
          : null

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:3000/home?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/home?${prevLink}`
      }

      const result = await getJobseekerModel(limit, offset, sort, search)
      return helper.response(
        res,
        200,
        'Success Show List of Jobseekers',
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
