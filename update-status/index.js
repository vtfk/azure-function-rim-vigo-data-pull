const rimClient = require('rim-service-client')

module.exports = async function (context, request) {
  const args = rimClient.saveStatusArchived(request.body.status)

  const options = {
    url: process.env.VGO_URL,
    username: process.env.VGO_USERNAME,
    password: process.env.VGO_PASSWORD,
    data: args
  }

  try {
    const data = await rimClient(options)
    context.log('Status sent to vigo')
    context.res = {
      contentType: 'application/json',
      status: 200,
      body: data
    }
  } catch (error) {
    context.log.error(error)
    context.res = {
      contentType: 'application/json',
      status: 400,
      body: { error: error.message }
    }
  }
}
