import "./Modal.css";

//this can be used to wrap around another element and create a modal using that element
//in addition to wrapping around children, you need to pass in a state controlling whether its open or not
//and a handler that closes the modal
//also takes in a zIndex (not that important if just one modal is supposed to show up, just put a high number)
//also takes in an id prop, is necessary to close the right modal if there are multiple
//IMPORTANT: if you intend to put multiply modals overlaying each other, make sure the modal on top has a higher zIndex provided
//IMPORTANT: give the child element the classname "modal" for this to work

//the actual sizing of the modal will need to be done on the element you are providing

export default function Modal({ id, isOpen, closeHandler, children, zIndex }) {
  return isOpen ? (
    <div
      className="modal-overlay"
      onClick={modalClickHandler(closeHandler, id)}
      id={id}
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
//if we are clicking on a modal that corresponds to this specific overlay with a specific id, dont close
//otherwise, close this specific modal
function modalClickHandler(closeHandler, id) {
  return (e) => {
    e.stopPropagation();
    if (e.target.closest(`#${id} > .modal`)) {
      return;
    } else {
      closeHandler();
    }
  };
}
