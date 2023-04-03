import axios from "axios"
import { QueryFunction } from "@tanstack/react-query"
import { Posts } from "../types"

const getPosts = async (
  term: string,
  setUserMap: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string
    }>
  >,
  userMap: {
    [key: string]: string
  }
): Promise<Posts> => {
  console.log("fetching...")
  return axios
    .get(
      !term.length
        ? "https://dummyjson.com/posts"
        : `https://dummyjson.com/posts/search?q=${term}`
    )
    .then((res) => {
      return res.data
    })
}
export default getPosts
