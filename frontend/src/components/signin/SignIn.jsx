import React, { useState } from 'react'
import styles from './SignIn.module.css'
import { ColorRing } from 'react-loader-spinner';

export const SignIn = ({onRouteChange,loadUser}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    setIsLoading(true);
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
        setIsLoading(false);
        loadUser(data.user);
        onRouteChange('home');
      }
    })
    .catch(console.log)
    .finally(() => setIsLoading(false));
  }
  return (
      <div className={styles.mainContainer}>
      <form className={styles.formContainer}>
          <h2 className={styles.heading}>Sign In</h2>
          <input className={styles.inputContainer} type="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
          <input className={styles.inputContainer} type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
          <button type='submit' className={styles.signinButton} onClick={onSubmitHandler} disabled={isLoading}>Sign In</button>
          { isLoading && (<div className={styles.loader}>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>) }
          <p className={styles.link} onClick={()=>onRouteChange('register')}>Register</p>
      </form>
  </div>
  )
}
