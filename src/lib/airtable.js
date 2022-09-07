import Airtable from 'airtable'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyJPjJCpUST9JaU7'
})

const base = Airtable.base('appfIPCJVB10ADz5Q')


const sendRequestInfo = ipInfo => {
    return new Promise((resolve, reject) => {
      base('requests').create([
        {
          "fields": {
            "details": JSON.stringify(ipInfo)
          }
        }
      ], function (err, records) {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve('done')
      })
  
    })
      .then(res => res)
      .catch(err => err)
  }

  export default sendRequestInfo