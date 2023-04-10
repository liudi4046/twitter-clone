import React from "react"
import FollowingList from "./FollowingList"
import FollowedList from "./FollowedList"

export default function FriendList() {
  return (
    <div className="h-full flex flex-col gap-5">
      <FollowingList />
      <FollowedList />
    </div>
  )
}
