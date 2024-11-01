export default `
    type Post {
        id       : Int
        title    : String!
        content  : String!
        user     :  User
        comments : [Comment]
    }
`