import React, { useContext, useState } from "react";
import { useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {useNavigate} from 'react-router-dom';

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, fetchNotes,editNote,getAlert } = context;
  let navigate = useNavigate();
  useEffect(() => {

    if(localStorage.getItem('token')){ //if logged in then fetch notes
      fetchNotes();
    }
    else{
      
      navigate("/login") //else redirect to login
    }
    // eslint-disable-next-line
  }, [navigate]);

  // Control modal visibility and data for editing
  const [modalVisible, setModalVisible] = useState(false);
  /* const [id,setId] = useState(''); */
  const [note, setNote] = useState({eid:"", etitle: "", edescription: "", etag: "" }); //created a state to update the
  // updated values of title, desc and tag in the inputs when we are typing in the modal box to update the values.

  const updateNote = (currentNote) => { //this function will be triggered when we click on edit icon in a note.
    setModalVisible(true); // Show modal
    setNote({ //fetches the currently data holded by title,desc and tag and shows it in the update box, when we first open it
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    
  };

  const handleClick = (e) => {
    console.log("Updating the note...", note);
    e.preventDefault();
    editNote(note.eid,note.etitle,note.edescription,note.etag);
    setModalVisible(false); // Close modal after update
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //whenever we type in the input fields, this triggers
    // the event and updates the value of that event
  };

  return (
    <div>
      <AddNote />
      <div
        className={`modal fade ${modalVisible ? "show" : ""}`}
        style={{ display: modalVisible ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!modalVisible}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setModalVisible(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModalVisible(false)}
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary" disabled = {note.etitle.length<3 || note.edescription.length<6}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes:</h2>
      <div className="row my-3 mt-3">
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
            />
          );
        })}
      </div>
    </div>
  );
}
