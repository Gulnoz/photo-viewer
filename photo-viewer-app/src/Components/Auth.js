const Auth = () => {
    if (localStorage.getItem('currentUserToken')) {
        fetch('https://mapevent-api.herokuapp.com/auth', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('currentUserToken')}`
            }
        }).then(res => res.json())
            .then(user => { this.setCurrentUser(user.user.data) })
            .catch(console.log)
    } 
    else {
    }
}
export default Auth;