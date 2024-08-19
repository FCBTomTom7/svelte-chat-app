<script>
    import { user } from '../user.js';
    let username = '';
    let password = '';
    let Nusername = '';
    let Npassword = '';
    let currentErr = '';
    const login = async () => {
        try {
            let response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            if(response.status < 299) {
                // good response
                currentErr = '';
                user.set(await response.json());
            } else {
                currentErr = 'Something went wrong. ' + response.status + ' status';
            }
        }
        catch (err) {
            console.error(err);
            currentErr = err;
        }
        
    }

    const register = async () => {
        try {
            let response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: Nusername,
                    password: Npassword
                })
            });
            if(response.status < 299) {
                // good response
                currentErr = '';
                user.set(await response.json());
            } else {
                currentErr = 'Something went wrong. ' + response.status + ' status';
            }
        }
        catch (err) {
            console.error(err);
            currentErr = err;
        }
        
    }
</script>
<div id="login-register-flex">

    <form on:submit={login} class="basic-form">
        <h1>Login</h1>
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" bind:value={username}/>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" bind:value={password}/>
        </div>
        <button type="submit" id="submit-login">Login</button>
    </form>
    
    <form on:submit={register} class="basic-form">
        <h1>Register</h1>
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" bind:value={Nusername} />
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" bind:value={Npassword} />
        </div>
        <button type="submit" id="submit-register">Register</button>
    </form>

</div>

<style>
    #login-register-flex {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 80%;
        justify-content: space-evenly;
    }
    
    .basic-form {
        width: 50%;
        height: 50%;
        padding-bottom: 2%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

</style>