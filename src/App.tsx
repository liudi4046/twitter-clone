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
import UserProvider from "./context/UserProvider"
import { ToastContainer } from "react-toastify"
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "",
            },
          }}
        >
          <LikedPostsProvider>
            <ToastContainer autoClose={2000} position="top-right" />
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
    </UserProvider>
  )
}

export default App
