import React from 'react'
import { Link } from 'react-router-dom'

import { useAuthValue } from "../../context/AuthContext";

import { useFetchDocuments } from '../../hooks/useFetchDocuments';

import { useDeleteDocument } from '../../hooks/useDeleteDocument';

import styles from "../Dashboard/Dashboard.module.css";

const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid
  // User posts
  const {documents:posts, loading} = useFetchDocuments("posts", null, uid)

  const {deleteDocument} = useDeleteDocument ("posts")

    if(loading){
      return <p>Loading...</p>
    }
  

  return (
    <div className={styles.dashboard}>
      <h2>Dashsboard</h2>
      <p>Manage your posts</p>
      {posts && posts.length ===0 ? (
        <div className={styles.noposts}>
          Posts not found
          <Link to = '/posts/create'>Create your post</Link>
        </div>
      ):
      (
        <>
        <div className={styles.post_header}>
          <span>Title</span>
          <span>Ações</span>
        </div>
        
        {posts && posts.map((post)=> (
          <div key = {post.id} className={styles.post_row}>
            <p>{post.title}</p>
            <div>
              <Link to = {`/posts/${post.id}`} className="btn btn-outline">
                See more
              </Link>
              <Link to = {`/posts/edit/${post.id}`} className="btn btn-outline">
              Edit
              </Link>
              <button onClick={()=> deleteDocument(post.id) 
              } className ="btn btn-outline btn-danger">
                Remove
              </button>
            </div>
          </div>
        ))}
        </>
      )}
      
    </div>
  )
}

export default Dashboard