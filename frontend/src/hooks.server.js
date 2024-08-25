import { authenticateUser } from "$lib/authenticateUser";
import { registerUser } from "$lib/registerUser";
import { redirect } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '$env/static/private';
export async function handle({event, resolve}) {
    if(event.url.pathname === '/register') {
        let body = await event.request.json();
        event.locals.username = body.username;
        let r = await registerUser(body.username, body.password);
        if(r.error) {
            event.locals.auth = false;
            event.locals.error = r.error;
        } else {
            event.locals.auth = true;
            event.cookies.set('token', r.token, {path: '/', httpOnly: true, maxAge: 60 * 60 * 24, sameSite: 'strict'});
        }
    }

    if(event.url.pathname === '/login') {
        let body = await event.request.json();
        event.locals.username = body.username;
        let l = await authenticateUser(body.username, body.password);
        if(l.error) {
            event.locals.auth = false;
            event.locals.error = l.error;
        } else {
            event.locals.auth = true;
            event.cookies.set('token', l.token, {path: '/', httpOnly: true, maxAge: 60 * 60 * 24, sameSite: 'strict'});
        }
    }

    if(event.url.pathname === '/chatroom') {
        if(!event.cookies.get('token') || !jwt.verify(event.cookies.get('token'), SECRET_JWT)) {
            throw redirect(302, '/');
        }

        
    }

    return await resolve(event);

}