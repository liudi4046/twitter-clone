import axios from "axios"
import React from "react"
import { Post } from "../types"

export default async function getPostByPostId(postId: number): Promise<Post> {
  console.log(postId)
  return axios
    .get(`${process.env.REACT_APP_JSONSERVER}/posts?id=${postId}`)
    .then((res) => {
      return res.data[0]
    })
}
