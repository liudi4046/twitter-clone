import axios from "axios"
import { QueryFunction } from "@tanstack/react-query"
import { Posts } from "../types"

const getPosts = async (term: string, pageNumber: number): Promise<Posts> => {
  console.log("fetching...")
  return axios
    .get(
      !term.length
        ? `https://dummyjson.com/posts?limit=6&skip=${(pageNumber - 1) * 6}`
        : `https://dummyjson.com/posts/search?q=${term}&limit=6&skip=${
            (pageNumber - 1) * 6
          }`
    )
    .then((res) => {
      return res.data
    })
}
export default getPosts
