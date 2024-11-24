import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import noteContext from "../context/notes/noteContext";

export const Signup = () => {
    let navigate = useNavigate(); //use the navigate hook to redirect after successuful signup
    const context = useContext(noteContext);
    const {getAlert} = context;

    const [cred,setCred] = useState({name:"",email:"",password:"",cpassword:""});
    const handleOnClick = (e) =>{
        setCred({...cred,[e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(cred.password !== cred.cpassword){
            alert("Password should be the same!");
        }
        
        //call the function that will handle the api request
        const url = `http://localhost:5000/api/auth/createUser`;

        const response = await fetch(url, {
          method: 'POST', // or 'POST', 'PUT', 'DELETE', etc., depending on the request type
          headers: {
             'Content-Type': 'application/json',   // specifies the media type of the resource
          },
          body: JSON.stringify({name: cred.name,email: cred.email,password: cred.password})
        });

        const json = await response.json();
        console.log(json);
        
        if(json.success){
            //redirect the user to home page and save the auth token whenever the user logs in
            localStorage.setItem('token',json.authToken);
            navigate("/")
            getAlert("Account Created successfully","success")
        }
        else{
            alert(json.error);
            getAlert("Check mandatory fields","danger")
        }
        /* setCred({name:"",email:"",password:"",cpassword:""}) */
    }
    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="name">Name:</label>
                    <input type="text" value = {cred.name} className="form-control" id="name"  placeholder="Enter your name" required onChange = {handleOnClick}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address:</label>
                    <input type="email" value = {cred.email} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required onChange= {handleOnClick}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="epasswrod">Password:</label>
                    <input type="password"  value = {cred.password} className="form-control" id="password" autoComplete='true' placeholder="Password" required minLength={6} onChange = {handleOnClick}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="cpassword">Confirm Password:</label>
                    <input type="cpassword" value = {cred.cpassword} className="form-control" id="cpassword" placeholder="ReType Password" autoComplete='true' minLength={6} onChange = {handleOnClick}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
