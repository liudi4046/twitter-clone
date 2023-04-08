//Posts
export type Posts = Post[]

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number
}

// Users
export type Users = User[]

export interface User {
  id: number
  firstName: string
  lastName: string
  age: number
  gender: Gender
  email: string
  password: string
  image: string
}

export enum Gender {
  Female = "Female",
  Male = "Male",
}

//comments
export type Comments = Comment[]

export interface Comment {
  id: number
  body: string
  postId: number
  user: CommentUser
}

export interface CommentUser {
  id: number
  username: string
}
