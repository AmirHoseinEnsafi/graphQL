import prisma from "../../../../utils/prisma";

export default {
    post : async (parent : {postId : number}) => {
        try{
            if(parent.postId){
                return await prisma.post.findFirst({
                    where : {
                        id : parent.postId
                    }
                })

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