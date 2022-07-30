function checkLanguage() {
  if (navigator.languages.indexOf("pt") > -1) {
    return "portuguese"
  } else {
    return "english"
  }
}
import Airtable from "airtable"

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keyJPjJCpUST9JaU7",
})

var base = Airtable.base("app1Y9Pp4VCeMYqhf")

function getProjects() {
  return base
    .table("projects")
    .select()
    .all()
    .then((result) => {
      return result
    })
}

function sendRequestInfo(ipInfo) {
  return new Promise((resolve, reject) => {
    base("requests").create(
      [
        {
          fields: {
            details: JSON.stringify(ipInfo),
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve("done")
      }
    )
  })
    .then((res) => res)
    .catch((err) => err)
}

export { checkLanguage, getProjects, sendRequestInfo }
