import React, { useEffect, useState } from "react"
import SinglePost from "./SinglePost"
import { Post } from "../../../types"
export default function NewPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "https://dummyapi.io/data/v1/post?page=1&limit=10",
        {
          headers: {
            "app-id": "642566ec75ad9137e92e3351",
          },
        }
      )
      let data = await res.json()

      setPosts(data.data)
    }
    getData()
    console.log(posts)
  }, [])
  return (
    <div className="border border-rose-700 border-5 col-span-3 lg:col-span-2">
      <ul>
        {posts.map((post) => {
          return <SinglePost post={post} />
        })}
      </ul>
    </div>
  )
}
