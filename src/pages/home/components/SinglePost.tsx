import React, { useState } from "react"
import calTime from "../../../lib/calTime"
import { PostPreview } from "../../../types"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import { IconButton } from "@mui/material"
import { useLikedPosts } from "../../../context/LikedPostsContext"
import CommentSection from "./CommentSection"
import useQuery from "../../../hooks/useQuery"
interface Props {
  post: PostPreview
}

export default function SinglePost({ post }: Props) {
  const { likedPosts, toggleLikedPosts } = useLikedPosts()
  const [isCommentOpened, setIsCommentOpened] = useState(false)
  const text = post.text
  const id = post.id
  const image = post.image
  const likes = post.likes
  const publishDate = post.publishDate
  const owner = post.owner

  const diff = calTime(publishDate)

  let isLiked = likedPosts.includes(id)
  const handleLiked = () => {
    toggleLikedPosts(id)
  }
  const handleComment = () => {
    setIsCommentOpened((prev) => !prev)
  }
  return (
    <li className="mb-3 rounded-lg p-2 mx-1 drop-shadow-2xl bg-gradient-to-r shadow-lg">
      {/* each post preview */}
      <div className="flex gap-3">
        {/* avatar column */}
        <div className="flex">
          <img
            src={image}
            placeholder="img here"
            className="w-12 h-12 rounded-full shadow"
          />
        </div>
        {/* name and text column */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="font-bold">
              {owner.firstName} {owner.lastName}
            </h1>
            <h1 className="text-xs font-extralight">{diff}</h1>
          </div>

          <h1>{text}</h1>
          <div className="flex gap-3 mt-2">
            <IconButton onClick={handleLiked}>
              {isLiked ? (
                <FavoriteOutlinedIcon
                  fontSize="small"
                  style={{ color: "red" }}
                />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton onClick={handleComment}>
              <CommentOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
      {/* comment section */}
      {isCommentOpened ? <CommentSection postId={id} /> : null}
    </li>
  )
}
