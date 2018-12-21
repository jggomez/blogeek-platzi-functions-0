const functions = require('firebase-functions')
const admin = require('firebase-admin')
const usuarioController = require('./componentes/usuarios/UsuarioController.js')
const notificacionController = require('./componentes/notificaciones/NotificacionesController.js')
const postsController = require('./componentes/posts/PostsController.js')
const errorController = require('./componentes/errores/ErrorController.js')
const analiticasController = require('./componentes/analiticas/AnaliticasController.js')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

admin.initializeApp()
admin.firestore().settings({ timestampsInSnapshots: true })

// firebase functions:config:set configuration.email="XXXX" configuration.password="XXXXXX"
// firebase functions:config:set configuration.claveapihubspot="XXXX"
// firebase functions:config:set configuration.numcelularerror="XXXX"
// firebase functions:config:set configuration.accountsidtwilio="XXXX"
// firebase functions:config:set configuration.authtokentwilio="XXXX"

app.post('/v1', (req, resp, next) => {
  return postsController
    .enviarPostsSemana(req.body.data.topico)
    .then(() => {
      return resp.status(200).json({
        resultado: true
      })
    })
    .catch(error => {
      return next(new Error(error.toString()))
    })
})

app.use((error, req, res, next) => {
  if (error) {
    console.error(`${error}`)
    return res.status(500).json({
      responseError: error.message
    })
  }

  return console.error(`${error}`)
})

exports.creacionUsuario = functions.auth
  .user()
  .onCreate(usuarioController.usuarioCreacionController)

exports.eliminacionUsuario = functions.auth
  .user()
  .onDelete(usuarioController.usuarioEliminadoController)

exports.creacionUsuarioCRM = functions.auth
  .user()
  .onCreate(usuarioController.creacionUsuarioCRM)

exports.registrarTopico = functions.firestore
  .document('/tokens/{id}')
  .onCreate(notificacionController.creacionTokenController)

exports.enviarNotificacion = functions.firestore
  .document('posts/{idPost}')
  .onUpdate(postsController.actualizacionPostController)

exports.validarImagen = functions.storage
  .object()
  .onFinalize(postsController.validarImagenPostController)

exports.enviarPostSemana = functions.https.onRequest(app)
