import React from "react"

import NewPosts from "./pages/home/components/NewPosts"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import { LikedPostsProvider } from "./context/LikedPostsContext"
import { ConfigProvider } from "antd"
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#13c2c2",
        },
      }}
    >
      <LikedPostsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </LikedPostsProvider>
    </ConfigProvider>
  )
}

export default App
