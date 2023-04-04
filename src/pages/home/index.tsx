import React from "react"
import LeftBar from "./components/LeftBar"
import NewPosts from "./components/NewPosts"
import RightBar from "./components/RightBar"

export default function Home() {
  return (
    <div className="flex justify-center">
      <NewPosts />
    </div>
  )
}
