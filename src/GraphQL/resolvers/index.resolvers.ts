import prisma from "../../utils/prisma" 
import { CreateUserArgs , CreatePostArgs , CreateCommentInput , DeletePostInput , DeleteCommentInput , UpdatePostInput , UpdateCommentInput} from '../../ts-type/resolvers-types'


const resolvers = {
    Query : {

        async getUserById (_ : any , obj : {id : string}) {
            try{
                let returnObject : any = {} ;
                let user =  await prisma.user.count({where : {id : obj.id}})
                if(user > 0){
                    returnObject.userId =  obj.id
                }else{
                    returnObject.message = 'the user with given id is not the fiend please make sure sending right id'
                    returnObject.status = 400
                }
                return returnObject
            }catch(err){
                if(err instanceof Error){
                    console.log(`this error is from method getUserById ${err.message}`)
                }
                return
            }
        },

        async getUsers() {
            try {
                return await prisma.user.findMany({take : 10})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method getUsers ${err.message}`)
                }
                return 
            }
        },

        async getPosts() {
            try{
                return await prisma.post.findMany({take : 15})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method getPosts ${err.message}`)
                }
                return
            }
        },

        async getPostById(_ : any , obj : {id : number}){
            try{
                let returningObject : any = {}
                let resultCount = await prisma.post.count({where : {id : obj.id}})
                if(resultCount > 0){
                    returningObject.postId = obj.id
                }else {
                    returningObject.message = 'the giving post id is not the fined please make sure sending ok post'
                    returningObject.status = 400
                }
                return returningObject
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method get post by id ${err.message}`)
                }
                return
            }
        }
    },

    Mutation : {

        async createUser(_ : any , args : CreateUserArgs){
            try{
            let user = await prisma.user.count({where : {userName : args.input.userName}})
                if(user > 0){
                    return {
                        message : "username already exist please choice the unique userName",
                        status : 400 
                    }
                }else {
                    let createUser = await prisma.user.create({data : {userName : args.input.userName , password : args.input.password}})
                    return {
                        userId : createUser.id,
                        message : 'the user created sucssesfully',
                        status : 201 
                    }
                }
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method createUser ${err.message}`)
                }
            }
        },

        async createPost( _ : any , args : CreatePostArgs ) {
            try{
                let resultobject : any = {}
                if(args.input.content && args.input.title && args.input.userId){
                    let post =  await prisma.post.create({data : {title : args.input.title , content : args.input.content , userId : args.input.userId}})
                    resultobject.post = post
                    resultobject.message = "post created sucssesfully"
                    resultobject.status = 201
                }else{
                    resultobject.message = "one of the field was not send"
                    resultobject.status = 400
                }
                return resultobject
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method createPost ${err.message}`)
                }
                return
            }
        },
        
        async createComment(_ : any , args : CreateCommentInput) {
            try{
                return await prisma.comment.create({
                    data : {
                        content : args.input.comment , 
                        userId : args.input.userId , 
                        postId : args.input.postId}})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method createComment ${err.message}`)
                }
                return
            }
        },

        async deletePost(_ : any , args : DeletePostInput) {
            try{
                let post = await prisma.post.findFirst({where : {id : args.input.postId}})
                if(post?.userId !== args.input.userId){
                    return {
                        message : "you can't delete the someone else message",
                        status : 400
                    }
                }else {
                    let deletedPost = await prisma.post.delete({where : {id : args.input.postId}})
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
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method deletePost ${err.message}`)
                }
                return
            }
        },

        async deleteComment(_ : any , args : DeleteCommentInput){
            try{
                let comment = await prisma.comment.findFirst({where : {id : args.input.commentId}})
                if(comment?.userId !== args.input.userId){
                    return {
                        message : "you can't delete the someone else message",
                        status : 400
                    }
                }else{
                    let deletedComment = await prisma.comment.delete({where : {id : args.input.commentId}})
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
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method deleteComment ${err.message}`)
                }
                return
            }
        },

        async updatePost(_ : any , args : UpdatePostInput){
            try{
                let post = await prisma.post.findFirst({where : {id : args.input.postId}})
                if(post?.userId !== args.input.userId){
                    return {
                        message : "you can't update the someone else post",
                        status : 400
                    }
                }else {
                    if(args.input.title && args.input.content){
                        let updatedPost = await prisma.post.update({
                            where : {
                                id : args.input.postId
                            }, 
                            data : {
                                title : args.input.title ?? post.title , 
                                content : args.input.content ?? post.content
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
                }
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method updatePost ${err.message}`)
                }
                return
            }
        },

        async updateComment (_ : any , args : UpdateCommentInput) {
            try{
                let comment = await prisma.comment.findFirst({where : {id : args.input.commentId}})
                if(comment?.userId !== args.input.userId){
                    return {
                        message : "you can't update someone else comment" ,
                        status : 400
                    }
                }else {
                    let updatedComment = await prisma.comment.update({
                        where : {
                            id : args.input.commentId
                        },
                        data : {
                            content : args.input.comment
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
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method updateComment ${err.message}`)
                }
                return
            }
        }
    },

    User : {
        posts : async (parent : {id : string}) => {
            try {
                return await prisma.post.findMany({where : {userId : parent.id}})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method User / posts ${err.message}`)
                }
                return
            }
        }
    },

    Post : {
        user : async (parent : {userId : string}) => {
            try{
                return await prisma.user.findFirst({where : {id : parent.userId}})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method Post / user ${err.message}`)
                }
                return
            }
        } ,
        comments : async (parent : {id : number}) => {
            try{
                return await prisma.comment.findMany({where : {postId : parent.id}})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method Post / comments  ${err.message}`)
                }
                return
            }
        }
    },

    Comment : {
        post : async (parent : {postId : number}) => {
            try{
                return await prisma.post.findFirst({where : {id : parent.postId}})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method Comment / post ${err.message}`)
                }
                return
            }
        },
        user : async (parent : {userId : string}) => {
            try{
                return await prisma.user.findFirst({where : {id : parent.userId}})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method Comment / user ${err.message}`)
                }
                return 
            }
        }
    },

    UpdatePost : {
        post : async (parent : {postId : number}) => {
            try{
                return await prisma.post.findFirst({where : {id : parent.postId}})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method UpdatePost / post ${err.message}`)
                }
                return 
            }
        }
    },

    UpdateComment : {
        post : async (parent  : {postId : number}) => {
            try{
                return await prisma.post.findFirst({where : {id : parent.postId}})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method UpdateComment / post ${err.message}`)
                }
                return
            }
        },
        comment : async (parent : {commentId : number}) => {
            try{
                return await prisma.comment.findFirst({where : {id : parent.commentId}})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method UpdateComment / comment ${err.message}`)
                }
                return
            }
        }
    },

    CreateUser : {
        user : async (parent : {userId : string}) => {
            try{
                return await prisma.user.findFirst({where : {id : parent.userId}})
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method CreateUser / user ${err.message}`)
                }
                return
            }
        }
    },

    ReturnUserById : {
        user : async (parent : {userId : string}) => {
            try{
                if(parent.userId){
                    return await prisma.user.findFirst({where : {id : parent.userId}})
                }else{
                    return
                }
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method ReturnUserById / user  ${err.message}`)
                }
                return 
            }
        }
    },

    ReturnPostById : {
        post : async (parent : {postId : number}) => {
            try{
                if(parent.postId){
                    return await prisma.post.findFirst({where : {id : parent.postId}})
                }else{
                    return
                }
            } catch (err) {
                if(err instanceof Error){
                    console.log(`this error is from method ReturnPostById /  post ${err.message}`)
                }
                return
            }
        }
    }
}

export default  resolvers