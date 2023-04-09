import React, { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { CommentUser, Comments } from "../../../types"
import getComments from "../../../lib/getComments"
import axios, { AxiosError } from "axios"
import { LoadingOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import TextField from "@mui/material/TextField"
import { Empty } from "antd"
import { Button } from "@mui/material"
import { queryClient } from "../../../App"
import { useUser } from "../../../context/UserProvider"
import { toast } from "react-toastify"
type commentWithOutId = {
  body: string
  postId: number
  user: CommentUser
}
export default function CommentSection({ postId }: { postId: number }) {
  // const { data, isLoading, error } = useQuery<Comments>(
  //   `https://dummyapi.io/data/v1/post/${postId}/comment`,
  //   "GET",
  //   {}
  // )
  const navigate = useNavigate()
  const [comment, setComment] = useState("")
  const { data, isLoading, error } = useQuery<Comments, AxiosError>(
    ["comments", postId],
    () => getComments(postId)
  )
  const { currentUser } = useUser()
  const { mutate } = useMutation(
    async (newComment: commentWithOutId) => {
      const userToken = sessionStorage.getItem("userToken")

      const response = await axios.post(
        "http://localhost:3001/comments",
        newComment,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      return response.data
    },
    {
      onSuccess: () => {
        console.log("发评论成功")
        setComment("")
        window.scrollTo({ top: 0, behavior: "smooth" })
        queryClient.invalidateQueries(["comments", postId])
      },
    }
  )
  const handleSubmit = () => {
    console.log(currentUser)
    if (!currentUser) {
      toast("登录后即可发表评论")
      navigate("/signup")
      return
    }

    const newComment: commentWithOutId = {
      body: comment,
      postId,
      user: {
        id: currentUser?.id ?? 0,
        username:
          `${currentUser?.firstName} ${currentUser?.lastName}` ?? "游客",
      },
    }
    mutate(newComment)
  }

  return (
    <div className="">
      <div className="border border-slate-200 rounded-2xl p-3 bg-slate-200 mt-3  flex flex-col gap-1">
        {isLoading && (
          <div className="flex justify-center">
            <LoadingOutlined />
          </div>
        )}
        {error && error.message}
        {data &&
          data.map((comment) => {
            return (
              <div
                key={comment.id}
                className=" my-3 border-b-2 border-slate-300"
              >
                <div className="flex items-center gap-5 mb-1">
                  <Link to={`/user/${comment.user.id}`}>
                    <h1 className="font-bold hover:cursor-pointer  hover:text-blue-300 text-blue-800 text-sm">
                      {comment.user.username} :
                    </h1>
                  </Link>
                </div>

                <p className="mt-2">{comment.body}</p>
              </div>
            )
          })}
        {!isLoading && !data?.length && (
          <Empty description={<span>该贴文还没有评论~</span>} />
        )}
        <TextField
          multiline
          rows={5}
          placeholder="此处发表评论"
          variant="outlined"
          sx={{ width: "100%", marginTop: 6 }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end">
          <Button variant="contained" onClick={handleSubmit}>
            提交
          </Button>
        </div>
      </div>
    </div>
  )
}
