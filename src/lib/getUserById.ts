import axios from "axios"
import React from "react"

export default async function getUserById(userId: number) {
  return axios
    .get(`${process.env.REACT_APP_JSONSERVER}/users?id=${userId}`)
    .then((res) => {
      return res.data?.[0] ?? {}
    })
}
