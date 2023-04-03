import React, { useEffect, useState } from "react"
import SinglePost from "./SinglePost"

import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

import SearchBar from "./SearchBar"
import getPosts from "../../../lib/getPosts"

export default function NewPosts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userMap, setUserMap] = useState<{ [key: string]: string }>({})
  const { data, isLoading, isError, error } = useQuery<any, AxiosError>(
    ["posts", searchTerm],
    () => getPosts(searchTerm, setUserMap, userMap)
  )
  console.log(data)
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

        {isError &&
          (error?.response?.status === 400
            ? "找不到该用户，点击清空按钮重新加载"
            : error.message)}
        {data &&
          data.posts.map((post: any) => {
            return <SinglePost key={post.id} post={post} />
          })}
      </ul>
    </div>
  )
}
