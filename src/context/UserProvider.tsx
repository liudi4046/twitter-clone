import React, { createContext, useState, useContext } from "react"
import { Gender, User } from "../types"

export type contextUser = {
  id: number
  firstName: string
  lastName: string
  age: number
  gender: Gender
  email: string
  image: string
}

interface UserProviderProps {
  children: React.ReactNode
}

const UserContext = createContext<{
  currentUser?: contextUser | null
  setCurrentUser?: React.Dispatch<React.SetStateAction<contextUser | null>>
}>({})
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<contextUser | null>(null)
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
export const useUser = () => useContext(UserContext)
export default UserProvider
