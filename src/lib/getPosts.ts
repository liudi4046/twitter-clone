import axios from "axios"
import { QueryFunction } from "@tanstack/react-query"
import { Posts } from "../types"

const getPosts = async (term: string, pageNumber: number): Promise<Posts> => {
  console.log("fetching...")
  return axios
    .get(
      !term.length
        ? `http://localhost:3001/posts?_limit=6&_start=${(pageNumber - 1) * 6}`
        : `http://localhost:3001/posts?q=${term}&_limit=6&_start=${
            (pageNumber - 1) * 6
          }`
    )
    .then((res) => {
      return res.data
    })
}
export default getPosts
