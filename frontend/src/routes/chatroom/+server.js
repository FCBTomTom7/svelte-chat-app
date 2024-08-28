import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
export async function GET({ cookies }) {
    console.log("sdfsdf");
    if(!cookies.GET('token') || !jwt.verify(cookies.GET('token'), SECRET_JWT)) {
        throw redirect(302, '/');
    }
}