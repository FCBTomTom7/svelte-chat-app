export const authenticateUser = async (username, password) => {
    let response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    })

    return await response.json();
}