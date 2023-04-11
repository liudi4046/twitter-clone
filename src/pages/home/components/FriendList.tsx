import React from "react"
import FollowingList from "./FollowingList"
import FollowedList from "./FollowedList"

export default function FriendList() {
  return (
    <div className="h-fit flex flex-col gap-5 sticky top-3">
      <FollowingList />
      <FollowedList />
    </div>
  )
}
