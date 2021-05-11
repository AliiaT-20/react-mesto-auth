function PopupWithForm(props) {
    return (
        <section className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
            <div className="popup__container">
                <h3 className="popup__title">{props.title}</h3>
                <form className={`popup__form popup__form_type_${props.name}`} name = {props.name} onSubmit={props.onSubmit}>
                    {props.children}
                </form>
                <button className={`popup__close-button popup__close-button_type_${props.name}`} type="button" onClick = {props.onClose}></button>
            </div>
        </section>
    );
  }
  
  export default PopupWithForm;
  