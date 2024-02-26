import MD5 from 'crypto-js/md5';

const date = new Date()
let year = date.getUTCFullYear()
let month = date.getUTCMonth() + 1
let day = date.getUTCDate() 

if (month < 10)
  month = `0${month}`
if (day < 10)
  day = `0${day}`

const URL = "https://api.valantis.store:41000/"
const authorizationHeader = {
  "X-Auth" : MD5(`Valantis_${year}${month}${day}`).toString(),
}

export {
  URL,
  authorizationHeader
}