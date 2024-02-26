import { useState } from "react";
import MainPage from "../pages/MainPage";
import Header from "../widgets/Header";
import "./styles"


function App() {
  const [loading, setLoading] = useState(false)
  const [filteredIDs, setFilteredIDs] = useState([])

  return (
    <div className="container">
        <Header loading={loading} setFilteredIDs={setFilteredIDs}/>
        <MainPage loading={loading} setLoading={setLoading} filteredIDs={filteredIDs}/>
    </div>
  );
}

export default App;
