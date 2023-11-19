const GlobalFunction = {
    logOut(){
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        localStorage.removeItem('photo')
        localStorage.removeItem('phone')
        localStorage.removeItem('token')
    }
}

export default GlobalFunction;