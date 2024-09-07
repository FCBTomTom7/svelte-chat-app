import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '$env/static/private';
export async function load({ cookies }) {
    let token = cookies.get('token');
    if(token) {
        let data = jwt.verify(token, SECRET_JWT);
        console.log('**LOAD** token data', data);
        return {
            name: data.authedUser.username
        }
    } else {
        console.log('**LOAD** null');
        return {
            name: null
        }
    }
}

    