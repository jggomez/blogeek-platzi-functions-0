const Notificaciones = require('./Notificaciones.js')

exports.creacionTokenController = dataSnapshot => {
    const notificaciones = new Notificaciones()

    return notificaciones.registrarTokenAltopico(dataSnapshot.data().token)
}
