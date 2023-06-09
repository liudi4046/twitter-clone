import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { useUser } from "../../../context/UserProvider"
import axios from "axios"
import { Post, Posts } from "../../../types"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export type PostWithOutId = {
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number
}
export default function CreatePost({
  isCreatePostOpen,
  setIsCreatePostOpen,
  setMergedData,
  setPage,
  setSearchTerm,
  refetch,
  setHasMore,
}: {
  isCreatePostOpen: boolean
  setIsCreatePostOpen: (value: boolean) => void
  setMergedData: React.Dispatch<React.SetStateAction<Posts>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  refetch: any
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const { currentUser } = useUser()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate } = useMutation(
    async (newPost: PostWithOutId) => {
      const userToken = sessionStorage.getItem("userToken")

      const response = await axios.post(
        `${process.env.REACT_APP_JSONSERVER}/posts`,
        newPost,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      return response.data
    },
    {
      onSuccess: (newPost: Post) => {
        setMergedData([])
        setPage(1)
        setSearchTerm("")
        setHasMore(true)
        // refetch()
        queryClient.invalidateQueries(["posts", ""])
      },
    }
  )

  const handleSubmit = () => {
    console.log(currentUser)
    if (!currentUser) {
      toast("登录后即可发帖")
      setIsCreatePostOpen(false)
      navigate("/signup")
      return
    }
    const newPost: PostWithOutId = {
      title,
      body,
      userId: currentUser?.id ?? 999,
      tags: ["1", "2", "3"],
      reactions: 3,
    }
    mutate(newPost)
    setIsCreatePostOpen(false)
  }
  return (
    <div>
      <Dialog open={isCreatePostOpen}>
        <DialogTitle sx={{ textAlign: "center" }}>发帖</DialogTitle>
        <DialogContent className="flex flex-col min-w-[500px] gap-6">
          <TextField
            autoFocus
            id="title"
            label="标题"
            type="text"
            fullWidth
            style={{ marginTop: "15px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="正文"
            multiline
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreatePostOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
