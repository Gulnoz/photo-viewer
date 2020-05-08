import React from 'react';
import GoogleLogin from 'react-google-login';

export default class Login extends React.Component {

    responseGoogle = (response) => {
        fetch('https://photo-viewer-apii.herokuapp.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: response.profileObj.email,
                password: response.profileObj.googleId
            })})
            .then(res => res.json())
            .then((result) => {
                if (result.error === 'Not exist') {
                    fetch('https://photo-viewer-apii.herokuapp.com/users',
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: response.profileObj.givenName,
                                email: response.profileObj.email,
                                password: response.profileObj.googleId})})
                        .then(res => res.json())
                        .then((result) => {
                            this.props.setCurrentUser(result.user);
                            localStorage.setItem('currentUserToken', result.jwt);})
                }
                else {
                    this.props.setCurrentUser(result.user);
                    localStorage.setItem('currentUserToken', result.jwt);
                }}) 
        }

    render() {
        return (
            <div className="google-btn">
                <GoogleLogin class='loginBtn--google'
                    clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>

        )
    }
}