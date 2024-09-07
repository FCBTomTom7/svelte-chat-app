import { json } from "@sveltejs/kit";
export async function GET({ cookies }) {
    cookies.delete('token', {path: '/', httpOnly: true, maxAge: 60 * 60 * 24, sameSite: 'strict'});

    return json({
        success: cookies.get('token') === null
    })
}