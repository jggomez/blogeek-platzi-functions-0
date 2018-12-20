const functions = require('firebase-functions')
const admin = require('firebase-admin')
const usuarioController = require('./componentes/usuarios/UsuarioController.js')
const notificacionController = require('./componentes/notificaciones/NotificacionesController.js')
const postsController = require('./componentes/posts/PostsController.js')
const errorController = require('./componentes/errores/ErrorController.js')
const analiticasController = require('./componentes/analiticas/AnaliticasController.js')

admin.initializeApp()
admin.firestore().settings({ timestampsInSnapshots: true })

// firebase functions:config:set configuration.email="XXXX" configuration.password="XXXXXX"
// firebase functions:config:set configuration.claveapihubspot="XXXX"
// firebase functions:config:set configuration.numcelularerror="XXXX"
// firebase functions:config:set configuration.accountsidtwilio="XXXX"
// firebase functions:config:set configuration.authtokentwilio="XXXX"

exports.creacionUsuario = functions.auth
  .user()
  .onCreate(usuarioController.usuarioCreacionController)

exports.eliminacionUsuario = functions.auth
  .user()
  .onDelete(usuarioController.usuarioEliminadoController)

exports.creacionUsuarioCRM = functions.auth
  .user()
  .onCreate(usuarioController.creacionUsuarioCRM)
