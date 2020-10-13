import React from "react";
import "./Popup.css";
import SubmitButtonCategory from "./SubmitButtonCategory";

const Modal = (props) => {
  const { displayModal } = props;
  const divStyleModel = {
    display: displayModal ? "block" : "none",
  };
  function closeModal(e) {
    const { closeModal } = props;
    e.stopPropagation();
    closeModal();
    console.log("function called");
  }
  return (
    <div className="popupOutside" style={divStyleModel}>
      <div className="popupInside">
        <span className="closeSign" onClick={closeModal}>
          &times;
        </span>
        <SubmitButtonCategory close={props.closeModal} />
      </div>
    </div>
  );
};
export default Modal;
