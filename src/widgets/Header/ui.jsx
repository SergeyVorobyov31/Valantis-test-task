import { useState } from "react"
import Popup from "../../features/Popup"
import Filter from "../../shared/images/filter.png"
import "./Header.css"

const Header = (props) => {
  const {
    loading,
    setFilteredIDs
  } = props

  const [isOpen, setIsOpen] = useState(false)

  return(
    <header className="header">
      <h2 className="header__logo text--bold">
        Valantis
      </h2>
      <Popup 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setFilteredIDs={setFilteredIDs}
      />
      {!loading && 
        <button type="button" onClick={() => setIsOpen(true)}>
          <img className="header__img" src={Filter} alt=""/>
        </button>
      }
    </header>
  )
}

export default Header