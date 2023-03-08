import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../components/authProvider";
import { DashboardWrapper } from "../../components/dashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { deleteeLink, getLinks, insertNewLink, updateLink } from "../../firebase/firebase";
import { LinkSocial } from "../../components/Link/LinkSocial.jsx";

function DashboardPage() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [stateLogin, setLoginState] = useState(0);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [links, setLinks] = useState([]);

    const handleUserLoggedIn = async (user) => {
        setCurrentUser(user);
        setLoginState(2);
        const resLinks = await getLinks(user.uid);
        setLinks([...resLinks]);
    }
    const handleNotLoggedIn = (user) => {
        navigate('/login');
    }
    const handleNotRegistered = () => {
        navigate('/login');
    }
    const handleCreateLink = (e) => {
        e.preventDefault();
        addLink();
    }
    const addLink = () => {
        if (title !== '' && url !== '') {
            console.log('addLink')
            const newLink = {
                id: uuidv4(),
                title: title,
                url: url,
                uid: currentUser.uid
            };
            const res = insertNewLink(newLink);
            newLink.docId = res.id;
            setTitle('');
            setUrl('');
            setLinks([...links, newLink]);
        }
    }
    const handleOnChange = (e) => {
        const value = e.target.value;
        if (e.target.name === 'title') {
            setTitle(value);
        }
        if (e.target.name === 'url') {
            setUrl(value);
        }
    }
    const handleUpdateLink = async (docId, title, url) => {
        const link = links.find(item => item.docId === docId);
        link.title = title;
        link.url = url;
        await updateLink(docId, link);
    }
    const handleDeleteLink = async (docId) => {
        await deleteeLink(docId);
        const tmp = links.filter(link => link.docId !== docId);
        setLinks([...tmp]);
    }

    if (stateLogin === 0) {
        return (
            <AuthProvider
                userLoggedIn={handleUserLoggedIn}
                userNotLoggedIn={handleNotLoggedIn}
                userNotRegistered={handleNotRegistered}
            >
                Loading...
            </AuthProvider>

        );
    }

    return (
        <DashboardWrapper avtiveLinks={[true, false, false]}>
            <h1>DASHBOARD</h1>
            <span className="dashboard__user">{currentUser.displayName}</span>
            <section className="dashboard">
                <form className="dashboard__form form" onSubmit={handleCreateLink} action="">
                    <label className="form__label" htmlFor="title">Title</label>
                    <input className="form__input" type='text' name='title' onChange={handleOnChange} placeholder='Youtube' />
                    <label className="form__label" htmlFor="title">URL</label>
                    <input className="form__input" type='text' name='url' onChange={handleOnChange} placeholder='www.youtube.com/profile' />
                    <input className="form__button button" type='submit' value='Create new Link' />
                </form>
            </section>
            {links.map(({ id, docId, url, title }) => (
                <LinkSocial key={id} docId={docId} url={url} title={title} onUpdate={handleUpdateLink} onDelete={handleDeleteLink}></LinkSocial>
            ))}
        </DashboardWrapper>
    );
}

export { DashboardPage };