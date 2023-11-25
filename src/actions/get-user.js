"use server"



export const getUsers=async()=>{
    const { getUser } = await getKindeServerSession();

    return getUser

}