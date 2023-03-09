import { async } from "@firebase/util";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../components/authProvider";
import { DashboardWrapper } from "../../components/dashboardWrapper";
import { getProfilePhotoUrl, setUserProfilePhoto, updateUser } from "../../firebase/firebase";
import './EditProfile.css';

function EditProfilePage() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [stateLogin, setLoginState] = useState(0);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
    const fileRef = useRef(null);

    const handleUserLoggedIn = async (user) => {
        setCurrentUser(user);
        const url = await getProfilePhotoUrl(user.profilePicture);
        setProfilePhotoUrl(url);
        setLoginState(2);
    }

    const handleNotLoggedIn = (user) => {
        navigate('/');
    }
    const handleNotRegistered = () => {
        navigate('/');
    }
    const handleOpenFilePicker = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }
    const handleChangedFile = (e) => {
        const files = e.target.files;
        const fileReader = new FileReader();
        if (fileReader && files && files.length > 0) {
            fileReader.readAsArrayBuffer(files[0]);
            fileReader.onload = async function () {
                const imageData = fileReader.result;
                const res = await setUserProfilePhoto(currentUser.uid, imageData);

                if (res) {
                    const tmpUser = { ...currentUser };
                    tmpUser.profilePicture = res.metadata.fullPath;
                    await updateUser(tmpUser);
                    setCurrentUser({ ...tmpUser });
                    const url = await getProfilePhotoUrl(currentUser.profilePicture);
                    setProfilePhotoUrl(url);

                }
            }
        }
    }
    if (stateLogin !== 2) {
        return (
            <AuthProvider userLoggedIn={handleUserLoggedIn} userNotLoggedIn={handleNotLoggedIn} userNotRegistered={handleNotRegistered}>
            </AuthProvider>
        );
    }

    return (
        <DashboardWrapper avtiveLinks={[false, true, false]}>
            <section className="editprofile">
                <h1 className="editprofile__title">EDIT PROFILE</h1>
                <div className="editprofile__picture">
                    <img className="editprofile__photo" src={profilePhotoUrl} alt="image profile" width={100} />
                </div>
                <button className="editprofile__button button" onClick={handleOpenFilePicker}></button>
                <input className="editprofile__input" ref={fileRef} type='file' style={{ display: 'none' }} onChange={handleChangedFile} />
                <span className="editprofile__name">{currentUser.displayName}</span>
            </section>
        </DashboardWrapper>
    );
}

export { EditProfilePage };