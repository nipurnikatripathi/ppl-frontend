// import React from 'react';
// class Modal extends React.Component {

import React from "react";
import SubmitButtonCategory from "./SubmitButtonCategory"; // importing SubmitButtonCategory component
import "./Popup.css";

// functional component Modal
const Modal = (props) => {
  const divStyleModel = {
    display: props.displayModal ? "block" : "none",
  };
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
    console.log("function called");
  }
  return (
    <div
      className="popupOutside"
      //  onClick={ closeModal }
      style={divStyleModel}
    >
      {/* <div className="popupInside"> */}

      {/* //  onClick={ e => e.stopPropagation() }  */}

      {/* <span className="submitButton">
          <button>Submit </button>
        </span> */}
      <div className="popupInside">
        {/* rendering SubmitButtonCategory */}
        {/* props : close - to close popUp  and  categoryUpdateFunction - to update category */}
        <span className="closeSign" onClick={closeModal}>
          &times;
        </span>
        <SubmitButtonCategory
          close={props.closeModal}
          categoryUpdateFunction={props.categoryUpdateFunction}
        />
        {/* <span className="close" onClick={closeModal}>
          &times;
        </span> */}
      </div>
    </div>
  );
};
export default Modal;
//exporting Modal component
