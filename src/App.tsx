import React from "react"

import NewPosts from "./pages/home/components/NewPosts"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import { LikedPostsProvider } from "./context/LikedPostsContext"
function App() {
  return (
    <LikedPostsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </LikedPostsProvider>
  )
}

export default App
