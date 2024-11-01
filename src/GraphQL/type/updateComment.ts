export default `
    type UpdateComment {
        message : String 
        status  : Int
        postId  : Int!
        post    : Post
        commentId : Int
        comment : Comment
    }
`