import React from 'react'
import styles from './Navbar.module.css'
import Tilt from 'react-parallax-tilt'
import  programmer  from '../../assets/programmer.png'

export const Navbar = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn) {
      return (
        <nav className={styles.navbar}>
        <Tilt>
            <div>
                <img className={styles.img} src={programmer} options={{max: 55}} height={'100px'} alt='logo' />
            </div>
        </Tilt>
        <p className={styles.linkname} onClick={()=>onRouteChange('signout')}>Sign Out</p>
    </nav>
      )
    } else {
     return(
      <nav className={styles.navbar}>
      <Tilt>
          <div>
              <img className={styles.img} src={programmer} options={{max: 55}} height={'100px'} alt='logo' />
          </div>
      </Tilt>
      <div className={styles.sideContainer}>
        <p className={styles.linkname} onClick={()=>onRouteChange('signin')}>Sign In</p>
        <p className={styles.linkname} onClick={()=>onRouteChange('register')}>Register</p>
      </div>
  </nav>
     )
    }
}
