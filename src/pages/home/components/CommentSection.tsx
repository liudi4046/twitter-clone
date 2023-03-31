import React from "react"
import useQuery from "../../../hooks/useQuery"
import { Comments } from "../../../types"

export default function CommentSection({ postId }: { postId: string }) {
  const { data, isLoading, error } = useQuery<Comments>(
    `https://dummyapi.io/data/v1/post/${postId}/comment`,
    "GET"
  )
  console.log(data)
  return (
    <div className="border border-slate-500 rounded-2xl p-3 bg-slate-200">
      {isLoading && "isLoading..."}
      {error && error.message}
      {data &&
        data.data.map((comment) => {
          return (
            <div key={comment.id} className=" my-3 ">
              <div className="flex items-center gap-5 mb-1">
                <img
                  src="comment.owner.picture"
                  alt="avatar"
                  width={10}
                  height={10}
                ></img>
                <p className="font-bold">
                  {comment.owner.firstName} {comment.owner.lastName}
                </p>
              </div>

              <p className="">{comment.message}</p>
            </div>
          )
        })}
      {!isLoading && !data.total && <p>没有评论</p>}
    </div>
  )
}
