import '../index.css';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import successImage from '../images/success.svg';
import * as auth from '../auth.js';

class Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }
    handleChange(e) {
      const {name, value} = e.target;
      this.setState({
        [name]: value 
      });
    }

    handleSubmit(e){
        e.preventDefault()
        if (!this.state.email || !this.state.password){
            return;
        }
        auth.authorize(this.state.password, this.state.email)
        .then((data) => {
            if (data.token){
            const mail = this.state.email
            this.props.apiMail(mail)
                this.setState({email: '', password: ''},
                () => {
                    this.props.handleLogin(e);
                    this.props.history.push('/');
                })
            }  
        })
        .catch(err => console.log(err)); // запускается, если пользователь не найден
    }
    render() {
        return (
            <section className="login">
                <Header to='/sign-up' text="Регистрация" />
                <div className="login__container">
                    <h3 className="login__title">Вход</h3>
                    <form className="login__form" name = "login" onSubmit={this.handleSubmit}>
                        <label className="popup__form-field">
                            <input id="email-input" value={this.state.email} onChange={this.handleChange} type="email" placeholder="Email" name="email" className="login__text" required minLength="2" maxLength="200" />
                            <span className="email-input-error popup__text-error"></span>
                        </label>
                        <label className="popup__form-field">
                            <input id="password-input" value={this.state.password} onChange={this.handleChange} type="password" placeholder="Пароль" name="password" className="login__text" required minLength="2" maxLength="200" />
                            <span className="email-input-error popup__text-error"></span>
                        </label>
                        <button type="submit" value="Войти" name="login" className="login__submit-button">Войти</button>
                    </form>
                </div>
            </section>
        );
    }
}
  
  export default withRouter(Login);
  