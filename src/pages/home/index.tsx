import React from "react"
import LeftBar from "./components/LeftBar"
import NewPosts from "./components/NewPosts"
import RightBar from "./components/RightBar"
import { Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
export default function Home() {
  return (
    <div className="flex justify-center">
      <NewPosts />
    </div>
  )
}
