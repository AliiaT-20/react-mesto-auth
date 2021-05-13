function InfoTooltip(props) {
    return (
        <section className={props.isOpen ? `popup popup_opened` : `popup`}>
            <div className="popup__container">
                <div className="popup__success-image" style = {{backgroundImage: `url(${props.image})`}}></div>
                <h5 className="popup__success-text">{props.text}</h5>
                <button className='popup__close-button' type="button" onClick = {props.onClose}></button>
            </div>
        </section>
    );
  }
  
  export default InfoTooltip;
  