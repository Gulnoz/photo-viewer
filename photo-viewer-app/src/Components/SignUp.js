import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import './Login.css';

class SignUp extends Component {
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
        fetch('https://photo-viewer-apii.herokuapp.com/users',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(res => res.json())
            .then((result) => {
                    this.props.setCurrentUser(result.user);
                    localStorage.setItem('currentUserToken', result.jwt);})
    }   
    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                <div className='login-text'>SignUp</div>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control type="input" name="name" required="required" value={this.state.name} placeholder="Full Name" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control type="email" name="email" required="required" value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" name="password" required="required" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
                        </Form.Group>
                        {this.state.errorMessege
                            ? <div><Form.Label style={{ color: 'red' }}>{this.state.errorMessege}!!!</Form.Label></div>
                            : null}
                <div><Button className="signup-btn" variant="primary" type="button" onClick={this.props.signUpHendler}>
                            Cencel
                        </Button>
                        <Button className="signup-btn" variant="primary" type="submit">
                            Submit
                        </Button></div>
                    </Form>
        )
    }
}
export default SignUp;