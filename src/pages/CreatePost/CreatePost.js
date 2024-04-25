import styles from "../CreatePost/Createpost.module.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");


    try {
      new URL(image)
    } catch (error) {
      setFormError("An image must be a URL");
      return
    }

    if(formError) {return}

    const tagsArray = tags.split(",").map ((tag)=>tag.trim().toLowerCase());

    if(!title || !image || !tags || !body){
      setFormError("Please, fill every field!")
      return;
    }

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });


    navigate('/')
    console.log(insertDocument)
  };
  return (
    <div className={styles.create_post}>
      <h2>Create post</h2>
      <p>Write about whatever you want and share your knowledge</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Think of a good title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          <span>Image URL</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insert a image of your post"
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <label>
          <span>Content</span>
          <textarea
            name="body"
            required
            placeholder="Insert the content of your post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>

        <label>
          <span>Tags</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insert tags separeted by comma"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Create</button>}
        {response.loading && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
