const { SMSHelper } = require('./../utilidad/SMSHelper.js')
const functions = require('firebase-functions')

exports.handler = issue => {
  console.log(issue)

  const titulo = issue.issueTitle
  const appName = issue.appName

  const numCelular = functions.config().configuration.numcelularerror

  const mensaje = `Error en la app ${appName} => ${titulo}`

  return SMSHelper(mensaje, numCelular).catch(error =>
    console.error(`${error}`)
  )
}
