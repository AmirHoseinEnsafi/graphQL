export default `
    type Comment {
        comment : String!
        postId  : Int!
        post    : Post!
        userId  : String!
        user    : User!
    }
`