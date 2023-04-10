import axios from "axios"
import React from "react"

export default function getPostsByUserId(userId: number) {
  return axios
    .get(`${process.env.REACT_APP_JSONSERVER}/posts?userId=${userId}`)
    .then((res) => res.data)
}
