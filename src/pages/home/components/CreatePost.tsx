import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material"
import React from "react"

export default function CreatePost({
  isCreatePostOpen,
  setIsCreatePostOpen,
}: {
  isCreatePostOpen: boolean
  setIsCreatePostOpen: (value: boolean) => void
}) {
  return (
    <div>
      <Dialog open={isCreatePostOpen}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreatePostOpen(false)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
