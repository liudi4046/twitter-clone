import React, { createContext, useState, ReactNode, useContext } from "react"

interface LikedPostsContextType {
  likedPosts: string[]
  toggleLikedPosts: (postId: string) => void
}

const Context = createContext<LikedPostsContextType>({
  likedPosts: [],
  toggleLikedPosts: () => {},
})
export const useLikedPosts = () => useContext(Context)

export function LikedPostsProvider({ children }: { children: ReactNode }) {
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const toggleLikedPosts = (id: string) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter((likedPost) => likedPost !== id))
    } else {
      setLikedPosts([...likedPosts, id])
    }
  }
  return (
    <Context.Provider value={{ likedPosts, toggleLikedPosts }}>
      {children}
    </Context.Provider>
  )
}
