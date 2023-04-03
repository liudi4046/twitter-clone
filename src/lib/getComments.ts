import axios from "axios"

export default async function getComments(postId: number) {
  return axios
    .get(`https://dummyjson.com/comments/post/${postId}`)
    .then((res) => res.data)
}
