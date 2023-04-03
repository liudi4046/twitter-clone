import axios from "axios"

export default async function sendSignupRequest() {
  const body = {
    lastName: "leo",
    firstName: "steven",
    email: "example@gmail.com",
    gender: "male",
  }

  const config = {
    headers: {
      "app-id": "642566ec75ad9137e92e3351",
    },
  }

  return axios
    .post("https://dummyapi.io/data/v1/user/create", body, config)
    .then((res) => res.data)
}
