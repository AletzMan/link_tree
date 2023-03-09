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
    const [error, setError] = useState('');

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
        setError('');
        setUsername(e.target.value);
    }
    const handleContinue = async () => {
        if (username.length > 5) {
            const exists = await existsUsername(username);
            if (exists) {
                setLoginState(5);
                setError('The user name already exists, please choose another one.');
            } else {
                const tmp = { ...currentUser };
                tmp.username = username;
                tmp.processCompleted = true;
                await updateUser(tmp);
                navigate('/dashboard');
                //stateLogin(6);
            }
        } else if (username === ''){
            setLoginState(5);
            setError('The field cannot remain empty');
        } else if (username.length < 6){
            setLoginState(5);
            setError('The minimum number of characters is 6');
        }
    }
    if (stateLogin === 3 || stateLogin === 5) {
        return (
            <section className='choose'>
                <h1 className='choose__title'>{`Welcome  `}<span className='choose__name'>{currentUser.displayName}</span></h1>
                <p className='choose__p'>To finish the process choose a user name</p>
                <div className='choose__container'>{stateLogin === 5 && <p className='choose__error'>{error}</p>}</div>
                <div className='choose__form chooseform'>
                    <input className='chooseform__input' type='text' onInput={handleInputUsername} placeholder='username'/>
                    <button className='chooseform__button button' onClick={handleContinue}>Continue</button>
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