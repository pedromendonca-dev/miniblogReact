import React from 'react';
import styles from './Register.module.css';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {

  const [displayname,setDisplayName] = useState("")
  const [email,setEmail] = useState ("")
  const [password, setPassword] = useState ("")
  const [confirmPassword, setConfirmPassword] = useState ("")
  const [error, setError] = useState ("")


  const {createUser, error:authError, loading} = useAuthentication();

  const HandleSubmit = async (e) =>{
   e.preventDefault()

   setError("")

   const user ={
    displayname,
    email,
    password
   }

   if (password!== confirmPassword){
    setError("The passwords need to match.");
    return
  }

  const res = await createUser(user)

  console.log (res)
  }

  useEffect (()=>{
    if (authError){
      setError(authError);
    }
  },[authError])

  return (
    <div className={styles.register}>
      <h1>User Registration</h1>
      <p>Please register to create posts</p>
      <form onSubmit={HandleSubmit}>
        <label>
          <span>Name:</span>
          <input
            type="text"
            name="displayname"
            required
            placeholder='Name'
            value={displayname}
            onChange={(e)=>setDisplayName(e.target.value)}
          />
        </label>

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

        <label>
          <span>Confirm password:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder='Confirm your password'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading &&< button className='btn'>Cadastrar</button>}
        {loading &&< button className='btn' disabled>Aguarde...
        </button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
