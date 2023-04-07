import axios from "axios"
interface SignUpUser {
  firstName: string
  lastName: string
  password: string
  gender: string
  age: number
  email: string
  image: string
}
export default async function sendSignupRequest({
  firstName,
  lastName,
  password,
  gender,
  age,
  email,
  image,
}: SignUpUser) {
  const body = {
    firstName,
    lastName,
    password,
    gender,
    age,
    email,
    image,
  }
  console.log(body)
  return axios
    .post("http://localhost:3001/users", body, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      console.log(res)
      return res.data
    })
}
