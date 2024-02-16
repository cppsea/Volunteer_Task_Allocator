import "./ExpandedAdminTaskCard.css";
import { faX, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ExpandedAdminTaskCard({ task, dialogRef }) {
  //handler for closing modal
  const closeModalHandler = () => dialogRef.current.close();
  return (
    <>
      <dialog
        ref={dialogRef}
        onClick={dialogClickHandler}
        className="expanded-admin-task-dialog"
      >
        <div className="expanded-admin-task">
          <div className="expanded-admin-task-header">
            <span
              className={"expanded-admin-task-dismiss expanded-admin-task-icon"}
            >
              <FontAwesomeIcon icon={faX} onClick={closeModalHandler} />
            </span>
            <div className="expanded-admin-task-field-container">
              <h3>Task:</h3>
              <h4>{task.task}</h4>
            </div>
          </div>

          <div className="expanded-admin-task-field-container">
            <h3>Shift:</h3>
            <h4>{task.shift}</h4>
          </div>
          <div className="expanded-admin-task-field-container">
            <h3>Description:</h3>
            <h4>{task.description}</h4>
          </div>

          {/*task actions*/}
          <div className="expanded-admin-task-actions">
            {/*Delete Task*/}
            <span
              className={`expanded-admin-task-icon expanded-admin-task-delete`}
              onClick={() => {
                dialogRef.current.close();
                confirmDiaRef.current.showModal();
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>

            {/*Edit Task*/}
            <span
              className={`expanded-admin-task-icon expanded-admin-task-edit`}
            >
              <FontAwesomeIcon icon={faPencil} />
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}

//handles clicking outside of dialog, will close if clicked outside

function dialogClickHandler(e) {
  if (e.target.tagName !== "DIALOG")
    //This prevents issues with forms
    return;

  const rect = e.target.getBoundingClientRect();

  const clickedInDialog =
    rect.top <= e.clientY &&
    e.clientY <= rect.top + rect.height &&
    rect.left <= e.clientX &&
    e.clientX <= rect.left + rect.width;

  if (clickedInDialog === false) e.target.close();
}
