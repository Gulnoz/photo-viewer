import React, { useState } from "react";
import './Photos.css';
import Login from './Login'
import InfiniteScroll from "react-infinite-scroll-component";

const Photos = props => {
    const{photos, dimensions, pages, currentPage} = props
    const [value, setValue] = useState('All');

    const handleChange = (event) => {
        setValue(event.target.value);
        props.filterHendler(event.target.value)
    }

    return (
        <> {props.login ? <Login loginFormCloseHendler={props.loginFormCloseHendler}setCurrentUser={props.setCurrentUser}/>:null}
            <h3 className='dropdown'>Filter by dimensions:
                <select className='select-dd' value={value} onChange={handleChange}>
                    <option value={false}>All</option>
                    {dimensions ? dimensions.map((d,index) => <option key={index}value={d.dimensions}>{d.dimensions}</option>) : null}
                </select> </h3>
            <div>
                {photos ?
                <InfiniteScroll
                    dataLength={photos.length}
                    next={props.fetchMoreData}
                    hasMore={pages-currentPage!==0}
                    loader={<h4>Loading...</h4>}
                >
                    <div className='flex'>                  
                            {photos.map((photo,index) => {
                                return  <div key={index}><img id={photo.id} src={photo.url}
                                                onClick={() => props.imageHendler(photo)}/> 
                                        </div>})}                         
                    </div> 
                </InfiniteScroll> 
                : null}
            </div> 
        </>
    )
        
    }
export default Photos;
