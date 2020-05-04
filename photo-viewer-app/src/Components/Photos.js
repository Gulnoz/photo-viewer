import React, { useState } from "react";
import './Photos.css';
import { DropdownButton, Dropdown } from "react-bootstrap";

const Photos = props => {
    const{photos, dimensions}=props
    const [value, setValue] = useState(null);


    const handleChange = (event) => {
        setValue(event.target.value);
        props.filterHendler(event.target.value)
    }
    return (
        <> 
            <h3 style={{ color: "white" }}>Select photo by dimensions:
                <select value={value} onChange={handleChange}>
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
                return <img src={photo.url}/>
            })
            : null
        }
           
        </div>
        </>
    )
        
    }
export default Photos;
