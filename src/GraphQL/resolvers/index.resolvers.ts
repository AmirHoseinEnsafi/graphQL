import prisma from "../../utils/prisma"

const resolvers = {
    Query : {

        async getUserById (_ : any , obj : {id : string}) {
            return await prisma.user.findFirst({where : {id : obj.id}})
        },

        async getUsers() {
            return await prisma.user.findMany({take : 10})
        },

        async getPosts() {
            return await prisma.post.findMany({take : 15})
        },

        async getPostById(_ : any , obj : {id : number}){
            return await prisma.post.findFirst({where : {id : obj.id}})
        }
    },

    Mutation : {

        async createUser(_ : any , obj : {userName : string , password : string}){
            let user = prisma.user.findFirst({where : {userName : obj.userName}})
            if(user){
                return {
                    message : "username already exist please choice the unique userName",
                    status : 400 
                }
            }else {
                let createUser = await prisma.user.create({data : {userName : obj.userName , password : obj.password}})
                return {
                    userId : createUser.id
                }
            }
        },

        async createPost( _ : any , obj : {title : string , content : string , userId : string}) {
            return await prisma.post.create({data : {title : obj.title , content : obj.content , userId : obj.userId}})
        },
        
        async createComment(_ : any , obj : {comment : string , userId : string , postId : number}) {
            return await prisma.comment.create({data : {content : obj.comment , userId : obj.userId , postId : obj.postId}})
        },

        async deletePost(_ : any , obj : {postId : number , userId : string}) {
            let post = await prisma.post.findFirst({where : {id : obj.postId}})
            if(post?.userId !== obj.userId){
                return {
                    message : "you can't delete the someone else message",
                    status : 400
                }
            }else {
                let deletedPost = await prisma.post.delete({where : {id : obj.postId}})
                if(deletedPost){
                    return {
                        message : "true",
                        status : 200
                    }
                }else{
                    return {
                        message : "false",
                        status : 500
                    }
                }
            }
        },
        async deleteComment(_ : any , obj : {commentId : number , userId : String}){
            let comment = await prisma.comment.findFirst({where : {id : obj.commentId}})
            if(comment?.userId !== obj.userId){
                return {
                    message : "you can't delete the someone else message",
                    status : 400
                }
            }else{
                let deletedComment = await prisma.comment.delete({where : {id : obj.commentId}})
                if(deletedComment){
                    return {
                        message : "true" ,
                        status  : 200
                    }
                }else {
                    return {
                        message : "false" ,
                        status  : 500
                    }
                }
            }
        },

        async updatePost(_ : any , obj : {postId : number , userId : string , title : string , content : string}){
            let post = await prisma.post.findFirst({where : {id : obj.postId}})
            if(post?.userId !== obj.userId){
                return {
                    message : "you can't update the someone else post",
                    status : 400
                }
            }else {
                let updatedPost = await prisma.post.update({
                    where : {
                        id : obj.postId
                    }, 
                    data : {
                        title : obj.title ?? post.title , 
                        content : obj.content ?? post.content
                    }
                })

                if(updatedPost){
                    return {
                        message : "true" ,
                        status : 200 ,
                        postId : updatedPost.id
                    }
                }else {
                    return {
                        message : "false" ,
                        status : 500 
                    }
                }
            }
        },
        async updateComment (_ : any , obj : {commentId : number , comment : string , userId : string}) {
            let comment = await prisma.comment.findFirst({where : {id : obj.commentId}})
            if(comment?.userId !== obj.userId){
                return {
                    message : "you can't update someone else comment" ,
                    status : 400
                }
            }else {
                let updatedComment = await prisma.comment.update({
                    where : {
                        id : obj.commentId
                    },
                    data : {
                        content : obj.comment
                    }
                })

                if(updatedComment){
                    return {
                        message : "true",
                        status : 200 ,
                        commentId : updatedComment.id
                    }
                }else {
                    return {
                        message : "false" ,
                        status : 500 
                    }
                }
            }
        }
    },

    User : {
        posts : async (parent : {id : string}) => {
            return await prisma.post.findMany({where : {userId : parent.id}})
        }
    },
    Post : {
        user : async (parent : {userId : string}) => {
            return await prisma.user.findFirst({where : {id : parent.userId}})
        } ,
        comments : async (parent : {id : number}) => {
            return await prisma.comment.findMany({where : {postId : parent.id}})
        }
    },
    Comment : {
        post : async (parent : {postId : number}) => {
            return await prisma.post.findFirst({where : {id : parent.postId}})
        },
        user : async (parent : {userId : string}) => {
            return await prisma.user.findFirst({where : {id : parent.userId}})
        }
    },
    UpdatePost : {
        post : async (parent : {postId : number}) => {
            return await prisma.post.findFirst({where : {id : parent.postId}})
        }
    },
    UpdateComment : {
        post : async (parent  : {postId : number}) => {
            return await prisma.post.findFirst({where : {id : parent.postId}})
        },
        comment : async (parent : {commentId : number}) => {
            return await prisma.comment.findFirst({where : {id : parent.commentId}})
        }
    },
    CreateUser : {
        user : async (parent : {userId : string}) => {
            return await prisma.user.findFirst({where : {id : parent.userId}})
        }
    }
}

export default  resolvers