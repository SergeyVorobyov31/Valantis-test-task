import axios from "axios";
import {
  URL,
  authorizationHeader,
} from "../constants/constants"


function getIDs(offset, limit) {
  return (
    axios.post(URL, {
      "action": "get_ids",
      "params": {"offset": offset, "limit": limit},
    }, {
      headers: authorizationHeader
    })
    .then(({data}) => {
      return data.result
    })
    .catch(err => {
      console.log(err)
      if (err.response.status === 500) {
        getIDs(offset, limit)
      }
    })
  )
}

function getItems(ids) {
  return (
    axios.post(URL, {
      "action": "get_items",
      "params": {"ids": ids},
    }, {
      headers: authorizationHeader
    })
    .then(({data}) => {
      return data.result
    })
    .catch(err => {
      console.log(err)
      if (err.response.status === 500) {
        getItems(ids)
      }
    })
  )
}

function filterProduct(value) {
  return(
    axios.post(URL, {
      "action": "filter",
      "params": {"product": value},
    }, {
      headers: authorizationHeader
    })
    .then(({data}) => {
      return data.result
    })
    .catch(err => {
      console.log(err)
      if (err.response.status === 500) {
        filterProduct(value)
      }
      return err.response.status
    })
  )
}

function filterPrice(value) {
  return(
    axios.post(URL, {
      "action": "filter",
      "params": {"price": value}
    }, {
      headers: authorizationHeader
    })
    .then(({data}) => {
      return data.result
    })
    .catch(err => {
      console.log(err)
      if (err.response.status === 500) {
        filterPrice(value)
      }
      return err.response.status
    })
  )
}

function filterBrand(value) {
  return(
    axios.post(URL, {
      "action": "filter",
      "params": {"brand": value},
    }, {
      headers: authorizationHeader
    })
    .then(({data}) => {
      return data.result
    })
    .catch(err => {
      console.log(err)
      if (err.response.status === 500) {
        filterBrand(value)
      }
      return err.response.status
    })
  )
}

export {
  getIDs,
  getItems,
  filterProduct,
  filterPrice,
  filterBrand
}
