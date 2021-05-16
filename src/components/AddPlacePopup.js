import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const inputNameRef = React.useRef('');
    const inputLinkRef = React.useRef('')
    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: inputNameRef.current.value,
            link: inputLinkRef.current.value
        })
    }
    return (
        <PopupWithForm isOpen = {props.isOpen} name ="add" title = "Новое место" onClose = {props.onClose} onSubmit={handleAddPlaceSubmit} buttonText = "Создать">
            <label className="popup__form-field">
                <input ref={inputNameRef} id="place-title-input" type="text" placeholder="Название" name="name" className="popup__text popup__text_type_title" required minLength="2" maxLength="30" />
                <span className="place-title-input-error popup__text-error"></span>
            </label>
            <label className="popup__form-field">
                <input ref={inputLinkRef} id="place-link-input" type="url" placeholder="Ссылка на картинку" name="link" className="popup__text popup__text_type_link" required />
                <span className="place-link-input-error popup__text-error"></span>
            </label>
        </PopupWithForm>
    );
  }
  
  export default AddPlacePopup;
  