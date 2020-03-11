/*
A more robust alternative to Promise.all
*/

function AwaitLater () {
  const promises = []

  function awaitLater (promise, name, context = {}) {
    promises.push({
      promise,
      name,
      context
    })
  }

  function resolveAll () {
    return Promise.all(promises.map((promise) => {
      return new Promise((resolve) => {
        try {
          promise.promise.then((value) => {
            resolve({
              ok: true,
              value,
              name: promise.name,
              ...promise.context
            })
          }).catch((err) => {
            resolve({
              ok: false,
              reason: err,
              name: promise.name,
              ...promise.context
            })
          })
        } catch (err) {
          resolve({ ok: false, reason: err })
        }
      })
    }))
  }

  return {
    awaitLater,
    resolveAll
  }
}

module.exports = AwaitLater
