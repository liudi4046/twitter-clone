export interface Post {
  id: string
  text: string
  image: string
  likes: number
  link: string
  tags: string[]
  publishDate: string
  owner: UserPreview
}

export interface UserPreview {
  id: string
  title: string
  firstName: string
  lastName: string
  picture: string
}
export interface PostPreview {
  id: string
  text: string
  image: string
  likes: number
  tags: string[]
  publishDate: string
  owner: UserPreview
}
