import { useState } from "react"
import SinglePost from "./SinglePost"

import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import AddIcon from "@mui/icons-material/Add"
import SearchBar from "./SearchBar"
import getPosts from "../../../lib/getPosts"
import { LoadingOutlined } from "@ant-design/icons"
import { Posts } from "../../../types"
import { Empty } from "antd"
import { Button, Fab } from "@mui/material"
import CreatePost from "./CreatePost"

export default function NewPosts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const { data, isLoading, isError, error } = useQuery<Posts, AxiosError>(
    ["posts", searchTerm, pageNumber],
    () => getPosts(searchTerm, pageNumber)
  )
  console.log(data)
  const onSearch: (value: string) => void = (value: string) => {
    const fullName = value.replace(/\s+/g, "_")
    console.log(fullName)
    setSearchTerm(fullName)
  }
  const clickNext = () => {
    setPageNumber(pageNumber + 1)
  }
  const clickPrevious = () => {
    setPageNumber(pageNumber - 1)
  }
  const handleAddPost = () => {}
  return (
    <div className="w-screen">
      <CreatePost
        isCreatePostOpen={isCreatePostOpen}
        setIsCreatePostOpen={setIsCreatePostOpen}
      />
      <div className="h-96 justify-center flex bg-gradient-to-r from-blue-500 to-blue-200 mb-3 flex-col gap-3">
        <h1 className="font-bold text-2xl text-center">欢迎来到Dummy Blog!</h1>
        <SearchBar onSearch={onSearch} />
      </div>
      {isLoading && (
        <div className="flex justify-center">
          <LoadingOutlined />
        </div>
      )}
      {!isLoading && data?.length === 0 && (
        <div className="flex justify-center">
          <Empty
            description={
              <span>没有找到包含该内容的帖子~点击清空按钮重新获取全部贴文</span>
            }
          />
        </div>
      )}
      {isError && (error?.response?.status === 400 ? "错误" : error.message)}

      <ul className="grid grid-cols-2 w-2/3 mx-auto gap-6">
        {data &&
          data.map((post) => {
            return <SinglePost key={post.id} post={post} isDetail={false} />
          })}
      </ul>
      <div
        className={`w-2/3 flex justify-end my-4 mx-auto gap-3 ${
          data?.length === 0 || isLoading ? "hidden" : ""
        }`}
      >
        <Button
          variant="outlined"
          disabled={pageNumber === 1}
          onClick={() => clickPrevious()}
        >
          上一页
        </Button>
        <Button
          variant="outlined"
          onClick={() => clickNext()}
          disabled={data?.length !== 6}
        >
          下一页
        </Button>
        {/* <Button type="primary">下一页</Button> */}
      </div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 10, right: 10 }}
        onClick={() => setIsCreatePostOpen(!isCreatePostOpen)}
      >
        <AddIcon />
      </Fab>
    </div>
  )
}
