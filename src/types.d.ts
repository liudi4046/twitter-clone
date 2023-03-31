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
export interface PostPreviews {
  data: PostPreview[]
  total: number
  page: number
  limit: number
}
export interface Comment {
  id: string
  message: string
  owner: UserPreview
  post: string
  publishDate: string
}
export interface Comments {
  data: Comment[]
  total: number
  page: number
  limit: number
}
