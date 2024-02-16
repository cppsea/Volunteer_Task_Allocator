import "./Modal.css";

//this can be used to wrap around another element and create a modal using that element
//in addition to wrapping around children, you need to pass in a state controlling whether its open or not
//and a handler that closes the modal
//also takes in a zIndex (not that important if just one modal is supposed to show up, just put a high number)
//IMPORTANT: if you intend to put multiply modals overlaying each other, make sure the modal on top has a higher zIndex provided

//IMPORTANT: give the child element the classname "modal" for this to work
//IMPORTANT: if you want to show two modals at the same time over one another, do NOT nest a modal inside the other;
//instead put them on the same level like this:
/*
<>
<Modal .../>
<Modal .../>
</>
*/

//the actual sizing of the modal will need to be done on the element you are providing

export default function Modal({ isOpen, closeHandler, children, zIndex }) {
  return isOpen ? (
    <div
      className="modal-overlay"
      onClick={modalClickHandler(closeHandler)}
      style={{
        zIndex: `${zIndex}`,
      }}
    >
      {children}
    </div>
  ) : (
    <></>
  );
}

//handles clicking outside of modal, will close if clicked outside the modal
//if the nearest ancestor has modal class, it will not close; otherwise it is closing
function modalClickHandler(closeHandler) {
  return (e) => {
    e.stopPropagation();
    if (e.target.closest(".modal")) {
      return;
    } else {
      closeHandler();
    }
  };
}
