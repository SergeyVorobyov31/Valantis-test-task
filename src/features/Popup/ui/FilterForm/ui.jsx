import { useState } from "react"
import { 
  filterBrand,
  filterPrice,
  filterProduct
} from "../../../../services/API"
import "./FilterForm.css"

const FilterForm = (props) => {
  const {
    filterName,
    setFilteredIDs,
    handleClose
  } = props

  const [inputValue, setInputValue] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [emptyResponse, setEmptyResponse] = useState("")
  const [loading, setLoading] = useState(false)

  function handleError(res) {
    if (typeof(res) === 'number') {
      setLoading(false)
      setErrorMsg(`Ошибка. Статус ошибки: ${res}`)
      return true
    }
  }

  function checkEmptyResponse(res) {
    if (res.length === 0) {
      setLoading(false)
      setEmptyResponse("По вашему запросу ничего не найдено")
      return true
    }
  }

  function handleSuccess(res) {
    setLoading(false)
    setErrorMsg()
    setEmptyResponse()
    setFilteredIDs(res)
    handleClose()
  }


  function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg()
    setEmptyResponse()
    setLoading(true)
    if (filterName === "название") {
      filterProduct(inputValue)
        .then(res => {
          if (handleError(res))
            return
          if (checkEmptyResponse(res))
            return
          handleSuccess(res)
        })
        return
    }
    if (filterName === "цену") {
      filterPrice(Number(inputValue))
        .then(res => {
          if (handleError(res))
            return
          if (checkEmptyResponse(res))
            return
          handleSuccess(res)
        })
        return
    }
    if (filterName === "бренд") {
      filterBrand(inputValue)
      .then(res => {
        if (handleError(res))
          return
        if (checkEmptyResponse(res))
          return
        handleSuccess(res)
      })
      return
    }
  }

  return(
    <form className="product-filter" onSubmit={handleSubmit}>
      {filterName !== "цену" ?
        <input 
          className="input text"
          type="text"
          placeholder={`Введите ${filterName}`}
          onChange={(e) => setInputValue(e.target.value)}
        />
        : 
        <input 
        className="input text"
        type="number"
        placeholder={`Введите ${filterName}`}
        onChange={(e) => setInputValue(e.target.value)}
        />
      }
      {loading &&
        <span className="product-filter-message text">Загрузка</span>
      }
      
      {errorMsg && 
        <span className="product-filter-error text">{errorMsg}</span>
      }
      {emptyResponse &&
        <span className="product-filter-message text">{emptyResponse}</span>
      }
      <button 
        className="product-filter__button text"
        type="submit"
      >
        Применить
      </button>
    </form>
  )
}

export default FilterForm