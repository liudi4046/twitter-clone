import React, { useState } from "react"
import { User } from "../../../types"
import { useToken } from "antd/es/theme/internal"
import { Spin } from "antd"

export default function BasicUserInfo({ user }: { user: User }) {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const handleImageload = () => {
    setIsImageLoading(false)
  }
  console.log(isImageLoading)
  return (
    <div className="bg-blue-300 font-mono leading-6 whitespace-pre text-white rounded-lg mb-5 shadow-lg">
      <div className="p-4 w-fit mx-auto text-center">
        <ul className="flex flex-col gap-2">
          <li>
            {isImageLoading && <Spin />}
            <img
              src={user.image}
              alt="User"
              className={`w-16 h-16 rounded-full mx-auto border-slate-600 border bg-white ${
                isImageLoading ? "hidden" : ""
              }`}
              onLoad={handleImageload}
            />
          </li>

          <li>
            Name:{" "}
            <span className="">
              {user.firstName} {user.lastName}
            </span>
          </li>
          <li>
            Age: <span className="">{user.age}</span>
          </li>
          <li>
            Gender: <span className="">{user.gender}</span>
          </li>

          <li>
            Username: <span className="">{user.username}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
