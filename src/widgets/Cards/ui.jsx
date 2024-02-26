import { useState, useEffect, useMemo } from "react"
import { getIDs, getItems } from "../../services/API"
import Loading from "../Loading/ui"
import Pagination from "../Pagination"
import "./Cards.css"

const Cards = (props) => {
    const {
        loading,
        setLoading,
        filteredIDs
    } = props

    const [collectionItems, setCollectionItems] = useState([])
    // let numberItems = 500 // начально количество товаров

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 50

    useEffect(() => {
        setLoading(true)
        if (typeof(filteredIDs) !== "number" && filteredIDs.length !== 0) {
            getItems(filteredIDs)
            .then((res) => {
                setLoading(false)
                setCollectionItems(res)
            })
            .catch(() => setLoading(true))
        } else {
            getIDs(1)
            .then((res) =>{
                getItems(res)
                    .then((res) => {
                        setLoading(false)
                        setCollectionItems(res)
                    })
                    .catch(() => setLoading(true))
            })
            .catch(() => setLoading(true))
        }
    }, [filteredIDs])

    const filteredArray = collectionItems?.filter((obj, idx, arr) => 
        idx === arr.findIndex((t) => t.id === obj.id
    ));

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage

    let currentItem
    if (filteredArray?.length < 50) {
        currentItem = filteredArray
    } else {
        currentItem = filteredArray?.slice(firstItemIndex, lastItemIndex)
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const prevPage = () => setCurrentPage(prev => prev - 1)
    const nextPage = () => setCurrentPage(prev => prev + 1)

    return(
        <>
            <div className="collection">
                {loading && <Loading/>}
                {!loading && currentItem?.map((item) => (
                    <div className="card__wrapper" key={item?.id}>
                        <div className="card">
                            <h3 className="card__name text--bold">{item?.product}</h3>
                            <p className="card__price text">Цена: {item?.price}</p>
                            <p className="card__brand text">{item?.brand ? `Бренд: ${item.brand}` : ""}</p>
                        </div>
                    </div>
                ))}
            </div>
            {
                !loading && 
                filteredArray !== undefined &&
                filteredArray.length > itemsPerPage &&
                <div className="pagination__wrapper">
                    <button 
                        className="button text"
                        type="button"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        &#129044;
                    </button>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredArray?.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                    <button
                        className="button text"
                        type="button"
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(filteredArray?.length / itemsPerPage)}
                    >
                        &#129046;
                    </button>
                </div>
            }
        </>
      )
}

export default Cards