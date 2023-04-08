import axios from "axios"
import React from "react"

export default async function getUserById(userId: number) {
  return axios.get(`http://localhost:3001/users?id=${userId}`).then((res) => {
    return res.data?.[0] ?? {}
  })
}
