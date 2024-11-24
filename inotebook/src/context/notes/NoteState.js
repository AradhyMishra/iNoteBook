import React, {useState} from "react";
import noteContext from "./noteContext";
const NoteState = (props) =>{
  const host = "http://localhost:5000";
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);
    const[alert, setAlert] = useState(null);
    const getAlert = (message, type) =>{
      setAlert({
        msg : message,
        type: type
      },
      setTimeout(()=>{
        setAlert(null); // the alert will disappear within 1.5 sec
      },3000)
    )
    } 
    //FETCH ALL NOTES
    const fetchNotes = async () =>{

      const url = `${host}/api/notes/getNotes`;
      const response = await fetch(url, {
        method: 'POST', // or 'POST', 'PUT', 'DELETE', etc., depending on the request type
        headers: {
           'Content-Type': 'application/json',   // specifies the media type of the resource
          'authToken': localStorage.getItem('token'), // example of an Authorization header
        },
      });
      const json = await response.json();
      console.log(json);
      //fetching notes from db using authtoken which gets the user id and finds all the notes from this user id.
      setNotes(json.note);
    }


    //ADD A NOTE
    const addNote = async (title,description, tag) =>{

      const url = `${host}/api/notes/createNote`;
      const response = await fetch(url, {
        method: 'POST', // or 'POST', 'PUT', 'DELETE', etc., depending on the request type
        headers: {
          'Content-Type': 'application/json',  // specifies the media type of the resource
          'authToken': localStorage.getItem('token'), // example of an Authorization header
        },
        body: JSON.stringify({title,description,tag})
      });
      const json = await response.json();
      console.log(json);
      
      setNotes(notes.concat(json)); 
      getAlert("Note uploaded successfully!","success")
    }

    //DELETE A NODE
    const deleteNote = async (id) =>{

      const url = `${host}/api/notes/deleteNote/${id}`;
      await fetch(url, {
        method: 'DELETE', // or 'POST', 'PUT', 'DELETE', etc., depending on the request type
        headers: {
          'Content-Type': 'application/json',  // specifies the media type of the resource
          'authToken': localStorage.getItem('token'), // example of an Authorization header
        },
      });
      /* s */

      console.log("Deleting this node with id: "+id);
      const newNotes = notes.filter((note)=>{return note._id !== id});
      setNotes(newNotes);
      getAlert("Note deleted successfully!","success")
    }

    
    //EDIT A NOTE
    const editNote = async (id, title, description, tag) => {
      const url = `${host}/api/notes/updateNote/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      console.log(json);
    
      // Update the specific note in state which has to be upadated
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
      getAlert("Note updated successfully!","success")
    };
    

    
    return(
        <noteContext.Provider value = {{notes,addNote,deleteNote,editNote,fetchNotes,alert,getAlert}}> {/* we are importing an object here */}
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;