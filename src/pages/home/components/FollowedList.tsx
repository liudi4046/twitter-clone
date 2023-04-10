import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"
import { useUser } from "../../../context/UserProvider"
import getFollows from "../../../lib/getFollows"
import getUserById from "../../../lib/getUserById"
import { useEffect } from "react"

export default function FollowingList() {
  const { currentUser } = useUser()
  const {
    data: followeds,
    isLoading: isFollowsLoading,
    error: followsError,
  } = useQuery(["follows", { toId: currentUser?.id }], () =>
    getFollows({ toId: currentUser?.id ?? 9999 })
  )
  //   const { data:users, isLoading: isUsersLoading, error: usersError } = useQuery(
  //     ["follows", { srcId: currentUser?.id }],
  //     () => getUserById(),
  //     {
  //         enabled:false
  //     }
  //   )
  //   useEffect(()=>{
  //     if(followings){

  //     }
  //   },[followings])

  return (
    <List
      sx={{
        width: 250,
        bgcolor: "background.paper",
        marginRight: 5,
        borderRadius: 3,
        position: "sticky",
        top: 280,
      }}
    >
      <h1 className="text-center font-bold">我的粉丝</h1>
      {followeds?.map((follow) => (
        <>
          <ListItem
            alignItems="flex-start"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={follow.toUser.image} />
            </ListItemAvatar>
            <ListItemText
              primary={follow.toUser.firstName + " " + follow.toUser.lastName}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  )
}
