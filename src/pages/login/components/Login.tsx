import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"

export default function login() {
  const [userName, setUserName] = useState("")
  const [passWord, setPassWord] = useState("")
  // const { data, isLoading, refetch } = useQuery(
  //   ["login"],
  //   () => sendSignupRequest(),
  //   {
  //     enabled: false, // 禁用初始化时发送请求
  //   }
  // )
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    return
    // 在这里实现登录逻辑
  }
  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={passWord}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}
