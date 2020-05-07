import React, { useState, useEffect } from "react";
import './Photos.css';


const PhotoShow = props => {
    const {photo} = props
    const [currentPhoto, setCurrentPhoto] = useState(photo);
    useEffect(() => {
        if (!currentPhoto){
            let search = props.location.search;
            let id = props.match.params.id;
            fetch(`https://photo-viewer-apii.herokuapp.com/photos/${id}${search}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setCurrentPhoto(res)})
        }
    },[]);;
   
    return (
        <div className='show-photo-box'> {currentPhoto ? <img id={currentPhoto.id} src={currentPhoto.url} />  : null }</div>
    )

}
export default PhotoShow;
