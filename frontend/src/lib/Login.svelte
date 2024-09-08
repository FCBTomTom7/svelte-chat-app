<script>
    import { user } from '../user.js';
    let username = '';
    let password = '';
    let Nusername = '';
    let Npassword = '';
    let currentLoginErr = '';
    let currentRegErr = '';

    let loginErrTimeout;
    let regErrTimeout;
    const login = async () => {
        clearTimeout(loginErrTimeout);
        try {
            let response = await fetch('http://localhost:5173/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            let data = await response.json();
            if(response.status < 299) {
                // good response
                if(data.error) {
                    currentLoginErr = data.error;
                    loginErrTimeout = setTimeout(() => {
                        currentLoginErr = '';
                    }, 5000)
                } else {
                    clearTimeout(loginErrTimeout);
                    currentLoginErr = '';
                }
                user.set(data.user);
            } else {
                currentLoginErr = 'Something went wrong. ' + response.status + ' status';
                loginErrTimeout = setTimeout(() => {
                    currentLoginErr = '';
                }, 5000)
            }
        }
        catch (err) {
            console.error(err);
            currentLoginErr = err;
            loginErrTimeout = setTimeout(() => {
                    currentLoginErr = '';
                }, 5000)
        }

        username = '';
        password = '';
        
    }

    const register = async () => {
        clearTimeout(regErrTimeout);
        try {
            let response = await fetch('http://localhost:5173/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: Nusername,
                    password: Npassword
                })
            });
            let data = await response.json();
            if(response.status < 299) {
                // good response
                if(data.error) {
                    currentRegErr = data.error;
                    regErrTimeout = setTimeout(() => {
                        currentRegErr = '';
                    }, 5000)
                } else {
                    clearTimeout(regErrTimeout);
                    currentRegErr = '';
                }
                user.set(data.user);
            } else {
                currentRegErr = 'Something went wrong. ' + response.status + ' status';
                regErrTimeout = setTimeout(() => {
                    currentRegErr = '';
                }, 5000)
            }
        }
        catch (err) {
            console.error(err);
            currentRegErr = err;
            regErrTimeout = setTimeout(() => {
                currentRegErr = '';
            }, 5000)
        }
        
        Nusername = '';
        Npassword = '';
    }
</script>
<div id="login-register-flex">

    <form on:submit={login} class="basic-form">
        <h1>Login</h1>
        <div class="label-input-wrapper">
            {#if currentLoginErr}
                <p class="error">{currentLoginErr}</p>
            {/if}
            <label for="username">Username</label>
            <input required type="text" class="username" bind:value={username}/>
        </div>
        <div class="label-input-wrapper">
            <label for="password">Password</label>
            <input required type="password" class="password" bind:value={password}/>
        </div>
        <button type="submit" id="submit-login">Login</button>
    </form>
    
    <form on:submit={register} class="basic-form">
        <h1>Register</h1>
        <div class="label-input-wrapper">
            {#if currentRegErr}
                <p class="error">{currentRegErr}</p>
            {/if}
            <label for="username">Username</label>
            <input required type="text" class="username" bind:value={Nusername} />
        </div>
        <div class="label-input-wrapper">
            <label for="password">Password</label>
            <input rquired type="password" class="password" bind:value={Npassword} />
        </div>
        <button type="submit" id="submit-register">Register</button>
    </form>

</div>

<style>
    .label-input-wrapper {
        position: relative;
    }

    .error {
        position: absolute;
        color: rgb(211, 22, 22);
        top: -0.8rem;
        width: 120%;
        font-size: .8rem;
    }

    #login-register-flex {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 70%;
        justify-content: space-between;
    }
    
    .basic-form {
        width: 50%;
        height: 45%;
        padding-bottom: 2%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        border: 2px solid rgb(174, 168, 168);
        border-radius: 15px;
        background: rgb(50, 46, 46);
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    button {
        width: 10%;
        border: none;
        padding: 3px;
        border-radius: 5px;
    }

    h1 {
        text-align: center;
    }

    .username, .password {
        outline: none;
    }
</style>