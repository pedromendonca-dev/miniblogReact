import styles from './Login.module.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
  const [email,setEmail] = useState ("")
  const [password, setPassword] = useState ("")
  const [error, setError] = useState ("")


  const {login, error:authError, loading} = useAuthentication();

  const HandleSubmit = async (e) =>{
   e.preventDefault()

   setError("")

   const user ={
    email,
    password
   }


  const res = await login(user)

  console.log (res)
  }

  useEffect (()=>{
    if (authError){
      setError(authError);
    }
  },[authError])

  return (
    <div className={styles.login}>
    <h1>Sign in</h1>
    <p>Log in to post</p>
    <form onSubmit={HandleSubmit}>

      <label>
        <span>Email:</span>
        <input
          type="email"
          name="email"
          required
          placeholder='Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          name="password"
          required
          placeholder='Insert your password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </label>

      {!loading &&< button className='btn'>Log in</button>}
      {loading &&< button className='btn' disabled>Aguarde...
      </button>}
      {error && <p className='error'>{error}</p>}
    </form>
    </div>
  )
}

export default Login