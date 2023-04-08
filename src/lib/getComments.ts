import axios from "axios"

export default async function getComments(postId: number) {
  return axios
    .get(`http://localhost:3001/comments?postId=${postId}&_order=desc&_sort=id`)
    .then((res) => res.data)
}
