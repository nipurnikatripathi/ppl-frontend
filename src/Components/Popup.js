import React from "react";
import "./Popup.css";
import SubmitButtonCategory from "./SubmitButtonCategory";
import UploadPost from "./UploadPost";

const Popup = (props) => {
  const divStyleModel = {
    display: props.displayModal ? "block" : "none",
  };
  const closePopUp = (e) => {
    e.stopPropagation();
    props.closeModal();
  };
  return (
    <div className="popupOutside" style={divStyleModel}>
      <div className="popupInside">
        <span className="closeSign" onClick={closePopUp}>
          &times;
        </span>

        {props.isPost ? (
          <UploadPost close={props.closeModal} />
        ) : (
          <SubmitButtonCategory close={props.closeModal} />
        )}
      </div>
    </div>
  );
};
export default Popup;
