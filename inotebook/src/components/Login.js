import React,{useContext,useState} from "react";
import {useNavigate} from 'react-router-dom';
import noteContext from "../context/notes/noteContext";

export default function Login() {
    const context = useContext(noteContext);
    const {alert,getAlert} = context;

    let navigate = useNavigate();
    //we can make state of the current username and password
    const[cred, setCred] = useState({email:"",pass:""});


    const handleOnChange = (e) =>{
        setCred({...cred,[e.target.id]: e.target.value}) //the id matched here is the id specified in the input field, so the label and the input
    } //whenever any change happens the cred state is updated, hence that value is shown in the input field


    const handleSubmit = async(e) =>{
        e.preventDefault();
        //make the api call
        const url = `http://localhost:5000/api/auth/login`;

        const response = await fetch(url, {
          method: 'POST', // or 'POST', 'PUT', 'DELETE', etc., depending on the request type
          headers: {
             'Content-Type': 'application/json',   // specifies the media type of the resource
          },
          body: JSON.stringify({email: cred.email,password: cred.pass})
        });

        const json = await response.json();
        console.log(json);
        
        if(json.success){
            //redirect the user to home page and save the auth token whenever the user logs in
            localStorage.setItem('token',json.authToken);
            navigate("/")
            getAlert("Weclome Back!","success")
        }
        else{
            getAlert("Invalid Credentials!","danger")
        }
        
    }

  return (
    
    <div className = "container " style = {{margin: '80px'}} >
      <h2>Login: </h2>
      <form  >

        <div className="form-group my-2 mt-3">
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            className="form-control mt-2"
            id="email"
            name = "email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value = {cred.email}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            className="form-control  mt-2"
            id="pass"
            name = "pass"
            placeholder="Password"
            autoComplete="true"
            value = {cred.pass}
            onChange={handleOnChange}
          />
        </div>
        
        <button type="submit" onClick = {handleSubmit} className="btn btn-primary my-2">
          Submit
        </button>
      </form>
        </div>
      
    
  );
}


/*  hume aisa banana hai ki agar correct credentails dale to login ho jae aur home screen dikh jae, aur galat to 
    error aa jae.

div>
    <p>Already a member? </p>
      <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>
  
    <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
      <i className="fab fa-facebook-f"></i>
    </button>

    <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
      <i className="fab fa-google"></i>
    </button>

    <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
      <i className="fab fa-twitter"></i>
    </button>

    <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
      <i className="fab fa-github"></i>
    </button>
  
    </div> */