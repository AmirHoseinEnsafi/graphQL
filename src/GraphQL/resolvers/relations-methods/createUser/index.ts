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
                console.log(`this error is from method CreateUser / user ${err.message}`)
            }
            return
        }
    }
}