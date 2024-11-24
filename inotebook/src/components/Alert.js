import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
const connectToMongo = require('../db'); 

export default function Alert(props) {
  const context = useContext(noteContext);
  const {alert} = context;
  const capataliseFirstCase = (words) =>{
    const word = words.toLowerCase();
    return word.charAt(0).toUpperCase() + words.slice(1);
  }
  return (
    <div>
        
      {alert && (<div className={`alert alert-${alert.type} `} style = {{marginTop: "56px"}}role="alert">
      <strong>{alert.type==='danger'?'Warning':'Success'} : {alert.msg} </strong> 
        {/* {props.message} */}
      </div>)}
    </div>
  );
}
