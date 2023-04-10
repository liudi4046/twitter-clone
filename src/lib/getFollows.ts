import axios from "axios"
import { Follow } from "../types"

export default async function getFollows({
  srcId,
  toId,
}: { srcId?: number; toId?: number } = {}): Promise<Follow[]> {
  let url = `${process.env.REACT_APP_JSONSERVER}/follows?`
  if (srcId) {
    url += `&srcUser.Id=${srcId}`
  }
  if (toId) {
    url += `&toUser.id=${toId}`
  }
  return axios.get(url).then((res) => res.data)
}
