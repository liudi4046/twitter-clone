import axios from "axios"
import { QueryFunction } from "@tanstack/react-query"
import { Posts } from "../types"

const getPosts = async (term: string, pageNumber?: number): Promise<Posts> => {
  console.log("fetching...")
  return axios
    .get(
      !term.length
        ? `http://localhost:3001/posts?_sort=id&_order=desc`
        : `http://localhost:3001/posts?q=${term}&_sort=id&_order=desc`
    )
    .then((res) => {
      return res.data
    })
}
export default getPosts
