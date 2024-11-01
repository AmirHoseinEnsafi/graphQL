import prisma from "../../../../utils/prisma";

export default {
    post : async (parent  : {postId : number}) => {
        try{
            return await prisma.post.findFirst({
                where : {
                    id : parent.postId
                }
            })

        } catch (err) {
            if(err instanceof Error){
                console.log(`this error is from method UpdateComment / post ${err.message}`)
            }
            return
        }
    },
    comment : async (parent : {commentId : number}) => {
        try{
            return await prisma.comment.findFirst({
                where : {
                    id : parent.commentId
                }
            })

        } catch (err) {
            if(err instanceof Error){
                console.log(`this error is from method UpdateComment / comment ${err.message}`)
            }
            return
        }
    }
}