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

    input CreateUserInput {
        userName : String!
        password : String!
    }

    input CreatePostInput {
        title : String! 
        content : String! 
        userId : String!
    }

    input CreateCommentInput {
        comment : String! 
        userId : String! 
        postId : Int!
    }

    input DeletePostInput {
        postId : Int! 
        userId : String!
    }

    input DeleteCommentInput {
        commentId : Int! 
        userId : Int!
    }

    input UpdatePostInput {
        postId : String! 
        userId : Int! 
        title : String! 
        content : String!
    }

    input UpdateCommentInput {
        commentId : Int! 
        comment : String! 
        userId : Int!
    }

    type Query {
        getUserById(id : Int!):ReturnUserById
        getUsers():[User]
        getPosts():[Post]
        getPostById(id : Int!):ReturnPostById
    }


    type Mutation {
        createUser(input : CreateUserInput):User
        createPost(input : CreatePostInput):ReturnCreatedPost
        createComment(input : CreateCommentInput):Comment
        deletePost(input : DeletePostInput):Delete
        deleteComment(input : DeleteCommentInput):Delete
        updatePost(input : UpdatePostInput):UpdatePost
        updateComment(input : UpdateCommentInput):UpdateComment
    }
`