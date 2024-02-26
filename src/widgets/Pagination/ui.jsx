import "./Pagination.css"

const Pagination = (props) => {
  const {
    itemsPerPage,
    totalItems,
    paginate,
    currentPage
  } = props

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return(
    <ul className="pagination">
      {
        pageNumbers.map(number => (
          <li className="page__item" key={number}>
            <a 
              className={`page__link text ${currentPage === number ? "page__link--active" : ""}`}
              onClick={() => {
                paginate(number)
              }}
            >
              {number}
            </a>
          </li>
        ))
      }
    </ul>
  )
}

export default Pagination