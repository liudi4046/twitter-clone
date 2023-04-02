import React, { useEffect, useState } from "react"
import SinglePost from "./SinglePost"
import { Post, PostPreviews } from "../../../types"
import useQuery from "../../../hooks/useQuery"
import axios from "axios"
import { PostPreview } from "../../../types"
import SearchBar from "./SearchBar"
let i = 0
interface Config {
  onSuccess?: (data: PostPreviews) => void
}

export default function NewPosts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userMap, setUserMap] = useState<{ [key: string]: string }>({})

  const { data, isLoading, error } = useQuery<PostPreviews>(
    searchTerm.length
      ? `https://dummyapi.io/data/v1/user/${userMap[searchTerm]}/post`
      : "https://dummyapi.io/data/v1/post",
    "GET",
    searchTerm.length
      ? {}
      : {
          onSuccess: (data) => {
            const tempMap = data.data.reduce((acc, post) => {
              return {
                ...acc,
                [post.owner.firstName + "_" + post.owner.lastName]:
                  post.owner.id,
              }
            }, {})
            setUserMap(tempMap)
            console.log(tempMap)
          },
        }
  )

  const onSearch: (value: string) => void = (value: string) => {
    const fullName = value.replace(/\s+/g, "_")
    console.log(fullName)
    setSearchTerm(fullName)
  }

  return (
    <div className=" col-span-3 lg:col-span-2">
      <SearchBar onSearch={onSearch} />
      <ul>
        {isLoading && "isLoading"}

        {error &&
          (error.response?.status === 400
            ? "没有找到该用户的发帖记录，点击清空按钮即可重新获取贴文"
            : error?.message + "点击清空按钮即可重新获取贴文")}
        {data &&
          data.data.map((post, index) => {
            return <SinglePost key={post.id} post={post} />
          })}
      </ul>
    </div>
  )
}
