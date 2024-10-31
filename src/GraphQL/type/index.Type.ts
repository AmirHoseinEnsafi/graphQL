import {gql} from 'apollo-server'
// returning type of the code 

export default gql`
    type User {
        id       : String!
        userName : String!
        posts    : [post]
    }

    type Post {
        id       : Int
        title    : String!
        content  : String!
        user     :  User
        comments : [Comment]
    }

    type Comment {
        comment : String!
        postId  : Int!
        post    : Post!
        userId  : String!
        user    : User!
    }

    type Delete{
        message : String
        status  : Int
    }

    type UpdatePost {
        message : String
        status  : Int
        postId  : Int
        post    : Post
    }

    type UpdateComment {
        message : String 
        status  : Int
        postId  : Int!
        post    : Post
        commentId : Int
        comment : Comment
    }

    type CreateUser {
        message : String 
        status  : Int 
        userId  : String
        user    : User
    }

    type ReturnUserById {
        user    : User 
        userId  : String
        message : String
        status  : Int
    }

    type ReturnPostById {
        post    : Post
        postId  : Int
        message : String
        status  : Int
    }

    type ReturnCreatedPost {
        message : String
        status  : Int
        post    : Post
    }

    type Query {
        getUserById(id : Int!):ReturnUserById
        getUsers():[User]
        getPosts():[Post]
        getPostById(id : Int!):ReturnPostById
    }


    type Mutation {
        createUser(userName : String! , password : String!):User
        createPost(title : String! , content : String! , userId : int!):ReturnCreatedPost
        createComment(comment : String! , userId : Int! , postId : Int!):Comment
        deletePost(postId : Int! , userId : Int!):Delete
        deleteComment(commentId : Int! , userId : Int!):Delete
        updatePost(postId : String! , userId : Int! , title : String! , content : String!):UpdatePost
        updateComment(commentId : Int! , comment : String! , userId : Int!):UpdateComment
    }
`