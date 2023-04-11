import axios from "axios"
import { Follow } from "../types"

export default async function getFollows({
  srcId,
  toId,
}: { srcId?: number; toId?: number } = {}): Promise<Follow[]> {
  let url = `${process.env.REACT_APP_JSONSERVER}/follows`
  if (srcId || toId) {
    url += "?"
  }
  if (srcId) {
    url += `srcUser.id=${srcId}`
  }
  if (toId && srcId) {
    url += `&toUser.id=${toId}`
  } else if (toId && !srcId) {
    url += `toUser.id=${toId}`
  }
  console.log(url)
  return axios.get(url).then((res) => res.data)
}
