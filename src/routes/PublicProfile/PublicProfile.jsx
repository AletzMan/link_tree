import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { PublicLink } from "../../components/Link/PublicLink";
import { existsUsername, getProfilePhotoUrl, getUserPublicProfileInfo } from "../../firebase/firebase";
import './PublicProfile.css';
import icon from '../../assets/icon.svg';

function PublicProfilePage() {
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const [urlPhoto, setUrlPhoto] = useState('');
    const [profileState, setProfileState] = useState(0);

    useEffect(() => {
        getData();
        async function getData() {
            const username = params.username;
            try {
                const userUid = await existsUsername(username);
                console.log(userUid)
                if (userUid) {
                    const userInfo = await getUserPublicProfileInfo(userUid);
                    setProfile(userInfo);
                    const url = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture);
                    setUrlPhoto(url);
                } else {
                    setProfileState(7);
                }
            } catch (error) {
                console.error(error);
            }
        }

    }, [])


    return (
        <section className="publicprofile">            
            <NavLink className="publicprofile__home" to={'/'}><img  className="publicprofile__icon" src={icon}/>Link-Tree</NavLink>
            <h1 className="publicprofile__title">PROFILE</h1>
            {profileState === 7 && <span>{`El usuario ${params.username} no existe`}</span>}
            {profileState !== 7 && <div className="publicprofile__profile profilelinks">
                <h2 className="profilelinks__user" >{profile?.profileInfo.username}</h2>
                <div className="profilelinks__photo">
                    <img className="profilelinks__photo--image" src={urlPhoto} alt="" />
                </div>
                <h3 className="profilelinks__name" >{profile?.profileInfo.displayName}</h3>
                <div>
                    {profile?.linksInfo.map(link => (
                        <PublicLink key={link.id} url={link.url} title={link.title}></PublicLink>
                    ))}
                </div>
            </div>}
        </section>
    )
}

export { PublicProfilePage };