import React,{useContext,useState}  from 'react'
import noteContext from "../context/notes/noteContext";
export default function AddNote() {
    const context = useContext(noteContext);
    const {addNote} = context;
    const[note,setNote] = useState({title: '',description: '',tag:''});

    //functions to add note
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description,note.tag);
        setNote({title: '',description: '',tag:''}) //clear the input field after submiting a note
    }

    const handleOnChange = (e) =>{ // here we have to constantly update the text to our 
        setNote({...note,[e.target.id]: e.target.value}) //the note remains the same but the event(title/desc/tag) that is changing gets changed.
    }

    
  return (
    <div className="container mt-3">
      <h2>Add a Note: </h2>
      
      <form className="my-3">
        <div className="form-group my-3">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter your title... "
            onChange={handleOnChange}
            value = {note.title}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter you description here..."
            onChange={handleOnChange}
            value = {note.description}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Tag:  </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder="tag..."
            value = {note.tag}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit my-3" className="btn btn-primary"  onClick={handleClick} disabled = {note.title.length<3 || note.description.length<6}>
          Add Note
        </button>
      </form>
      </div>
  )
}
