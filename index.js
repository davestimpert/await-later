/*
A more robust alternative to Promise.all
*/

function AwaitLater (options = {}) {
  const throwIfAnyReject = options.throwIfAnyReject || false
  const promises = []

  function awaitLater (promise, name, context = {}) {
    promises.push({
      promise,
      name,
      context
    })
  }

  async function resolveAll () {
    const results = await Promise.all(promises.map((promise) => {
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
    let resolved = 0
    let rejected = 0
    results.forEach(r => r.ok ? resolved++ : rejected++)
    if (throwIfAnyReject && rejected) {
      const err = new Error()
      err.results = results
      throw err
    }
    return {
      resolved,
      rejected,
      results
    }
  }

  return {
    awaitLater,
    resolveAll
  }
}

module.exports = AwaitLater
