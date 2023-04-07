import axios from "axios"
import React from "react"
import { Post } from "../types"

export default async function getPostByPostId(postId: number): Promise<Post> {
  console.log(postId)
  return axios.get(`http://localhost:3001/posts?id=${postId}`).then((res) => {
    return res.data[0]
  })
}
