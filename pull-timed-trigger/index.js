const rimClient = require('rim-service-client')

function parseData (data = {}, context) {
  if (!data.HentDataForArkiveringResponseElm) {
    throw Error('Invalid data in vigo response')
  }
  if (!data.HentDataForArkiveringResponseElm.Elevelement) {
    throw Error('Invalid data in vigo reponse')
  }

  const { Feilmelding: error, Elevelement: documents } = data.HentDataForArkiveringResponseElm
  if (error.FeilId === '0' && error.Feiltype !== '') {
    // No documents found
    throw Error('No new documentes found in vigo. Exiting...')
  } else if (error.FeilId !== 'string') {
    // Other errors
    throw Error(`
      FeilId: ${error.FeilId}\n
      Feiltype: ${error.Feiltype}\n
      DetaljertBeskrivelse: ${error.DetaljertBeskrivelse}
    `)
  } else {
    // Everything on it's right place
    context.bindings.vigoQueue = []
    documents.forEach(document => {
      context.log(`Data funnet: ${document.Fornavn} ${document.Etternavn}`)
      const { Dokumentelement: { Dokumentfil }, ...message } = document // Removes base64 file since message queue is max 64kb

      // Add message to queue
      context.log(`${document.Dokumentelement.Dokumenttype} message added to queue`)
      context.bindings.vigoQueue.push(message)

      const { Dokumentfil: file, DokumentId: id } = document.Dokumentelement
      if (file) {
        // Add file to blob if "document.Dokumentfil" is set
        context.log(`${id} file added to blob`)
        context.bindings.vigoBlob = file
      }
    })
    return JSON.stringify(documents, null, 2)
  }
}

module.exports = async function (context) {
  const args = rimClient.getDataToArchive({
    antallElevDokument: process.env.VGO_ANTALL_ELEV_DOKUMENT || 1,
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
  } catch (error) {
    context.log.error(error)
  }
}
