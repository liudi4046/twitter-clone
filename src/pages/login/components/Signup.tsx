import React, { FormEvent, useState, useRef } from "react"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import sendSignupRequest from "../../../lib/sendSignupRequest"
import { useQuery } from "@tanstack/react-query"
import { Button, LinearProgress } from "@mui/material"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { User } from "../../../types"
import axios, { AxiosError } from "axios"
import { Link, useNavigate } from "react-router-dom"
import { type } from "os"
type signupResponse = {
  accessToken: string
  user: User
}
export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState<null | number>(null)
  const [image, setImage] = useState("/images/defaultAvatar.jpg")
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data, isFetching, refetch, error } = useQuery<
    signupResponse,
    AxiosError
  >(
    ["signup", email],
    () =>
      sendSignupRequest({
        firstName,
        lastName,
        email,
        password,
        gender,
        age: age ?? 0,
        image,
      }),
    {
      enabled: false, // 禁用初始化时发送请求
    }
  )
  console.log({ data, isFetching, refetch, error })
  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    refetch().then((res) => {
      if (res.error) {
        toast.error(`注册失败: ${res.error.response?.data}`, {
          position: toast.POSITION.TOP_CENTER,
        })
      } else if (res.data) {
        sessionStorage.setItem("userToken", res.data.accessToken)
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`

        toast.success("注册成功！^_^", {
          position: toast.POSITION.TOP_CENTER,

          onClose: () => navigate("/"),
        })
      }
    })
  }

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImage(url)
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="flex flex-col w-fit mx-auto pt-11 gap-3 relative">
      {isFetching && (
        <div className="fixed top-0 left-0 w-full">
          <LinearProgress />
        </div>
      )}

      <form
        onSubmit={handleRegister}
        className="flex flex-col max-w-xl mx-auto gap-5 mt-5 border border-slate-300 shadow-lg p-5 rounded-2xl"
      >
        <div className="relative flex justify-center">
          <img
            className="rounded-full w-20 h-20 overflow-hidden"
            src={image}
            alt="avatar"
          />

          <AddCircleOutlineIcon
            className="absolute bottom-0 right-[40%] hover:cursor-pointer"
            color="primary"
            fontSize="large"
            onClick={handleUploadClick}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="rounded-xl border-2 p-3 w-[49%]"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="rounded-xl border-2 p-3 w-[49%]"
            required
          />
        </div>
        <div className="flex justify-between">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border-2 p-3 w-[49%]"
            required
          />
          <input
            type="number"
            placeholder="年龄"
            value={age ?? ""}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className=" appearance-none rounded-xl border-2 p-3 w-[49%]"
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border-2 p-3"
          required
        />

        <div className="flex gap-3 my-2">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={handleGenderChange}
              required
            />
            <span className="ml-2 text-gray-700">Male</span>
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={handleGenderChange}
              required
            />
            <span className="ml-2 text-gray-700">Female</span>
          </label>
        </div>

        <div className="flex justify-center">
          <Button variant="contained" className="w-[50%]" type="submit">
            注册
          </Button>
        </div>
      </form>
      <Link
        to={"/Login"}
        className=" text-blue-500 hover:text-blue-400 hover:underline self-end"
      >
        已经有账号了
      </Link>
    </div>
  )
}
