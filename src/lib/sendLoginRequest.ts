import axios from "axios"

export default async function sendLoginRequest({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const body = {
    email,
    password,
  }
  return axios.post(`http://localhost:3001/login`, body).then((res) => res.data)
}
