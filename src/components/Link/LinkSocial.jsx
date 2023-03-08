import './LinkSocial.css';
import editIcon from '../../assets/edit-icon.svg'
import saveIcon from '../../assets/save-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'
import { useEffect, useState } from 'react';

function LinkSocial({ docId, url, title, onUpdate, onDelete }) {
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentUrl, setCurrentUrl] = useState(url);
    const [editTitle, setEditTitle] = useState(false);
    const [editUrl, setEditUrl] = useState(false);



    const handleEditTitle = (value) => {
        setEditTitle(value);
        if (!value) {
            onUpdate(docId, currentTitle, currentUrl);
        }
    }
    const handleEditUrl = (value) => {
        setEditUrl(value);
        if (!value) {
            onUpdate(docId, currentTitle, currentUrl);
        }
    }
    const handleChangeTitle = (e) => {
        setCurrentTitle(e.target.value);
    }
    const handleChangeUrl = (e) => {
        setCurrentUrl(e.target.value);
    }
    const handleDeleteLink = () => {
        onDelete(docId);
    }

    return (
        <div className="link">
            <div className='link__container infolink'>
                {!editTitle &&
                    <><button onClick={() => handleEditTitle(true)} className='infolink__button infolink__button--title'>
                        <img className='editicon' src={editIcon}></img>
                    </button>
                        <span className='infolink__title'>{currentTitle}</span></>
                }
                {editTitle &&
                    <><button onClick={() => handleEditTitle(false)} className='infolink__button infolink__button--title'>
                        <img className='editicon' src={saveIcon}></img>
                    </button>
                        <input className='infolink__input' value={currentTitle} onChange={handleChangeTitle} autoFocus></input></>
                }
                {!editUrl &&
                    <><button onClick={() => handleEditUrl(true)} className='infolink__button infolink__button--url'>
                        <img className='editicon' src={editIcon}></img>
                    </button>
                        <span className='infolink__title'>{currentUrl}</span></>
                }
                {editUrl &&
                    <><button onClick={() => handleEditUrl(false)} className='infolink__button infolink__button--url'>
                        <img className='editicon' src={saveIcon}></img>
                    </button>
                        <input className='infolink__input' value={currentUrl} onChange={handleChangeUrl} autoFocus></input></>
                }
            </div>
            <button onClick={handleDeleteLink} className='link__delete'>
                <img className='deleteicon' src={deleteIcon}></img>
            </button>
        </div>
    )
}

export { LinkSocial };