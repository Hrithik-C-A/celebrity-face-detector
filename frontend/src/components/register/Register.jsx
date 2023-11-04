import React, { useState } from 'react'
import styles from './Register.module.css'

export const Register = ({onRouteChange,loadUser}) => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const onRegisterHandler = (e)=>{
    e.preventDefault();
    fetch('http://localhost:5000/register',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data=>{
      if(data.status === 'success' && data.user.id){
        loadUser(data.user)
        onRouteChange('home');
      }
    })
  }
  return (
    <div className={styles.mainContainer}>
        <form className={styles.formContainer}>
            <h2 className={styles.heading}>Register</h2>
            <input className={styles.inputContainer} type="text" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}/>
            <input className={styles.inputContainer} type="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
            <input className={styles.inputContainer} type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit' className={styles.signinButton} onClick={onRegisterHandler}>Register</button>
            {/* <p className={styles.link} onClick={()=>onRouteChange('signin')}>Sign In</p> */}
        </form>
    </div>
  )
}
