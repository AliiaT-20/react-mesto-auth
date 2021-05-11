import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]); 

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('')
    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name: name,
          about: description,
        });
      } 
    return (
        <PopupWithForm isOpen = {props.isOpen} name ="edit" title = "Редактировать профиль" onClose = {props.onClose} onSubmit = {handleSubmit}>
            <label className="popup__form-field">
                <input id="name-input" type="text" value={name} onChange={handleChangeName} placeholder="Введите имя" name="name" className="popup__text popup__text_type_name" required minLength="2" maxLength="40"/>
                <span className="name-input-error popup__text-error"></span>
            </label>
            <label className="popup__form-field">
                <input id="user-about-input" type="text" value={description} onChange={handleChangeDescription} placeholder="Введите профессию" name="about" className="popup__text popup__text_type_about" required minLength="2" maxLength="200" />
                <span className="user-about-input-error popup__text-error"></span>
            </label>
            <button type="submit" value="Сохранить" name="save" className="popup__submit-button">Сохранить</button>
        </PopupWithForm>
    );
  }
  
  export default EditProfilePopup;
  