import { json } from "@sveltejs/kit";

export async function POST({ locals, request, cookies }) {
    console.log(locals);
    
    // console.log(cookies);
    if(locals.auth) {
        return json({
            user: {
                name: locals.username
            }
        })
    } else {
        return json({
            error: locals.error,
            user: null
        })
    }

    
}