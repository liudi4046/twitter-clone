import React from "react"
import { createContext } from "vm"

const notificationContext = createContext()
export default function NotificationProvider() {
  return (
    <notificationContext.Provider value={{}}>
      notifica
    </notificationContext.Provider>
  )
}
