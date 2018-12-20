const admin = require('firebase-admin')
const functions = require('firebase-functions')
const path = require('path')
const os = require('os')
const fs = require('fs')
//const vision = require('@google-cloud/vision')
const { Email } = require('./../utilidad/EmailHelper.js')
const plantillas = require('./../utilidad/PlantillasEmail.js')
const { Notificaciones } = require('./../notificaciones/Notificaciones.js')

class Posts {
  registrarAuditoria (idPost, nuevoPost, viejoPost) {
    // Reto
  }

  validarImagenPost (archivo) {
  }

  esAdecuada (resultado) {
    return (
      resultado !== 'POSSIBLE' &&
      resultado !== 'LIKELY' &&
      resultado !== 'VERY_LIKELY'
    )
  }

  actualizarEstadoPost (idPost, estado) {
    const refAuditoria = admin
      .firestore()
      .collection('posts')
      .doc(idPost)

    return refAuditoria.update({
      publicado: estado
    })
  }

  enviarNotRespImagenInapropiada (idPost) {
    console.log(`Consultar Token idPost => ${idPost}`)

    return admin
      .firestore()
      .collection('posts')
      .doc(idPost)
      .get()
      .then(post => {
        console.log(post)
        if (post.data().token !== null && post.data().token !== undefined) {
          console.log(`idPost token => ${post.data().token}`)
          const notificaciones = new Notificaciones()
          notificaciones.enviarNotificacionAToken(
            'Posts con imagen no permitida',
            'Tu post no se puede mostrar ya que la imagen no es permitida',
            'notvalidacionimagen',
            post.data().token
          )
        }

        return post
      })
  }

  enviarPostSemana (topicoNotificacion) {
    
  }
}

exports.Posts = Posts
