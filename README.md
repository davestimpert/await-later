# await-later
js library for batching promises and awaiting later


## Usage

    const AwaitLater = require('await-later')
    async function batchJob () {
      const { awaitLater, resolveAll } = AwaitLater()
      
      awaitLater(doThing1(), 'thing1', { some: 'context' })
      awaitLater(doThing2(), 'thing2')
      awaitLater(doThing3())

      return resolveAll()
    }
    
See [tryIt.js](./tryIt.js) for example results

  
