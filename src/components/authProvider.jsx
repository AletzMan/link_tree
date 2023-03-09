import { async } from '@firebase/util';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, getUserInfo, registerNewUser, userExists } from '../firebase/firebase';

function AuthProvider({ children, userLoggedIn, userNotLoggedIn, userNotRegistered }) {
  
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExists(user.uid);
                if (isRegistered) {
                    const userInfo = await getUserInfo(user.uid);
                    if (userInfo.processCompleted) {
                        userLoggedIn(userInfo);                        
                    } else {
                        userNotRegistered(userInfo);
                    }
                } else {
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: '',
                        username: '',
                        processCompleted: false

                    })
                    userNotRegistered(user);
                }
                console.log(user.displayName)
            } else {
                userNotLoggedIn();
                console.log('Not authentification')
            }
        });
    }, [userLoggedIn, userNotLoggedIn, userNotRegistered])
    return (
        <div>{children}</div>
    )
}

export { AuthProvider };