import React from "react";
import { Link } from 'react-router-dom'
import { Button } from "react-bootstrap";
import './Navigation.css';

class Navigation extends React.Component {
    logOutHandler = () => {
        window.localStorage.clear();
        this.props.logOutHendler();
    };
    render() {
        return (
            <div className="nav-buttons-right">
                <div id="user-name">{this.props.user?this.props.user.name:"Guest"}</div>
                <Button style={{ borderRight: "white solid 1px"}} variant="outline-dark" as={Link} to="/" >Home</Button>
                {!this.props.user? <Button style={{ borderRight: "white solid 1px" }} variant="outline-dark" as={Link} onClick={() => this.props.loginHendler()} >Log In</Button>
                : <Button variant="outline-primary" as={Link} to="/" onClick={() => this.logOutHandler()}>Log Out</Button>
                 }
                </div>
        );
    }
}
export default Navigation;
