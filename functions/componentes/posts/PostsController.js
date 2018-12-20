const { Notificaciones } = require('./../notificaciones/Notificaciones.js')
const { Posts } = require('./Posts.js')

exports.actualizacionPostController = (dataSnapshot, context) => {
  const notificaciones = new Notificaciones()

  if (
    dataSnapshot.before.data().publicado === false &&
    dataSnapshot.after.data().publicado === true
  ) {
    return notificaciones.enviarNotificacion(
      dataSnapshot.after.data().titulo,
      dataSnapshot.after.data().descripcion,
      null,
      ''
    )
  }

  return null
}

exports.auditoriaPostController = (dataSnapshot, context) => {
  // Reto
}

exports.validarImagenPostController = imagen => {}

exports.enviarPostsSemana = (req, resp, next) => {}
