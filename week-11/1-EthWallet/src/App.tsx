import { useState, useEffect } from 'react'
import './App.css'
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/")
    const json = await response.json(); //axios
    setPosts(json)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      {/* {JSON. stringify(posts)} */}
      {posts.map(post = <div key={posts.id}>
        {posts.title}</div>)}
    </>
  )
}

export default App
