export const authenticateUser = async (username, password) => {
    try {
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        return await response.json();
    }
    catch(error) {
        console.error(error);
        return {
            error
        }
    }

    
}