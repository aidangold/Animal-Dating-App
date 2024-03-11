// Authentication tutorial from:
// https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5

import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// managest authentication state
const AuthContext = createContext();

// wraps application and provides authentication context to child components
const AuthProvider = ( { children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    // LOGIN
    const loginUser = (DataToSend) => {
        fetch('https://animaldatingapp-backend-nzjce52oiq-ue.a.run.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(DataToSend),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // set context states
            setIsLoggedIn(true);
            setUsername(data.userName);

            if (data.userRole === 'admin') {
                setIsAdmin(true);
            };

            const loginEvent = new CustomEvent('loginSuccess', { detail: { user_name: data.userName } });
            window.dispatchEvent(loginEvent);
            alert('Success: You are successfully logged in!');
            navigate('/match');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        });
    };

    // LOGOUT
    const logOut = () => {
        setIsLoggedIn(false);
        setUsername(null);
        console.log('User logged out');
    }

    return <AuthContext.Provider value={{ isLoggedIn, username, isAdmin, loginUser, logOut }}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;

// custome hook which accesses authentication context from within components
export const useAuth = () => {
    return useContext(AuthContext);
};
