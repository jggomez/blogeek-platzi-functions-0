const test = require('firebase-functions-test')(
  {
    databaseURL: 'https://blogeekplatzi-4836b.firebaseio.com',
    projectId: 'blogeekplatzi-4836b',
    storageBucket: 'blogeekplatzi-4836b.appspot.com'
  },
  './test/credenciales.json'
)

test.mockConfig({
  configuration: {
    email: 'gdgcali@gmail.com',
    accountsidtwilio: 'AC7198e77e92c390d41b2917f08ac8eb9e',
    authtokentwilio: '44c711750f5e00c914652248772b5d20',
    password: 'CaliGDG2017',
    claveapihubspot: '84bf251d-2ee6-441d-9628-062f3a3746c3',
    numcelularerror: '+573174498336'
  }
})

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
