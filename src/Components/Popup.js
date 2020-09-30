import React from "react";
import "./Popup.css";
import UploadPost from "./UploadPost";

// functional component Modal
const Popup = (props) => {
  const divStyleModel = {
    display: props.displayModal ? "block" : "none",
  };
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
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
        <span className="closeSign" onClick={closeModal}>
          &times;
        </span>

        <UploadPost
          close={props.closeModal}
          //   categoryUpdateFunction={props.categoryUpdateFunction}
        />

        {/* rendering SubmitButtonCategory */}
        {/* props : close - to close popUp  and  categoryUpdateFunction - to update category */}
        {/* <SubmitButtonCategory
              close={props.closeModal}
              categoryUpdateFunction={props.categoryUpdateFunction}
            /> */}
        {/* <span className="close" onClick={closeModal}>
              &times;
            </span> */}
      </div>
    </div>
  );
};
export default Popup;
//exporting Modal component
