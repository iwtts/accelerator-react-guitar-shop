type Comment = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
}

type CommentToPost = {
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  guitarId: number,

}

export type { Comment, CommentToPost };
