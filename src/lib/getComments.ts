import axios from "axios"

export default async function getComments(postId: number) {
  return axios
    .get(
      `${process.env.REACT_APP_JSONSERVER}/comments/?postId=${postId}&_order=desc&_sort=id`
    )
    .then((res) => res.data)
}
