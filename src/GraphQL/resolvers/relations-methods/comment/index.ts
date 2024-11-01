import prisma from "../../../../utils/prisma";

export default {
    post : async (parent : {postId : number}) => {
        try{
            return await prisma.post.findFirst({
                where : {
                    id : parent.postId
                }
            })

        } catch (err) {
            if(err instanceof Error){
                console.log(`this error is from method Comment / post ${err.message}`)
            }
            return
        }
    },
    user : async (parent : {userId : string}) => {
        try{
            return await prisma.user.findFirst({
                where : {
                    id : parent.userId
                }
            })

        } catch (err) {
            if(err instanceof Error){
                console.log(`this error is from method Comment / user ${err.message}`)
            }
            return 
        }
    }
}