import './LinkSocial.css';

function PublicLink({ docId, url, title}) { 
    return (
        <div className={`profilelink profilelink__${title}`}>
            <div className={`profilelink__link profilelink__link--${title}`}>
                <a className={`profilelink__a`} href={url}>{title}</a>
            </div>
        </div>
    )
}

export { PublicLink };