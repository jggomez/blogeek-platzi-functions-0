const { configProjectTest, mockConfig } = require('./configTest.js')

const test = require('firebase-functions-test')(
  configProjectTest(),
  './test/credenciales.json'
)

test.mockConfig(mockConfig())

const funciones = require('./../index.js')

describe('funciones', () => {
  after(() => {
    test.cleanup()
  })

  describe('nuevoErrorAppTest', () => {
    it('SMS Enviado correctamente', done => {
      const nuevoErrorWrap = test.wrap(funciones.nuevoErrorApp)
      const data = test.crashlytics.exampleIssue()
      nuevoErrorWrap(data)
        .then(() => {
          return done()
        })
        .catch(error => {
          done(error)
        })
    })
  })

  describe('enviarNotificacionTest', () => {
    it('enviarNotificacion', done => {
      const enviarNotificacionWrap = test.wrap(funciones.enviarNotificacion)
      const dataAfter = test.firestore.makeDocumentSnapshot(
        {
          publicado: true,
          titulo: 'prueba unitaria',
          descripcion: 'prueba unitaria'
        },
        ''
      )

      const dataBefore = test.firestore.makeDocumentSnapshot(
        {
          publicado: false
        },
        ''
      )

      const cambios = test.makeChange(dataBefore, dataAfter)

      enviarNotificacionWrap(cambios)
        .then(() => {
          return done()
        })
        .catch(error => {
          done(error)
        })
    })
  })
})
