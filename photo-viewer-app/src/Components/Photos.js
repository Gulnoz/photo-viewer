import React, { useState } from "react";
import './Photos.css';
import Login from './Login'
import ReactPaginate from 'react-paginate';

const Photos = props => {
    const{photos, dimensions, pages}=props
    const [value, setValue] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
        props.filterHendler(event.target.value)
    }
    const handlePage=(e)=>{
        props.handlePageClick(e)
        setCurrentPage(e.selected)
    }
    return (
        <> {props.login ? <Login loginFormCloseHendler={props.loginFormCloseHendler}setCurrentUser={props.setCurrentUser}/>:null}
            <h3 className='dropdown'>Filter by dimensions:
                <select className='select-dd' value={value} onChange={handleChange}>
                    <option selected disabled>-Select size-</option>
                    <option value={false}>All</option>
                    {dimensions ?
                        dimensions.map(d => {
                            return <option value={d.dimensions}>{d.dimensions}</option>
                        })
                        : null
                    }
                </select> </h3>

        <div class='flex'>
            {photos ?
            photos.map(photo=>{
                return <div><img id={photo.id} src={photo.url}
                onClick={()=>props.imageHendler(photo)}/> </div>
            })
            : null
            }
        </div>
        {pages>1?<div className='paginate-container'>
            <ReactPaginate
                breakClassName={'page-item'}
                activePage={currentPage}
                selected={currentPage}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
                initialPage={currentPage}
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pages}
                marginPagesDisplayed={20}
                pageRangeDisplayed={5}
                onPageChange={handlePage}
                
            />
        </div>
        :null}
        </>
    )
        
    }
export default Photos;
