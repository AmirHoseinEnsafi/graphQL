import {gql} from 'apollo-server'
import {
    updatePostInput,    deleteCommentInput,
    deletePostInput,    createCommentInput,
    createPostInput,    createUserInput,
    returnCreatedPost,  returnPostById,
    returnUserById,     createUser,
    user ,              updateCommentInput , 
    post ,              comment , 
    _delete ,           updateComment , 
    updatepost
} from './exportModules'

export default gql`

    ${user}
    ${post}
    ${comment}
    ${_delete}
    ${updatepost}
    ${updateComment}
    ${createUser}
    ${returnUserById}
    ${returnPostById}
    ${returnCreatedPost}
    ${createUserInput}
    ${createPostInput}
    ${createCommentInput}
    ${deletePostInput}
    ${deleteCommentInput}
    ${updatePostInput}
    ${updateCommentInput}
    
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