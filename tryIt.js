const AwaitLater = require('./index')

async function doThing1 () {
  return 'thing1 result'
}

async function doThing2 () {
  throw new Error('badThing2')
}

async function doThing3 () {
  return ['uno', 'dos', 'tres']
}

function batchJob () {
  const { awaitLater, resolveAll } = AwaitLater({ throwIfAnyReject: true })

  awaitLater(doThing1(), 'thing1', { some: 'context' })
  awaitLater(doThing2(), 'thing2')
  awaitLater(doThing3())

  return resolveAll()
}

batchJob().then(results => { console.log(JSON.stringify(results, null, '  ')) }).catch(console.error)

/*
This prints the following:
{
  "resolved": 2,
  "rejected": 1,
  "results": [
    {
      "ok": true,
      "value": "thing1 result",
      "name": "thing1",
      "some": "context"
    },
    {
      "ok": false,
      "reason": {},
      "name": "thing2"
    },
    {
      "ok": true,
      "value": [
        "uno",
        "dos",
        "tres"
      ]
    }
  ]
}
*/
