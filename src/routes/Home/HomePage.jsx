import { async } from '@firebase/util';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, userExists } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../components/authProvider';

function HomePage() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [stateLogin, setLoginState] = useState(0);
    /*
    0: Inicializando
    1: loading
    2: login completo
    3: login sin registro
    4: no login
    */

    useEffect(() => {
        setLoginState(1);
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExists(user.uid);
                if (isRegistered) {
                    setLoginState(2);
                    navigate('/dashboard');
                } else {
                    navigate('/choose-username');
                    setLoginState(3);
                }
                console.log(user.displayName)
            } else {
                setLoginState(4);
                console.log('Not authentification')
            }
        });
    }, [])



    const handleOnClick = () => {
        const googleProvider = new GoogleAuthProvider;
        signWithGoogle(googleProvider);
    }
    const signWithGoogle = async (googleProvider) => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error)
        }
    }

return <AuthProvider></AuthProvider>

    /*
    if (stateLogin === 1) {
        return <div>Loading...</div>
    }
    if (stateLogin === 2) {
        return <div>Estas autenticado y registrado</div>
    }
    if (stateLogin === 3) {
        return <div>Estas autenticado pero no registrado</div>
    }
    if (stateLogin === 4) {
        return (
            <>
                <h1>LOGIN</h1>
                <button onClick={handleOnClick}></button>
            </>
        )
    }
    */
}

export { HomePage };