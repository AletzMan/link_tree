import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../components/authProvider';
import { existsUsername, updateUser } from '../../firebase/firebase';
import './ChooseUsername.css';

function ChooseUsernamePage() {
    const navigate = useNavigate();
    const [stateLogin, setLoginState] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [username, setUsername] = useState('');
    const handleUserLoggedIn = (user) => {
        navigate('/dashboard');
    }
    const handleNotLoggedIn = () => {
        navigate('/login');
    }
    const handleNotRegistered = (user) => {
        setLoginState(3);
        setCurrentUser(user);
    }
    const handleInputUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleContinue = async () => {
        if (username !== '') {
            const exists = await existsUsername(username);
            if (exists) {
                setLoginState(5);
            } else {
                const tmp = { ...currentUser };
                tmp.username = username;
                tmp.processCompleted = true;
                await updateUser(tmp);
                navigate('/dashboard');
                //stateLogin(6);
            }
        }
    }
    if (stateLogin === 3 || stateLogin === 5) {
        return (
            <section className='choose'>
                <h1>{`Bienvenido ${currentUser.displayName}`}</h1>
                <p> Para terminar el proceso elige un nombre de usuario</p>
                {stateLogin === 5 && <p>El nombre de usuario ya existe, favor de elegir otro.</p>}
                <div className='choose__form'>
                    <input type='text' onInput={handleInputUsername} />
                    <button onClick={handleContinue}>Continue</button>
                </div>
            </section>
        )
    }
    /*
    if (stateLogin === 6) {
        <section className='congratulations'>
            <h1>{`Felicidades, ${currentUser.displayName}`}</h1>
            <p> Haz terminado tu registro, ahora a crear tus links.</p>
            
            <NavLink to={'/dashboard'}></NavLink>
        </section>
    }
    */
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

export { ChooseUsernamePage };