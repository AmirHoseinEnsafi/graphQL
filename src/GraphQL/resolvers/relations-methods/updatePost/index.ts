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
                console.log(`this error is from method UpdatePost / post ${err.message}`)
            }
            return 
        }
    }
}