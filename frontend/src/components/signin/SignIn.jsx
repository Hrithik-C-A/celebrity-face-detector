import React, { useState } from 'react'
import styles from './SignIn.module.css'

export const SignIn = ({onRouteChange,loadUser}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    fetch('http://localhost:5000/signin',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
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
            <h2 className={styles.heading}>Sign In</h2>
            <input className={styles.inputContainer} type="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
            <input className={styles.inputContainer} type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit' className={styles.signinButton} onClick={onSubmitHandler}>Sign In</button>
            <p className={styles.link} onClick={()=>onRouteChange('register')}>Register</p>
        </form>
    </div>
  )
}
