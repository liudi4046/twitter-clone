import React from "react"
import { Posts, User } from "../../../types"
import { useQuery } from "@tanstack/react-query"
import getPostsByUserId from "../../../lib/getPostsByUserId"
import SinglePost from "../../home/components/SinglePost"
import { LoadingOutlined } from "@ant-design/icons"
import { AxiosError } from "axios"
import { Empty } from "antd"

export default function UserPosts({ userId }: { userId: number }) {
  const { data, isLoading, error, isError } = useQuery<Posts, AxiosError>(
    ["posts", "user", userId],
    () => getPostsByUserId(userId)
  )

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center mt-40">
          <LoadingOutlined style={{ fontSize: "large" }} />
        </div>
      )}
      {error && error.message}
      {!isLoading && data?.posts.length === 0 && (
        <Empty description={<span>该用户没有发帖</span>} />
      )}
      <ul>
        {data?.posts.map((post) => {
          return <SinglePost key={post.id} post={post} isDetail={false} />
        })}
      </ul>
    </div>
  )
}
