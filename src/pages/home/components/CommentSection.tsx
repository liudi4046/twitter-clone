import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Comments } from "../../../types"
import getComments from "../../../lib/getComments"
import { AxiosError } from "axios"
import { LoadingOutlined } from "@ant-design/icons"

export default function CommentSection({ postId }: { postId: number }) {
  // const { data, isLoading, error } = useQuery<Comments>(
  //   `https://dummyapi.io/data/v1/post/${postId}/comment`,
  //   "GET",
  //   {}
  // )
  const { data, isLoading, error } = useQuery<Comments, AxiosError>(
    ["comment", postId],
    () => getComments(postId)
  )
  console.log(data)
  return (
    <div className="border border-slate-500 rounded-2xl p-3 bg-slate-200">
      {isLoading && (
        <div className="flex justify-center">
          <LoadingOutlined />
        </div>
      )}
      {error && error.message}
      {data &&
        data.comments.map((comment) => {
          return (
            <div key={comment.id} className=" my-3 border-b-2 border-slate-300">
              <div className="flex items-center gap-5 mb-1">
                <h1 className="font-bold">{comment.user.username}</h1>
              </div>

              <p className="">{comment.body}</p>
            </div>
          )
        })}
      {!isLoading && !data?.comments.length && <p>该贴文没有评论</p>}
    </div>
  )
}
