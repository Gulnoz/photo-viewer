import React, { useState, useEffect } from "react";
import './Photos.css';
import { Form, Button } from "react-bootstrap";
const PhotoShow = props => {
    const { photo, history} = props
    const [currentPhoto, setCurrentPhoto] = useState(photo);
    const [grayscale, setGrayscale] = useState(false);
    const [changeSize, setChangeSize] = useState(false)
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')

    const fetchOnephoto=()=>{
        let search = history.location.search;
        let id = props.match.params.id;
        let path = history.location.pathname
        console.log(path)

        fetch(`https://photo-viewer-apii.herokuapp.com${path}${search}`)
            .then(res => res.json())
            .then(res => {
                setCurrentPhoto(res)
            })}
    
    useEffect(() => {
        if (!currentPhoto){
            fetchOnephoto()
        }}
    ,[]);

    const grayscaleHendler=()=>{
    setGrayscale(!grayscale)
    if(grayscale){
    if (history) history.push(`${history.location.pathname}?grayscale`);
    }
    else if (history) history.push(history.location.pathname);
    fetchOnephoto()
}
const showSizeForm=()=>{
    setChangeSize(!changeSize)
}
    const changeSizeChangeHendler = () => {
        if (history) history.push(`/photos/${currentPhoto.id}/${width}/${height}${history.location.search}`);
        fetchOnephoto()
       
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        changeSizeChangeHendler()
    }
    return (
        <>
        <div className='show-photo-box'> {currentPhoto ? <img id={currentPhoto.id} src={currentPhoto.url} />  : null }
                <div><Button className="grayscale-btn" variant="primary" type="button" onClick={grayscaleHendler}>
                    Grayscale
                </Button>
                    <Button className="grayscale-btn" variant="primary" type="button" onClick={showSizeForm}>
                        Change size
                    </Button></div>

               {changeSize ?<div className="size-form-div">
                   <Form className='form-size'onSubmit={handleSubmit} >
                    <Form.Group controlId="formWidth">
                        <Form.Control type="number" name="width" required="required" min="10" value={width} placeholder="width" onChange={(e) => { setWidth(e.target.value) }} />
                    </Form.Group>
                        <Form.Group controlId="formHeight">
                            <Form.Control type="text" name="height" required="required" min="10" value={height} placeholder="height" onChange={(e) => { setHeight(e.target.value) }} />
                        </Form.Group>
                   
                    <Button className="photo-size-btn" variant="primary" type="submit" >
                        OK
                    </Button>
                    </Form>
                    </div>
                    :null}



        </div>
       
        </>
        )

}
export default PhotoShow;
