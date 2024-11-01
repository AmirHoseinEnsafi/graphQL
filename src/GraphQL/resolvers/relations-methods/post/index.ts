import prisma from "../../../../utils/prisma";

export default {
    user : async (parent : {userId : string}) => {
        try{
            return await prisma.user.findFirst({
                where : {
                    id : parent.userId
                }
            })

        } catch (err) {
            if(err instanceof Error){
                console.log(`this error is from method Post / user ${err.message}`)
            }
            return
        }
    } ,
    comments : async (parent : {id : number}) => {
        try{
            return await prisma.comment.findMany({
                where : {
                    postId : parent.id
                }
            })
        } catch (err) {
            if(err instanceof Error){
                console.log(`this error is from method Post / comments  ${err.message}`)
            }
            return
        }
    }
}