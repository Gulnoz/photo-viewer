import React, { useState } from "react";
import './Photos.css';
import { DropdownButton, Dropdown } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
const Photos = props => {
    const{photos, dimensions, pages}=props
    const [value, setValue] = useState(null);


    const handleChange = (event) => {
        setValue(event.target.value);
        props.filterHendler(event.target.value)
    }
    return (
        <> 
            <h3 className='dropdown'>Select photo by dimensions:
                <select className='select-dd' value={value} onChange={handleChange}>
                    <option selected disabled>-Select size-</option>
                    <option value={false}>All</option>
                    {dimensions ?
                        dimensions.map(d => {
                            // let h = `filter?${d.dimensions}`
                            return <option value={d.dimensions}>{d.dimensions}</option>
                        })
                        : null
                    }
    
                </select> </h3>

        <div class='flex'>
            {photos ?
            photos.map(photo=>{
                return <div><img id={photo.id} src={photo.url}
                 onClick={props.imageHendler}/> </div>
            })
            : null
            }
        </div>
        <div>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
        </>
    )
        
    }
export default Photos;
