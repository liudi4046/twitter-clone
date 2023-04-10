import axios from "axios"
import React from "react"
import { Follow, User } from "../types"
import { contextUser } from "../context/UserProvider"
type FollowWithoutId = {
  srcUser: contextUser
  toUser: User
}
export default async function toggleFollow({
  newFollow,
  deleteFollowId,
}: {
  newFollow?: FollowWithoutId
  deleteFollowId?: number
} = {}) {
  const userToken = sessionStorage.getItem("userToken")
  if (newFollow) {
    const response = await axios.post(
      `${process.env.REACT_APP_JSONSERVER}/follows`,
      newFollow,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    return response.data
  } else {
    const response = await axios.delete(
      `${process.env.REACT_APP_JSONSERVER}/follows/${deleteFollowId}`,

      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    return response.data
  }
}
