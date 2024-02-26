import Cards from "../../widgets/Cards";
import "./MainPage.css"


const MainPage = (props) => {
  const {
    loading,
    setLoading,
    filteredIDs
  } = props
  return(
    <Cards loading={loading} setLoading={setLoading} filteredIDs={filteredIDs}/>
  )
}

export default MainPage