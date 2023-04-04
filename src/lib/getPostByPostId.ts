import axios from "axios"
import React from "react"
import { Post } from "../types"

export default async function getPostByPostId(postId: number): Promise<Post> {
  console.log(postId)
  return axios.get(`https://dummyjson.com/posts/${postId}`).then((res) => {
    return res.data
  })
}
