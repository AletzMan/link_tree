import { async } from '@firebase/util';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, userExists } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../components/authProvider';

function AuthProvider({ children, userLoggedIn, userNotLoggedIn, userNotRegistered }) {
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExists(user.uid);
                if (isRegistered) {
                   userLoggedIn(user);
                } else {
                    userNotRegistered(user);
                }
                console.log(user.displayName)
            } else {
                setLoginState(4);
                console.log('Not authentification')
            }
        });
    }, [])
    return (
        <div>Auth</div>
    )
}

export { AuthProvider };