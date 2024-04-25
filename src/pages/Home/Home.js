import React from 'react'
import styles from "./Home.module.css"

import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

// components

const Home = () => {
  const [query, setQuery] = useState('')
  const [posts]= useState([])

  const handleSubmit= (e) =>{
    e.preventDefault()
  }


  return (
    <div className={styles.home}>
      <h1>Check out our most recent posts.</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type='text' placeholder='Or search by tags.' onChange={(e)=> setQuery(e.target.value)}></input>
        <button className='btn btn-dark'>Search</button>
      </form>
      <div>
        <h1>Posts...</h1>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>No post has found</p>
            <Link to ='/posts/create'className='btn'>Create your first post</Link>
          </div>
        )}
      </div>
    </div>)
}

export default Home