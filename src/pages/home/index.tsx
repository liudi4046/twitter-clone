import React from "react"
import LeftBar from "./components/LeftBar"
import AllPosts from "./components/AllPosts"
import RightBar from "./components/RightBar"
import { Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import FriendList from "./components/FriendList"
export default function Home() {
  return (
    <div className="flex justify-center">
      <AllPosts />
    </div>
  )
}
