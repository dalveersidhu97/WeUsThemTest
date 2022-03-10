import React, { useState } from "react";

export const LoginContext = React.createContext({
    loggedInUser: false,
    login: ()=>{},
    logout: ()=> {}
});


export const LoginProvider = (props) => {

    const [loggedInUser, setLoggedInUser] = useState(false);

    const login = (user) => {
        setLoggedInUser(user);
    }

    const logout = () => {
        setLoggedInUser(false);
    }

    const context = {loggedInUser, login, logout}

    return <LoginContext.Provider value={context}>
        {props.children}
    </LoginContext.Provider>

}


