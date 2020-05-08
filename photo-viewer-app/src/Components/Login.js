import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import GoogleForm from './GoogleLogin'
import SignUp from './SignUp'
import './Login.css';

class Login extends Component {
    state = {
        email: "",
        password: "",
        errorMessege: null,
        signUpForm: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    signUpHendler=()=>{
        this.setState({
            signUpForm: !this.state.signUpForm
        })
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
                    this.errorMessegeHendler(result.error)
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
                    <div className='close-btn'onClick={this.props.loginFormCloseHendler}>x</div>
                    {!this.state.signUpForm ?
                    <>
                <Form onSubmit={this.handleSubmit} >
                    <div className='login-text'>{this.signUpForm ? "SignUp" : "SignIn" }</div>
                
                <GoogleForm setCurrentUser={this.props.setCurrentUser} />
                <Form.Group controlId="formBasicEmail">
                <Form.Label></Form.Label>
                            <Form.Control type="email" name="email" required="required"  value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" name="password" required="required" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
                </Form.Group>
                {this.state.errorMessege
                    ? <div><Form.Label style={{ color: 'red' }}>{this.state.errorMessege}!!!</Form.Label></div>
                    : null}
                <Button className = "signin-btn" variant="primary" type="submit">
                    Login
                </Button> 
                
                </Form>
                    <div className='signup-link' onClick={this.signUpHendler}>
                        Don't have accaunt?
                    </div>
                    </>
                        : <SignUp {...this.props} signUpHendler={this.signUpHendler}/>
                    }
            </div>
            </div>
        )
    }
}
export default Login;