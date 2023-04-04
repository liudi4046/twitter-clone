import React from "react"
import SinglePost from "../home/components/SinglePost"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import getPostByPostId from "../../lib/getPostByPostId"
import { Post } from "../../types"
import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
export default function PostDetail() {
  const { postId } = useParams()

  const { data: post, isLoading } = useQuery<Post>(["posts", postId], () =>
    getPostByPostId(parseInt(postId ?? ""))
  )
  if (isLoading) {
    return (
      <div className="flex justify-center mt-24">
        <Spin />
      </div>
    )
  }
  if (!post) return <></>
  return (
    <div className="max-w-2xl mx-auto my-11 list-none">
      <SinglePost post={post} isDetail={true} />
    </div>
  )
}
