import React from 'react';
import Header from './Header';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
        [name]: value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onRegister(this.state.password, this.state.email)
    }
    render() {
        return (
            <section className="login">
                <Header link='/sign-in' text="Войти" />
                <div className="login__container">
                    <h3 className="login__title">Регистрация</h3>
                    <form className="login__form" name = "login" onSubmit={this.handleSubmit}>
                        <label className="popup__form-field">
                            <input id="email-input" type="email" value={this.state.email} placeholder="Email" name="email" className="login__text" onChange={this.handleChange} required minLength="2" maxLength="200" />
                            <span className="email-input-error popup__text-error"></span>
                        </label>
                        <label className="popup__form-field">
                            <input id="password-input" type="password" value={this.state.password} placeholder="Пароль" name="password" className="login__text" onChange={this.handleChange} required minLength="2" maxLength="200" />
                            <span className="email-input-error popup__text-error"></span>
                        </label>
                        <button type="submit" value="Зарегистрироваться" name="login" className="login__submit-button">Зарегистрироваться</button>
                        <p className="login__txtarea">Уже зарегистрированы? <a className="login__a" href="/sign-in">Войти</a></p>
                    </form>
                </div>
            </section>
        );
    }
}
  
  export default Register;
