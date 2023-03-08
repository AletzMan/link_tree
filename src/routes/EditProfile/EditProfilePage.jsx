import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../components/authProvider";
import { DashboardWrapper } from "../../components/dashboardWrapper";

function EditProfilePage() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [stateLogin, setLoginState] = useState(0);
    const fileRef = useRef(null);

    const handleUserLoggedIn = async (user) => {
        setCurrentUser(user);
        setLoginState(2);
    }
    const handleNotLoggedIn = (user) => {
        navigate('/login');
    }
    const handleNotRegistered = () => {
        navigate('/login');
    }
    const handleOpenFilePicker = () => {
        if(fileRef.current){
            fileRef.current.click();
        }
    }
    return (
        <AuthProvider userLoggedIn={handleUserLoggedIn} userNotLoggedIn={handleNotLoggedIn} userNotRegistered={handleNotRegistered}>
            <DashboardWrapper avtiveLinks={[false, true, false]}>
                <h1>EDIT PROFILE</h1>
                <img src={''} alt="image profile" width={100}/>
                <button onClick={handleOpenFilePicker}>Choose profile picture</button>
                <input ref={fileRef} type='file' style={{display: 'none'}}/>
            </DashboardWrapper>
        </AuthProvider>
    );
}

export { EditProfilePage };