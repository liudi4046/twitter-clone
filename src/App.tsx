import React from "react"

import NewPosts from "./pages/home/components/NewPosts"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import { LikedPostsProvider } from "./context/LikedPostsContext"
import { ConfigProvider } from "antd"

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import UserInfo from "./pages/userInfo"
import NavBar from "./navBar"
import About from "./pages/about"
import PostDetail from "./pages/postDetail"

import Login from "./pages/login/components/Login"
import Signup from "./pages/login/components/Signup"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "",
          },
        }}
      >
        <LikedPostsProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/user/:userId" element={<UserInfo />} />
              <Route path="/about" element={<About />} />
              <Route path="/postdetail/:postId" element={<PostDetail />} />
            </Routes>
          </BrowserRouter>
        </LikedPostsProvider>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
