import { useState } from "react"
import { postAdded } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();

  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  
  const users = useSelector(selectAllUsers);

  const onTitleChanged = (event) => setTitle(event.target.value)
  const onContentChanged = (event) => setContent(event.target.value)
  const onAuthorChanged = (event) => setUserId(event.target.value)

  const onSavePostClick = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId))
      setTitle('');
      setContent('');
      setUserId('');
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />

        <button type="button" onClick={onSavePostClick} disabled={!canSave}>Save post</button>
      </form>
    </section>
  )
}

export default AddPostForm;