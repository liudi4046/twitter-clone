import React from "react"

import NewPosts from "./pages/home/components/NewPosts"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import { LikedPostsProvider } from "./context/LikedPostsContext"
import { ConfigProvider } from "antd"
import Login from "./pages/login"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
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
            colorPrimary: "#13c2c2",
          },
        }}
      >
        <LikedPostsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </LikedPostsProvider>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
