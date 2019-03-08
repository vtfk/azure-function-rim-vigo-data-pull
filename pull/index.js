const rimClient = require('rim-service-client')

function parseData (data = {}, context) {
  if (!data.HentDataForArkiveringResponseElm) throw Error('Invalid data in vigo response')
  if (!data.HentDataForArkiveringResponseElm.Elevelement) throw Error('Invalid data in vigo reponse')

  const { Feilmelding: error, Elevelement: documents } = data.HentDataForArkiveringResponseElm
  // No documents found
  if (error.FeilId === '0' && error.Feiltype !== '') {
    throw Error('No new documentes found in vigo. Exiting...')
  // Other errors
  } else if (error.FeilId !== '0') {
    throw Error(`
      FeilId: ${error.FeilId}\n
      Feiltype: ${error.Feiltype}\n
      DetaljertBeskrivelse: ${error.DetaljertBeskrivelse}
    `)
  // Everything on it's right place
  } else {
    documents.forEach(document => context.log(`Data funnet: ${document.Fornavn} ${document.Etternavn}`))
    return JSON.stringify(documents, null, 2)
  }
}

module.exports = async function (context, request) {
  const antallElevDokument = request.body.antallElevDokument || 1
  const args = rimClient.getDataToArchive({
    antallElevDokument,
    fylke: process.env.VGO_FYLKE
  })

  const options = {
    url: process.env.VGO_URL,
    username: process.env.VGO_USERNAME,
    password: process.env.VGO_PASSWORD,
    data: args
  }

  try {
    const data = await rimClient(options)
    const documents = parseData(data, context)
    context.log(documents)
    context.res = {
      contentType: 'application/json',
      status: 200,
      body: documents
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
