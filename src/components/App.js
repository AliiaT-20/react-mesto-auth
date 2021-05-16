import React from 'react';
import { Route, Switch,  useHistory } from 'react-router-dom';
import api from '../utils/api';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import '../index.css';
import InfoTooltip from './InfoTooltip';
import success from '../images/success.svg';
import nonsuccess from '../images/nonsuccess.svg';

function App() {
    const history = useHistory();
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({})
    const [currentUser, setCurrentUser] = React.useState({});
    const [isInfoTooltipOpen, setIsInfoTooltip] = React.useState(false)
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [textInfoTooltip, setTextInfoTooltip] = React.useState('');
    const [imageInfoTooltip, setImageInfoTooltip] = React.useState('');
    
    function handleLogin(e) {
        e.preventDefault();
        setLoggedIn(true)
    }

    function tokenCheck () {
        // если у пользователя есть токен в localStorage, 
        // эта функция проверит, действующий он или нет
        if (localStorage.getItem('jwt')){
          const jwt = localStorage.getItem('jwt');
          if (jwt){
            // проверим токен
            auth.getContent(jwt).then((res) => {
              if (res){
                  const usermail = res.data.email;
                setUserEmail(usermail);
                setLoggedIn(true);
                history.push("/");
              }
            })
            .catch(err => console.log(err)); 
          }  
        }
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(err));
    }
    function handleCardDelete(card) {
        api.removeCard(card._id)
        .then((data) => {
            setCards((cards) => cards.filter(item => item._id !== card._id))
        })
        .catch(err => console.log(err))
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
    
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }
    
    function handleInfoToolTipOpen(text, image) {
        setIsInfoTooltip(true);
        setTextInfoTooltip(text);
        setImageInfoTooltip(image);
    }
    
    function handleInfoTooltipClose() {
        const check = imageInfoTooltip;
        setIsInfoTooltip(false)
        setTextInfoTooltip('');
        setImageInfoTooltip('');
        if (check === success) {
            history.push('/sign-in')
        }
    }

    function closeAllPopups () {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard({})
    } 
    function handleUpdateUser(userInfo) {
        api.editProfileInfo(userInfo)
        .then((info) => {
            setCurrentUser(info);
            closeAllPopups();
        })
        .catch(err => console.log(err));
    }
    function handleUpdateAvatar(ava) {
        api.updateAvatar(ava.avatar)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch(err => console.log(err));
    }
    function handleAddPlace(item) {
        api.createCard(item)
        .then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopups()
        })
        .catch(err => console.log(err));
    }
    function handleOnLogin(e, password, email) {
        auth.authorize(password, email)
        .then((data) => {
            if (data.token){
            const mail = email;
            setUserEmail(mail);
            email= '';
            password = '';
            handleLogin(e);
            history.push('/');
            }
        })
        .catch(err => console.log(err));
    }
    function handleOnRegister(password, email) {
        auth.register(password, email).then((res) => {
            if(!res.error && !res.message){
                handleInfoToolTipOpen("Вы успешно зарегистрировались!", success)
            } else {
                handleInfoToolTipOpen("Что-то пошло не так! Попробуйте ещё раз.", nonsuccess)
            }
        })
        .catch(err => console.log(err));
    }
    React.useEffect(() => {
        tokenCheck()
    }, [])
    React.useEffect(() => {
        api.getProfileInfo()
        .then((data) => {
            setCurrentUser(data)
        })
        .catch(err => console.log(err));
        api.getInitialCards()
        .then((data) => {
            setCards(data)
        })
        .catch(err => console.log(err));
    }, [])
  return (
          <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                <main className="cont">
                        <Switch>
                            <Route path="/sign-up">
                                <Register onRegister = {handleOnRegister} />
                            </Route>
                            <Route path="/sign-in">
                                <Login onLogin = {handleOnLogin} />
                            </Route>
                            <ProtectedRoute
                                path="/"
                                loggedIn={loggedIn}
                                component={Main}
                                email = {userEmail}
                                cards = {cards} 
                                onCardLike = {handleCardLike} 
                                onCardDelete = {handleCardDelete} 
                                onEditProfile = {handleEditProfileClick} 
                                onAddPlace = {handleAddPlaceClick} 
                                onEditAvatar = {handleEditAvatarClick} 
                                onCardClick = {handleCardClick} 
                            />
                        </Switch>
                    <Footer />
                    <EditProfilePopup 
                        isOpen={isEditProfilePopupOpen} 
                        onClose={closeAllPopups} 
                        onUpdateUser = {handleUpdateUser} 
                    /> 
                    <AddPlacePopup 
                        isOpen={isAddPlacePopupOpen} 
                        onClose={closeAllPopups} 
                        onAddPlace = {handleAddPlace} 
                    />
                    <EditAvatarPopup 
                        isOpen={isEditAvatarPopupOpen} 
                        onClose={closeAllPopups} 
                        onUpdateAvatar = {handleUpdateAvatar} 
                    />
                    <ImagePopup card = {selectedCard} onClose = {closeAllPopups} />
                    <InfoTooltip
                        isOpen = {isInfoTooltipOpen}
                        image = {imageInfoTooltip}
                        text = {textInfoTooltip}
                        onClose = {handleInfoTooltipClose} />
                </main>
            </div>
        </CurrentUserContext.Provider>
      
  );
}

export default App;
