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
import { Fab } from "@mui/material"
import CreatePost from "./CreatePost"
import { useInView } from "react-intersection-observer"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import FriendList from "./FriendList"
export default function AllPosts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [transitionKey, settransitionKey] = useState(1)
  const [mergedData, setMergedData] = useState<Posts>([])
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  })
  const { data, isLoading, isError, error, refetch } = useQuery<
    Posts,
    AxiosError
  >(["posts", searchTerm, page], () => getPosts(searchTerm, page), {
    onSuccess: (data) => {
      if (!data || data.length === 0 || data.length < 4) {
        setHasMore(false)
      }
      if (Array.isArray(data)) {
        setMergedData((oldData) => [...oldData, ...data])
      }
    },
    cacheTime: 0,
  })
  console.log(process.env.REACT_APP_JSONSERVER)
  const onSearch: (value: string) => void = (value: string) => {
    console.log(null)
    setMergedData([])
    setPage(1)
    settransitionKey((prev) => prev + 1)
    setSearchTerm(value)
    refetch()
    setHasMore(true)
  }

  useEffect(() => {
    if (inView && !isLoading && data && data.length > 0) {
      setPage(page + 1)
    }
  }, [inView])

  return (
    <div className="w-screen">
      <CreatePost
        isCreatePostOpen={isCreatePostOpen}
        setIsCreatePostOpen={setIsCreatePostOpen}
        setMergedData={setMergedData}
        setPage={setPage}
        setSearchTerm={setSearchTerm}
        refetch={refetch}
        setHasMore={setHasMore}
      />
      <div className="h-96 justify-center flex bg-gradient-to-r from-blue-500 to-blue-200 mb-3 flex-col gap-3">
        <h1 className="font-bold text-2xl text-center">欢迎来到Dummy Blog!</h1>
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="flex ">
        <div className="w-full">
          {/* posts section */}
          {isLoading && !mergedData.length && (
            <div className="flex justify-center">
              <LoadingOutlined />
            </div>
          )}
          {!isLoading && mergedData.length === 0 && (
            <div className="flex justify-center">
              <Empty
                description={
                  <span>
                    没有找到包含该内容的帖子~点击清空按钮重新获取全部贴文
                  </span>
                }
              />
            </div>
          )}
          {isError &&
            (error?.response?.status === 400 ? "错误" : error.message)}
          <ul className="grid grid-cols-2 w-2/3 mx-auto gap-6">
            <TransitionGroup component={null} key={transitionKey}>
              {mergedData &&
                mergedData.map((post, index) => {
                  return (
                    <CSSTransition
                      key={post.id}
                      timeout={1000}
                      classNames="fade"
                    >
                      <div>
                        <SinglePost post={post} isDetail={false} />
                        {/* {index === mergedData.length - 1 && hasMore && (
                      <div className="" ref={ref}>
                        {inView && <LoadingOutlined />}
                      </div>
                    )} */}
                      </div>
                    </CSSTransition>
                  )
                })}
            </TransitionGroup>
          </ul>
          <div
            className="text-center font-light text-slate-500 my-5"
            ref={ref}
          ></div>
          {!hasMore && !(!isLoading && mergedData.length === 0) && (
            <div className="text-center font-light text-slate-500 my-5">
              没有更多数据了~~~
            </div>
          )}
        </div>
        {/* friends list section */}
        <div>
          <FriendList />
        </div>
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
