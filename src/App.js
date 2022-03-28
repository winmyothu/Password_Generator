
import React,{useState} from 'react';
import './App.css'
import {
  numbers,
  lowerCaseLetters,
  upperCaseLetters,
  specialCharacters
} from './characters';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {COPY_SUCCESS} from './message';


function App(){

  const [password,setPassword] = useState('');
  const [passwordlength,setPasswordLength] = useState(10);
  const [includeUppercase,setIncludeUppercase] = useState(false);
  const [includeLowercase,setIncludeLowercase] = useState(false);
  const [includeNumbers,setIncludeNumbers] = useState(false);
  const [includeSymbols,setIncludeSymbols] = useState(false);


  const generatePassword = e => {

    if(!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
      notify("Please select one option",true);
    }

    let characterlist ='';

    if(includeUppercase){
      characterlist += upperCaseLetters;
    }

    if(includeLowercase){
      characterlist += lowerCaseLetters;
    }

    if(includeNumbers){
      characterlist += numbers;
    }

    if(includeSymbols){
      characterlist += specialCharacters;
    }

    setPassword(createPassword(characterlist))


  }

  const createPassword = characterlist => {
    let password = ''
    const characterlistLength = characterlist.length;

    for(let i=0; i < passwordlength;i++){
      const characterIndex = Math.round(Math.random() * characterlistLength)
      
      password = password + characterlist.charAt(characterIndex);

    }
    return password;


  }

  const notify = (message,hasError=false) => {
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

  }else{
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
    
  }

  const copyPassword = e =>{
    if(password===''){
      notify('Nothing to copy',true)
    }else{
      copytoClipboard()
      notify(COPY_SUCCESS);

    }
    
  }

  const copytoClipboard = ()=>{
    const newtextArea = document.createElement('textarea');
    newtextArea.innerText = password;
    document.body.appendChild(newtextArea)
    newtextArea.select()
    document.execCommand('copy')
    newtextArea.remove()

  }

 
  
    return (
     <div className='App'>
       <div className="container">
         <div className="generator">
          <h2 className='generator_header'>
           Password Generator
          </h2>

         <div className="password_generator"> 
         <h3>{password}</h3>
         <button onClick={copyPassword} className='btn_copy'>
           <i className='far fa-clipboard'></i>
         </button>
         </div>
          
          <div className='form-group'>
            <label htmlFor='password-strength'>Password Strength</label>
            <input 
             defaultValue={passwordlength}
             onChange={(e)=>setPasswordLength(e.target.value)}
             type='number' 
             id='password-strength' 
             name='password-strength' 
             max='20' 
             min='6'></input>
          </div>

          <div className='form-group'>
            <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
            <input 
            checked={includeUppercase}
            onChange={e=>setIncludeUppercase(e.target.checked)}
            type='checkbox' id='uppercase-letters' name='uppercase-letters' ></input>
          </div>

          <div className='form-group'>
            <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
            <input 
             checked={includeLowercase}
             onChange={e=>setIncludeLowercase(e.target.checked)}
            type='checkbox' id='lowercase-letters' name='lowercase-letters' ></input>
          </div>

          <div className='form-group'>
            <label htmlFor='include-numbers'>Include Numbers</label>
            <input 
             checked={includeNumbers}
             onChange = {(e )=> setIncludeNumbers(e.target.checked)}
            type='checkbox' id='include-numbers' name='include-numbers' ></input>
          </div>

          <div className='form-group'>
            <label htmlFor='include-symbols'>Include Symbols</label>
            <input 
             checked={includeSymbols}
             onChange={e=>setIncludeSymbols(e.target.checked)}
            type='checkbox' id='include-symbols' name='include-symbols' ></input>
          </div>

          <button
          onClick={generatePassword}
          
          className='btn_generate'> Generate Password</button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

         
         </div>
        
       </div>
     </div>
    )
  
}



export default App;
