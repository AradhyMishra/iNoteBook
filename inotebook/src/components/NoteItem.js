import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext";


export default function NoteItem(props) {
    const context = useContext(noteContext); //context has all the imported contexts(addnote,deletenote etc)
    const {note,updateNote} = props;
    const {deleteNote} = context;
  return (
    <div className='col-md-3 my-3'>
        <div className="card" >
        <div className="card-body">
          <div className="d-flex align-items-center" style = {{justifyContent: 'space-between'}}>
            <h5 className="card-title">{note.title}</h5>
            <div>
            <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() =>{deleteNote(note._id)}}></i>
            <i className="fa-duotone fa-solid fa-pen-to-square"  onClick={()=>{updateNote(note)}}></i>
            </div>
            
          </div>
            <p className="card-text">{note.description} </p>
            
        </div>
        </div>
    </div>
  )
}
