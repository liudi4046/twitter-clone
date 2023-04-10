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
  return axios
    .post(`${process.env.REACT_APP_JSONSERVER}/login`, body)
    .then((res) => res.data)
}
