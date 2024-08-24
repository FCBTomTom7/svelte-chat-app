import { authenticateUser } from "$lib/authenticateUser";
import { registerUser } from "$lib/registerUser";
import { error } from "@sveltejs/kit";

export async function handle({event, resolve}) {
    if(event.url.pathname === '/register') {
        let body = await event.request.json();
        event.locals.username = body.username;
        let r = registerUser(body.username, body.password);
        if(r.error) {
            event.locals.auth = false;
            event.locals.error = r.error;
        } else {
            event.locals.auth = true;
        }
    }

    if(event.url.pathname === '/login') {
        let body = await event.request.json();
        event.locals.username = body.username;
        let l = authenticateUser(body.username, body.password);
        if(l.error) {
            event.locals.auth = false;
            event.locals.error = l.error;
        } else {
            event.locals.auth = true;
        }
    }
    return await resolve(event);

}