import React, { useEffect, useState } from "react"
import SinglePost from "./SinglePost"
import { Post, PostPreviews } from "../../../types"
import useQuery from "../../../hooks/useQuery"
import axios from "axios"
import { PostPreview } from "../../../types"
let i = 0
export default function NewPosts() {
  const { data, isLoading, error } = useQuery<PostPreviews>(
    "https://dummyapi.io/data/v1/post?page=1&limit=5",
    "GET"
  )
  console.log(123)
  return (
    <div className=" col-span-3 lg:col-span-2">
      <ul>
        {isLoading && "isLoading"}
        {error && error.message}
        {data &&
          data.data.map((post, index) => {
            return <SinglePost key={post.id} post={post} />
          })}
      </ul>
    </div>
  )
}
