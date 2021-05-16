import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const inputRef = React.useRef('');
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: inputRef.current.value,
        });
      } 
    return (
        <PopupWithForm isOpen = {props.isOpen} name ="edit-profile" title = "Обновить аватар" buttonText ="Сохранить" onClose = {props.onClose} onSubmit = {handleSubmit}>
            <label className="popup__form-field">
                <input ref = {inputRef} id="avatar-link-input" type="url" placeholder="Ссылка на картинку" name="link" className="popup__text popup__text_type_title" required minLength="2" maxLength="200" />
                <span className="avatar-link-input-error popup__text-error"></span>
            </label>
        </PopupWithForm>
    );
  }
  
  export default EditAvatarPopup;
  