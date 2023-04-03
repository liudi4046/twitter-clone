import React, { useState } from "react"
import calTime from "../../../lib/calTime"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import { IconButton } from "@mui/material"
import { useLikedPosts } from "../../../context/LikedPostsContext"
import CommentSection from "./CommentSection"
import { CommentOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons"
import { Post } from "../../../types"
import { Button } from "antd"

interface Props {
  post: Post
}

export default function SinglePost({ post }: Props) {
  const [isLiked, setIsLiked] = useState(false)
  const [isCommentOpened, setIsCommentOpened] = useState(false)
  const text = post.body
  const id = post.id
  const title = post.title
  const reactions = post.reactions

  const userId = post.userId

  const handleLiked = () => {
    setIsLiked((prev) => !prev)
  }
  const handleComment = () => {
    setIsCommentOpened((prev) => !prev)
  }
  return (
    <li className="mb-3 rounded-lg p-2 mx-1 drop-shadow-2xl bg-gradient-to-r shadow-lg ">
      {/* each post preview */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-center">{title}</h1>
          <h1 className="text-sm text-center">{userId}</h1>
        </div>

        <h1>{text}</h1>
        <div className="flex gap-3 mt-2 hover:cursor-pointer">
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

          <Button
            type="link"
            onClick={handleComment}
            icon={<CommentOutlined style={{ fontSize: "large" }} />}
          />
        </div>
      </div>

      {/* comment section */}
      {isCommentOpened ? <CommentSection postId={id} /> : null}
    </li>
  )
}
