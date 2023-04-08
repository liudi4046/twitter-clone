import { useEffect, useState } from "react"
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
import { useInView } from "react-intersection-observer"
import { TransitionGroup, CSSTransition } from "react-transition-group"
export default function NewPosts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [mergedData, setMergedData] = useState<Posts>([])
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  })
  const { data, isLoading, isError, error, refetch } = useQuery<
    Posts,
    AxiosError
  >(["posts", searchTerm, page], () => getPosts(searchTerm, page), {
    onSettled: (data) => {
      if (!data || data.length === 0 || data.length < 4) {
        // Assuming 10 is the number of posts per page
        setHasMore(false)
      }
      if (Array.isArray(data)) {
        setMergedData((oldData) => [...oldData, ...data])
      }
    },
  })
  console.log("mergedata", mergedData)
  console.log("hasMore", hasMore)
  console.log("data.length", data?.length)

  const onSearch: (value: string) => void = (value: string) => {
    const fullName = value.replace(/\s+/g, "_")
    console.log(fullName)
    setSearchTerm(fullName)
  }

  useEffect(() => {
    if (inView && !isLoading && data && data.length > 0) {
      setPage(page + 1)
    }
  }, [inView])
  console.log(inView)
  return (
    <div className="w-screen">
      page:{page}
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
        <TransitionGroup component={null}>
          {mergedData &&
            mergedData.map((post, index) => {
              return (
                <CSSTransition key={post.id} timeout={10000} classNames="fade">
                  <div>
                    <SinglePost post={post} isDetail={false} />
                    {index === mergedData.length - 1 && hasMore && (
                      <div ref={ref} className="w-full h-1">
                        {inView && <LoadingOutlined />}
                      </div>
                    )}
                  </div>
                </CSSTransition>
              )
            })}
        </TransitionGroup>
      </ul>
      {!hasMore && (
        <div className="text-center font-light text-slate-500 my-5">
          没有更多数据了~~~
        </div>
      )}
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
