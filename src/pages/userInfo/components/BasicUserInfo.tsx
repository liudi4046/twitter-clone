import React, { useState } from "react"
import { User } from "../../../types"
import { useToken } from "antd/es/theme/internal"
import { Spin } from "antd"
import Button from "@mui/material/Button"
import { useMutation, useQuery } from "@tanstack/react-query"
import toggleFollow from "../../../lib/toggleFollow"
import { queryClient } from "../../../App"
import { contextUser, useUser } from "../../../context/UserProvider"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import getFollows from "../../../lib/getFollows"
export default function BasicUserInfo({ user: profileUser }: { user: User }) {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const { currentUser } = useUser()
  const naviagte = useNavigate()
  const { mutate } = useMutation(toggleFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "follows",
        { srcId: currentUser?.id, toId: profileUser.id },
      ])
    },
  })
  const { data, isLoading, error } = useQuery(
    ["follows", { srcId: currentUser?.id, toId: profileUser.id }],
    () => getFollows({ srcId: currentUser?.id ?? 9999, toId: profileUser.id })
  )
  const handleImageload = () => {
    setIsImageLoading(false)
  }
  console.log(data)
  console.log(isImageLoading)
  console.log(currentUser)
  console.log(profileUser)
  const handleFollow = () => {
    if (!currentUser) {
      toast("登录后即可关注~")
      naviagte("/signup")
      return
    }
    if (data?.length) {
      mutate({ deleteFollowId: data[0].id })
    } else {
      const newFollow = {
        srcUser: currentUser,
        toUser: profileUser,
      }
      mutate({ newFollow })
    }
  }
  return (
    <div
      className="bg-blue-300 font-mono leading-6 
    whitespace-pre text-white rounded-lg mb-5 shadow-lg flex relative justify-center"
    >
      <div className="p-4 w-fit text-center">
        <ul className="flex flex-col gap-2">
          <li>
            {isImageLoading && <Spin />}
            <img
              src={profileUser.image}
              alt="User"
              className={`w-16 h-16 rounded-full mx-auto border-slate-600 border bg-white ${
                isImageLoading ? "hidden" : ""
              }`}
              onLoad={handleImageload}
            />
          </li>

          <li>
            Name:{" "}
            <span className="">
              {profileUser.firstName} {profileUser.lastName}
            </span>
          </li>
          <li>
            Age: <span className="">{profileUser.age}</span>
          </li>
          <li>
            Gender: <span className="">{profileUser.gender}</span>
          </li>
        </ul>
      </div>
      <div className="absolute right-0 top-0 flex gap-2">
        <Button
          variant={data?.length ? "outlined" : `contained`}
          size="small"
          onClick={handleFollow}
        >
          {data?.length ? "已关注" : "关注"}
        </Button>
        <Button variant="contained" size="small">
          私信
        </Button>
      </div>
    </div>
  )
}
