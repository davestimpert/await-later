# await-later
js library for batching promises and awaiting later


## Usage

    const AwaitLater = require('await-later')
    function batchJob () {
      const { awaitLater, resolveAll } = AwaitLater()
      
      awaitLater(doThing1(), 'thing1', { some: 'context' })
      awaitLater(doThing2(), 'thing2')
      awaitLater(doThing3())

      return resolveAll()
    }
    
See [tryIt.js](./tryIt.js) for example usage

## Results

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

## Options

- **throwIfAnyReject** Will still await _all_ promises (unlike `Promise.all`), but will throw an Error upon completion of all Promises.  The Error object will include all the results.
