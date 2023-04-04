import axios from "axios"
import React from "react"

export default function getPostsByUserId(userId: number) {
  return axios
    .get(`https://dummyjson.com/posts/user/${userId}`)
    .then((res) => res.data)
}
