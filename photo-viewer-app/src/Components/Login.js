import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import GoogleForm from './GoogleLogin'
import './Login.css';

class Login extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        errorMessege: null
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    errorMessegeHendler(message) {
        this.setState({
            errorMessege: message
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        fetch('https://photo-viewer-apii.herokuapp.com/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(res => res.json())
            .then((result) => {
                if (result.error === 'Not exist') {
                    fetch('https://photo-viewer-apii.herokuapp.com/users',
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                email: this.state.email,
                                password: this.state.password
                            })
                        })
                        .then(res => res.json())
                        .then((result) => {
                            this.props.setCurrentUser(result.user);
                            localStorage.setItem('currentUserToken', result.jwt);
                        })
                }
                else if (result.error === 'Wrong password') {
                    this.errorMessegeHendler(result.error)
                }
                else if (result.user) {
                    this.props.setCurrentUser(result.user)
                    localStorage.setItem('currentUserToken', result.jwt);
                }
                else {
                    console.log(result)
                }
            })
    }
    render() {
        return (
            <div className="container loginForm">
                <div className="Absolute-Center is-Responsive">
                  
            <Form onSubmit={this.handleSubmit} >
                
                <div style={{ color: 'white', padding: "10px",textAlign: "center", fontSize: "calc(10px + 2vmin)", fontWeight: "bold" }}>SignUp</div>
                        <GoogleForm setCurrentUser={this.props.setCurrentUser} />
                <Form.Group controlId="formBasicEmail">
                    <Form.Label></Form.Label>
                    <Form.Control type="input" name="name" value={this.state.name} placeholder="Full Name" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label></Form.Label>
                    <Form.Control type="email" name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">

                    <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />

                </Form.Group>
                {this.state.errorMessege
                    ? <div><Form.Label style={{ color: 'red' }}>{this.state.errorMessege}!!!</Form.Label></div>
                    : null}
                <Button id = "signup-btn"variant="primary" type="submit">
                    Submit
        </Button>
                        
            </Form>
                  
            </div>
            </div>
        )
    }
}
export default Login;