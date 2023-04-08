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
}: {
  isCreatePostOpen: boolean
  setIsCreatePostOpen: (value: boolean) => void
}) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const { currentUser } = useUser()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (newPost: PostWithOutId) => {
      const userToken = sessionStorage.getItem("userToken")

      const response = await axios.post(
        "http://localhost:3001/posts",
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
        queryClient.invalidateQueries(["posts", ""])
      },
    }
  )

  const handleSubmit = () => {
    if (!currentUser) {
      toast("登录后即可发帖")
      setIsCreatePostOpen(false)
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
