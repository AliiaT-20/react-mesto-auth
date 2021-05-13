import React from 'react';
import Card from './Card';
import Header from './Header';
import editIcon from '../images/edit-icon.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext)
    
    return (
        <>
            <Header path="" text='Выйти' em={props.path} userEmail = {props.email} />
            <main className="content">
                <section className="profile">
                    <div className="profile__info">
                        <div className="profile__avatar-block">
                            <div className="avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
                            <div className="profile__wrap-edit" onClick = {props.onEditAvatar}>
                                <img src={editIcon} alt="Редактирование" className="profile__icon" />
                            </div>
                        </div>
                        <div>
                            <div className="profile__text-info">
                                <h1 className="profile__name">{currentUser.name}</h1>
                                <button className="profile__edit-button" type="button" onClick = {props.onEditProfile}></button>
                            </div>
                            <p className="profile__about">{currentUser.about}</p>
                        </div>
                    </div>
                    <button className="profile__add-button" type="button" onClick = {props.onAddPlace}></button>
                </section>
                <section className="elements">
                    {props.cards.map((card) => {
                        return (
                            <Card card = {card} onCardClick = {props.onCardClick} key={card._id} onCardLike = {props.onCardLike} onCardDelete = {props.onCardDelete} />
                        )
                    })}
                </section>
            </main>
        </>
    );
  }
  
  export default Main;
  