import prisma from "../../../utils/prisma" 

export default  {

    async getUserById (_ : any , obj : {id : string}) {
        try{

            let returnObject : any = {} ;

            let user =  await prisma.user.count({
                where : {
                    id : obj.id
                }
            })

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

            let resultCount = await prisma.post.count({
                where : {
                    id : obj.id
                }
            })

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
}