import React, { useState } from "react"
import calTime from "../../../lib/calTime"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import { Link } from "react-router-dom"
import { useLikedPosts } from "../../../context/LikedPostsContext"
import CommentSection from "./CommentSection"
import { CommentOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons"
import { Post, User } from "../../../types"
import { Avatar, Button } from "antd"
import { AxiosError } from "axios"
import getUserById from "../../../lib/getUserById"
import { useQuery } from "@tanstack/react-query"
import { useUser } from "../../../context/UserProvider"
interface Props {
  post: Post
  isDetail: boolean
}

export default function SinglePost({ post, isDetail }: Props) {
  const [isLiked, setIsLiked] = useState(false)
  const [isCommentOpened, setIsCommentOpened] = useState(false)
  const text = post.body
  const postId = post.id
  const title = post.title
  const reactions = post.reactions
  const { currentUser } = useUser()
  const userId = post.userId
  const { data, isLoading, isError, error } = useQuery<User, AxiosError>(
    ["user", userId],
    () => getUserById(userId)
  )

  const handleLiked = () => {
    setIsLiked((prev) => !prev)
  }
  const handleComment = () => {
    setIsCommentOpened((prev) => !prev)
  }

  return (
    <li className="mb-3 rounded-lg p-2 mx-1 drop-shadow-2xl bg-gradient-to-r shadow-lg h-full">
      {/* each post preview */}
      <div className="flex flex-col gap-2 h-full justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-center">{title}</h1>
          <Link to={`/user/${userId}`}>
            <div className="flex items-center gap-1 justify-center">
              <Avatar alt={`${data?.firstName}`} src={`${data?.image}`} />
              <div className="text-sm text-center hover:underline hover:text-blue-400 text-blue-800">
                {data?.firstName} {data?.lastName}
              </div>
            </div>
          </Link>
        </div>
        <div className="max-h-30 overflow-hidden">
          <p className={`${isDetail ? "" : "line-clamp-3"}`}>{text}</p>
        </div>

        <div
          className={`flex gap-3 mt-2 h-fit items-center ${
            isDetail ? "" : "justify-between"
          } `}
        >
          <div onClick={handleLiked}>
            {isLiked ? (
              <Button
                type="link"
                icon={<LikeFilled style={{ fontSize: "large" }} />}
              />
            ) : (
              <Button
                type="link"
                icon={<LikeOutlined style={{ fontSize: "large" }} />}
              />
            )}
          </div>
          {!isDetail ? (
            <Link to={`/postdetail/${postId}`}>
              <span className="hover:text-blue-400 hover:underline text-blue-600">
                Details
              </span>
            </Link>
          ) : (
            <Button
              type="link"
              onClick={handleComment}
              icon={<CommentOutlined style={{ fontSize: "large" }} />}
            />
          )}
        </div>
      </div>

      {/* comment section */}
      {isCommentOpened ? <CommentSection postId={postId} /> : null}
    </li>
  )
}
