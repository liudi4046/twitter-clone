import React from "react"
import { useParams } from "react-router-dom"
import getUserById from "../../lib/getUserById"
import { useQuery } from "@tanstack/react-query"
import { User } from "../../types"
import { AxiosError } from "axios"
import BasicUserInfo from "./components/BasicUserInfo"
import UserPosts from "./components/UserPosts"
export default function UserInfo() {
  const { userId } = useParams()

  const id = parseInt(userId?.toString() ?? "")
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User, AxiosError>(["User", id], () => getUserById(id))
  if (!user) return <></>

  return (
    <div className="max-w-xl mx-auto mt-8">
      <BasicUserInfo user={user} />
      <UserPosts userId={id} />
    </div>
  )
}
