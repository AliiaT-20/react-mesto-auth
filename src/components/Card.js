import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__button-trash ${isOwn ? 'element__button-trash_visible' : 'element__button-trash_hidden'}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__button ${isLiked && 'element__button_active'}`;  
    function handleClick() {
        props.onCardClick([props.card.link, props.card.name]);
    }
    function handleLikeClick() {
        props.onCardLike(props.card)
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }
    return (
        <div className="element">
            <div className="element__photo" style = {{backgroundImage: `url(${props.card.link})`}} onClick = {handleClick}></div>
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__block-likes">
                <button className={cardLikeButtonClassName} type="button" onClick = {handleLikeClick}></button>
                <p className="element__like-counter">{props.card.likes.length}</p>
            </div>
            <button className={cardDeleteButtonClassName} type="button" onClick = {handleDeleteClick}></button>
        </div>
    );
  }
  
  export default Card;
  