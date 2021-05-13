import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import * as auth from '../auth.js';
import InfoTooltip from './InfoTooltip';
import success from '../images/success.svg';
import nonsuccess from '../images/nonsuccess.svg';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password: '',
        isOpen: false,
        image: '',
        text: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseInfoTooltip = this.handleCloseInfoTooltip.bind(this);
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
        [name]: value
        });
    }
    handleOpenInfoTooltip (image,text) {
        this.setState({
            isOpen: true,
            image: image,
            text: text,
        })
    }
    handleCloseInfoTooltip() {
        const check = this.state.image;
        this.setState({
            isOpen: false,
            image: '',
            text: '',
        })
        this.handleClick(check);
    }
    handleClick(check) {
        if (check === success) {
            this.setState({
                message: ''
            }, () => {
                this.props.history.push('/sign-in')
            })
        } else {
            this.setState({
                message: "Что-то пошло не так!"
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        auth.register(this.state.password, this.state.email).then((res) => {
            if(!res.error && !res.message){
                this.handleOpenInfoTooltip(success, "Вы успешно зарегистрировались!")
            } else {
                this.handleOpenInfoTooltip(nonsuccess, "Что-то пошло не так! Попробуйте ещё раз.")
            }
        });
    }
    render() {
        return (
            <>
            <InfoTooltip isOpen = {this.state.isOpen} image = {this.state.image} text = {this.state.text} onClose = {this.handleCloseInfoTooltip} />
            <section className="login">
                <Header to='/sign-in' text="Войти" />
                <div className="login__container">
                    <h3 className="login__title">Регистрация</h3>
                    <form className="login__form" name = "login" onSubmit={this.handleSubmit}>
                        <label className="popup__form-field">
                            <input id="email-input" type="email" placeholder="Email" name="email" className="login__text" onChange={this.handleChange} required minLength="2" maxLength="200" />
                            <span className="email-input-error popup__text-error"></span>
                        </label>
                        <label className="popup__form-field">
                            <input id="password-input" type="password" placeholder="Пароль" name="password" className="login__text" onChange={this.handleChange} required minLength="2" maxLength="200" />
                            <span className="email-input-error popup__text-error"></span>
                        </label>
                        <button type="submit" value="Зарегистрироваться" name="login" className="login__submit-button">Зарегистрироваться</button>
                        <p className="login__txtarea">Уже зарегистрированы? <a className="login__a" href="/sign-in">Войти</a></p>
                    </form>
                </div>
            </section>
            </>
        );
    }
}
  
  export default withRouter(Register);
