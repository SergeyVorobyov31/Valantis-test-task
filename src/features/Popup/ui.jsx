import { useEffect, useState } from "react"
import FilterForm from "./ui/FilterForm"
import "./Popup.css"

const Popup = (props) => {
  const {
    isOpen,
    setIsOpen,
    setFilteredIDs
  } = props

  const [filter, setFilter] = useState()
  const filterArray = [
    {
      id: 0,
      name: "По названию",
      param: "product",
    },
    {
      id: 1,
      name: "По цене",
      param: "price",
    },
    {
      id: 2,
      name: "По бренду",
      param: "price",
    }
  ]

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose)
    }
  }, [isOpen])

  function handleClose() {
    setFilter()
    setIsOpen(false);
  }

  function handleEscClose(evt) {
    if (evt) {
      if(evt.key === "Escape") {
        handleClose()
        document.removeEventListener("keydown", handleEscClose);
      }
    }
  }

  return (
    <div className={`popup ${isOpen ? "popup--opened" : ""}`}>
      <div className="popup__wrapper" onClick={handleClose}></div>
      <div className="popup__body">
        <div className="popup__header">
          <button
            className="button text--bold"
            type="button"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className="popup__filter">
          <h3 className="text">Выберите способ фильтрации</h3>
          <div className="popup__filter-container">
            {filterArray.map((item) => (
              <button 
                className={`popup__filter-button text ${item.name === filter ? "popup__filter-button--active" : ""}`}
                onClick={(e) => setFilter(e.target.innerText)}
                key={item.id}
              >
                {item.name}
              </button>
            ))}
          </div>
          {filter === "По названию" && 
            <FilterForm 
              filterName={"название"}
              setFilteredIDs={setFilteredIDs}
              handleClose={handleClose}
            />
          }
          {filter === "По цене" && 
            <FilterForm 
              filterName={"цену"}
              setFilteredIDs={setFilteredIDs}
              handleClose={handleClose}
            />
            }
          {filter === "По бренду" && 
            <FilterForm 
              filterName={"бренд"}
              setFilteredIDs={setFilteredIDs}
              handleClose={handleClose}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default Popup