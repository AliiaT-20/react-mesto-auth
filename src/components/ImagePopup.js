function ImagePopup(props) {
    return (
        <section className={props.card[0] ? `popup popup_type_image popup_opened` : `popup popup_type_image`}>
            <div className="popup__image-box">
                <img src={props.card[0]} alt={props.card[1]} className="popup__image" />
                <h2 className="popup__image-title">{props.card[1]}</h2>
                <button className="popup__close-button popup__close-button_type_image" type="button" onClick = {props.onClose}></button>
            </div>
        </section>
    );
  }
  
  export default ImagePopup;
  