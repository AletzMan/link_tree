import { async } from '@firebase/util';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, userExists } from '../../firebase/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../components/authProvider';
import { useState } from 'react';
import './HomePage.css';
import icon from '../../assets/icon.svg';

function HomePage() {
    const navigate = useNavigate();
    //const [currentUser, setCurrentUser] = useState(null);
    const [stateLogin, setLoginState] = useState(0);
    /*
    0: Inicializando
    1: loading
    2: login completo
    3: login sin registro
    4: no login
    5: username exists
    */

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

    const handleUserLoggedIn = (user) => {
        navigate('/dashboard');
    }
    const handleNotLoggedIn = (user) => {
        setLoginState(4);
    }
    const handleNotRegistered = () => {
        navigate('/choose-username');
    }


    if (stateLogin === 4 || stateLogin === 5) {
        return (
            <section className='home'>
                <img className='home__icon' src={icon} alt="icon link-tree"/>
                <h1 className='home__title'>Link-Tree</h1>
                <p className='home__p'>Share the collection on your social networks, in a single link.</p>
                <span className='home__span'>Quick and easy:</span>
                <ul className='home__ul'>
                    <li className='home__li'>Login</li>
                    <li className='home__li'>Choose your links</li>
                    <li className='home__li'>Customize your card</li>
                    <li className='home__li'>Share</li>
                </ul>
                <span className='home__get'>Get started now!</span>
                <button className='home__button button' onClick={handleOnClick}>Login with Google</button>
            </section>
        )
    }
    return (
        <AuthProvider
            userLoggedIn={handleUserLoggedIn}
            userNotLoggedIn={handleNotLoggedIn}
            userNotRegistered={handleNotRegistered}
        >
            <div>Loading...</div>
        </AuthProvider>

    );
}

export { HomePage };