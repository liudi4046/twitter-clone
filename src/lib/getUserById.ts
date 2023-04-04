import axios from "axios"
import React from "react"

export default async function getUserById(postId: number) {
  return axios.get(`https://dummyjson.com/users/${postId}`).then((res) => {
    return res.data
  })
}
