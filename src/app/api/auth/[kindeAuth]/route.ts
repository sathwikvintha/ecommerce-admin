import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request:Request, {params}:{params:any}) {
	const endpoint = params.kindeAuth;
	const result= await handleAuth(request, endpoint);

	if(!result){
		NextResponse.json("error",{status:402})

	}
	return result as Response
}