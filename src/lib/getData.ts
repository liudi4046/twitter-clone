import React from "react"

export default async function getData(url: string) {
  const res = await fetch(url)
  const data = await res.json()
  return data
}
