export const registerUser = async (username, password) => {
    let response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    });

    return await response.json();
}