import prisma from "../../../utils/prisma" 
import { CreateUserArgs , CreatePostArgs , CreateCommentInput , DeletePostInput , DeleteCommentInput , UpdatePostInput , UpdateCommentInput} from '../../../ts-type/resolvers-types'

export default {

    async createUser(_ : any , args : CreateUserArgs){
        try{

        const {userName , password} = args.input

        let user = await prisma.user.count({
            where : {
                userName : userName
            }
        })
            if(user > 0){
                return {
                    message : "username already exist please choice the unique userName",
                    status : 400 
                }
            }else {
                let createUser = await prisma.user.create({
                    data : {
                        userName : userName , 
                        password : password
                    }
                })
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
            
            const {content , userId , title} = args.input

            let resultobject : any = {}

            if(content && title && userId){
                let post =  await prisma.post.create({
                    data : {
                        title : title , 
                        content : content , 
                        userId : userId
                    }
                })

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

            const {postId , userId , comment} = args.input

            return await prisma.comment.create({
                data : {
                    content : comment , 
                    userId : userId , 
                    postId : postId
                }
            })

        } catch (err) {
            if(err instanceof Error){
                console.log(`this error is from method createComment ${err.message}`)
            }
            return
        }
    },

    async deletePost(_ : any , args : DeletePostInput) {
        try{

            const {postId , userId} = args.input

            let post = await prisma.post.findFirst({
                where : {
                    id : postId
                }
            })

            if(post?.userId !== userId){
                return {
                    message : "you can't delete the someone else message",
                    status : 400
                }
            }else {
                let deletedPost = await prisma.post.delete({
                    where : {
                        id : postId
                    }
                })

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
            const {userId , commentId} = args.input

            let comment = await prisma.comment.findFirst({
                where : {
                    id : commentId
                }
            })
            if(comment?.userId !== userId){
                return {
                    message : "you can't delete the someone else message",
                    status : 400
                }
            }else{
                let deletedComment = await prisma.comment.delete({
                    where : {
                        id : commentId
                    }
                })

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
            const {userId , postId , content , title} = args.input

            let post = await prisma.post.findFirst({
                where : {
                    id : postId
                }
            })

            if(post?.userId !== userId){
                return {
                    message : "you can't update the someone else post",
                    status : 400
                }
            }else {
                if(title && content){
                    let updatedPost = await prisma.post.update({
                        where : {
                            id : postId
                        }, 
                        data : {
                            title : title ?? post.title , 
                            content : content ?? post.content
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
            const {comment , commentId , userId} = args.input

            let commentResult = await prisma.comment.findFirst({
                where : {
                    id : commentId
                }
            })

            if(commentResult?.userId !== userId){
                return {
                    message : "you can't update someone else comment" ,
                    status : 400
                }
            }else {
                let updatedComment = await prisma.comment.update({
                    where : {
                        id : commentId
                    },
                    data : {
                        content : comment
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
}
