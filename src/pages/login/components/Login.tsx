import { useQuery } from "@tanstack/react-query"
import React, { useState, useRef, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User } from "../../../types"
import axios, { AxiosError } from "axios"
import sendSignupRequest from "../../../lib/sendSignupRequest"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { ToastContainer, toast } from "react-toastify"
import { Button, LinearProgress } from "@mui/material"
import sendLoginRequest from "../../../lib/sendLoginRequest"
import { contextUser, useUser } from "../../../context/UserProvider"
type loginResponse = {
  accessToken: string
  user: contextUser
}
export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { setCurrentUser } = useUser()
  const { data, isFetching, refetch, error } = useQuery<
    loginResponse,
    AxiosError
  >(
    ["signup", email],
    () =>
      sendLoginRequest({
        email,
        password,
      }),
    {
      enabled: false, // 禁用初始化时发送请求
    }
  )
  console.log(data)
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    refetch().then((res) => {
      if (res.error) {
        toast.error("登录失败T_T: " + res.error.response?.data, {
          position: toast.POSITION.TOP_CENTER,
        })
      } else if (res.data) {
        sessionStorage.setItem("userToken", res.data.accessToken)

        setCurrentUser?.(res.data.user)
        toast.success("登录成功！^_^", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => navigate("/"),
        })
      }
    })
  }
  console.log(error)

  return (
    <div className="flex flex-col w-fit mx-auto gap-3 pt-10">
      {isFetching && (
        <div className="fixed top-0 left-0 w-full">
          <LinearProgress />
        </div>
      )}
      <form
        onSubmit={handleLogin}
        className="flex flex-col w-80 mx-auto gap-5 mt-12 border border-slate-300 shadow-lg p-5 rounded-2xl"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border-2 p-3 min-w-full"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl border-2 p-3"
          required
        />

        <div className="flex justify-center mt-4">
          <Button variant="contained" className="w-[50%]" type="submit">
            登录
          </Button>
        </div>
      </form>
      <Link
        to={"/signup"}
        className=" right-[41%] text-blue-500 hover:text-blue-400 hover:underline w-fit self-end"
      >
        还没注册
      </Link>
    </div>
  )
}
