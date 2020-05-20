import React from "react";
import { Link } from 'react-router-dom'
import { Button } from "react-bootstrap";
import './Navigation.css';

const Navigation = props=> {
    const { user, photoShow, loginHendler, photoShowHendler, logOutHendler } = props

   let logOutHandler = () => {
        window.localStorage.clear();
        logOutHendler();
    };
        return (
            <div className="nav-buttons-right">
                <div id="user-name">{user ? user.name : "Guest"}</div>
                <Button style={{ borderRight: "white solid 1px" }} variant="outline-dark" as={Link} to="/" onClick={photoShowHendler}>Home</Button>
                
                {
                !photoShow ?
                !user ? <Button style={{ borderRight: "white solid 1px" }} variant="outline-dark" as={Link} to='' onClick={loginHendler} >Log In</Button>
                : <Button variant="outline-primary" as={Link} to="/" onClick={() => logOutHandler()}>Log Out</Button>
                :null}
                </div>
        );
    }

export default Navigation;
