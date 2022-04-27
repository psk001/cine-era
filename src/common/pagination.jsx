import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types'

const Pagination = (props) => {

    const{itemsCount, currentPage, pageSize, onPageChange, onNextPage, onPreviousPage} = props;
    const pagesCount = Math.ceil(itemsCount/pageSize);

    const pages = _.range(1, pagesCount+1)
    if(pagesCount===1)
        return null

    return (
        <ul className="pagination justify-content-center">
            <li 
                className={currentPage<=1? "page-item disabled" : "page-item"}
                onClick={(currentPage>1) ? () => onPreviousPage(currentPage) : null}
                >
                <a  className="page-link">&laquo;</a>
            </li>
            {pages.map(page => (
                    <li key={page} className={currentPage===page ? "page-item active": "page-item"}>
                        <a className="page-link" onClick={() => onPageChange(page)}> {page} </a>
                    </li>  
            ))}              
            <li 
                className={currentPage>=pagesCount ? "page-item disabled" : "page-item"}
                onClick={(currentPage<pagesCount) ? () => onNextPage(currentPage) : null}
            >
                <a className="page-link"> &raquo;</a>
            </li>                
        </ul>
    );

    Pagination.propTypes = {
        itemsCount: PropTypes.number.isRequired, 
        currentPage: PropTypes.number.isRequired, 
        pageSize: PropTypes.number.isRequired, 
        onPageChange: PropTypes.func.isRequired
    }
}   
 
export default Pagination;

// {currentPage===pagesCount? "page-item disabled" : "page-item"}