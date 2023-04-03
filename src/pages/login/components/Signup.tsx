import React, { FormEvent, useState } from "react"
import { Button, Space } from "antd"
import sendSignupRequest from "../../../lib/sendSignupRequest"
import { useQuery } from "@tanstack/react-query"
export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [avatar, setAvatar] = useState("")
  const { data, isLoading, refetch } = useQuery(
    ["signup"],
    () => sendSignupRequest(),
    {
      enabled: false, // 禁用初始化时发送请求
    }
  )
  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    refetch()
  }
  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col max-w-xl mx-auto gap-2 mt-11"
    >
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="rounded-xl border-2 p-3"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="rounded-xl border-2 p-3"
      />
      {/* <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="rounded-xl border-2 p-3"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select> */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-xl border-2 p-3"
      />

      {/* <input
        type="date"
        placeholder="Birthdate"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        className="rounded-xl border-2 p-3"
      />

      <input type="file" accept="image/*" /> */}
      <Button type="primary" className="">
        注册
      </Button>
    </form>
  )
}
