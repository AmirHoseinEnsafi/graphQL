import queryMethods from "./query-methods";
import mutationMethods from "./mutation-methods";
import user from "./relations-methods/user/index";
import post from "./relations-methods/post/index";
import comment from "./relations-methods/comment/index";
import updatePost from "./relations-methods/updatePost/index";
import updateComment from "./relations-methods/updateComment/index";
import createUser from "./relations-methods/createUser/index";
import returnUser from "./relations-methods/returnUser/index";
import returnPost from "./relations-methods/returnPost/index";

const resolvers = {
    Query : queryMethods ,

    Mutation : mutationMethods,

    User : user,

    Post : post,

    Comment : comment,

    UpdatePost : updatePost,

    UpdateComment : updateComment,

    CreateUser : createUser,

    ReturnUserById : returnUser,

    ReturnPostById : returnPost
}

export default  resolvers