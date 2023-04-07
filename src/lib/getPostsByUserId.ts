import axios from "axios"
import React from "react"

export default function getPostsByUserId(userId: number) {
  return axios
    .get(`http://localhost:3001/posts?userId=${userId}`)
    .then((res) => res.data)
}
