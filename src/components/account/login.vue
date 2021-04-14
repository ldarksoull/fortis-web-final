<template>
    <div class="wrapper" id="app">
        <div class="start-screen">
            <div class="bg"></div>
            <transition name="slide">
                <div class="login-card" v-if="state ==='login'">
                    <div class="card-header mb-20 ">
                        <div class="logo">
                            <img src="/img/startScreen/logo-white-200px.png" alt="">
                        </div>
                    </div>
                    <div class="card-body mb-20">
                        <div class="input-field">
                            <div class="input mb-20"><input type="text" v-model.trim='authData.login' placeholder="Введите логин"></div>
                            <div class="input mb-20 pass">
                                <input :type="inputType" v-model.trim='password' placeholder="Введите пароль" v-if="!this.authData.key">
                                <input :type="inputType" v-model.trim='password' placeholder="Пароль сохранен" v-if="this.authData.key">
                                <button tabindex="-1" ><img :src="iconPath" alt="" @click="toggleInputType"></button>
                            </div>
                        </div>
                        <div class="help">
                            <div class="block">
                                <label for="check">
                                    <input type="checkbox" name="check" id="check" v-model.trim='newKey'>
                                    <div class="checkmark"></div>
                                    <span class="remember">Запомнить меня</span> 
                                </label>
                            </div>
                            <div class="block">
                                <div class="forgot remember" @click="recoveryPage">Забыли пароль?</div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="input-action">
                            <button class="button" v-on:click="loginEvent"><img src="/img/startScreen/login_icon.png" alt=""></button>
                        </div>
                    </div>
                    <div class="tips">
                        Нет аккаунта?
                        <div class="bold" title="Перейти к регистрации" v-on:click="registrationPage">Зарегистрируйся прямо сейчас!</div> 
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default{
    data(){
        return{
            password: '',
            inputType: 'password',
            iconPath: '/img/startScreen/Visible_inactive.png',
            state: 'login',
			newKey: false,
        }
    },
	computed: {
			...mapGetters({
				authData: "getAuthData",
			}),
	},
	mounted() {
        if (this.authData.key) this.newKey = true;
	},
    methods:{
        loginEvent(){
            let cheker = true;
            if (!this.authData.login) {
				this.addNotification({
						text: "Введите логин.",
						theme: "error"
					});
                cheker = false;
            }
            if (this.password.length === 0 && !this.authData.key) {
				this.addNotification({
						text: "Введите пароль.",
						theme: "error"
					});
                cheker = false;
            }
            if (!cheker) return;
            if (this.password.length === 0) {
                var sendData = {
                    login: this.authData.login,
                    key: this.authData.key,
                    save: this.newKey,
                };
            } else {
                var sendData = {
                    login: this.authData.login,
                    password: this.password,
                    save: this.newKey,
                };
            }
            mp.trigger("cMisc-CallServerEvent", "sLogin-TryValidateCodeAndLogIn",JSON.stringify(sendData));
        },
        registrationPage(){
            storage.setPage('registration');
			mp.trigger("cSetPage", 'registration');
        },
        recoveryPage(){
            storage.setPage('recovery');
			mp.trigger("cSetPage", 'recovery');
        },
        toggleInputType(){
            if(this.inputType === 'password'){
                this.inputType = 'text'
                this.iconPath = '/img/startScreen/Visible.png'
            }
            else if(this.inputType === 'text'){
                this.inputType = 'password'
                this.iconPath = '/img/startScreen/Visible_inactive.png'
            }
        },
        addNotification(notification) {
				storage.addNotification(notification);
        },
    },
}
</script>
<style scoped>
    /* сброс стилей */
html, body { 
    padding: 0; 
    margin: 0; 
} 
html { 
    font-size: 1em; 
} 
body { 
    font-size: 100%; 
} 
*{
    box-sizing: border-box;
}
a img, :link img, :visited img { 
    border: 0; 
} 
.wrapper{
    width: 100%;
    height: 100vh;   
}
.start-screen{
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('/img/startScreen/background.png');
    background-size: cover;
    overflow: hidden;
    font-family: "Century Gothic";
}
.bg{
    position: absolute;
    width: 65%;
    height: 100%;
    background: url('/img/startScreen/background2.png') no-repeat;
    background-position: right bottom;
    background-size: contain;
    bottom: 0;
    right: 0;
    z-index: 3;
}
.login-card{
    position: absolute;
    left: 5vw;
    top: 20vh;
    border-radius: 40px;
    background: url('/img/startScreen/card-bg.png') no-repeat;
    background-size: cover;
    width: 600px;
    padding: 20px 50px;
}

.card-header{
    display: flex;
    justify-content: center;
    position: relative;
}
.logo{
    position: relative;
    z-index: 10;
}
.back{
    position: absolute;
    left: 0;
    height: 52px;
    width: 52px;
    top: 50%;
    transform: translateY(-50%);
    background: url('/img/startScreen/back-btn.png') no-repeat;
    background-size: cover;
    transition: 0.3s;
    cursor: pointer
}
.back:hover{
    background: url('/img/startScreen/back-btn-hover.png') no-repeat;
    background-size: cover;
}
.input-field{
    display: flex;
    flex-flow: column;
    position: relative;
    z-index: 4;
}
.input{
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
}
.input input{
    width: 100%;
    height: 6.11vh;
    border-radius: 20px;
    background-color: rgba(10, 46, 88, 0.753);
    border: 2px solid transparent;
    color: #f3f4e9;
    font-family: "Century Gothic";
    font-size: 2.13vh;
    font-weight: 400;
    padding: 0 2.78vh;
    
}
.pass input{
    padding-right: 70px;
}
.pass button{
    right: 2.78vh;
    position: absolute;
    background: transparent;
    z-index: 12;
}
.pass button img{
    display: flex;
    justify-content: center;
    align-items: center
}
.input input:active, .input input:focus{
    border-radius: 20px;
    box-shadow: inset 0 0 10px rgb(26, 108, 202);
    outline: none;
}
.button{
    transition: 0.1s;
}
.button:hover{
    box-shadow: inset 0 0 10px rgba(26, 108, 202, 0.199)
}
.button:active, .button:focus{
    box-shadow: inset 0 0 10px rgb(26, 108, 202)
}
.card-footer{
    padding: 1.82vh 0;
}
.input-action{
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-footer .button{
    width: 179px;
    height: 5.09vh;
    min-height: 40px;
    border-radius: 19px;
    background-color: #0a2e58;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;
}
button{
    cursor: pointer;
    outline: none;
    border: none;  
    background: none; 
}
.tips{
    position: absolute;
    z-index: 5;
    width: 100%;
    padding: 40px 15px;
    left: 105%;
    bottom: 30px;
    border-left: 10px solid rgba(10, 46, 88, 0.753);
    color: #d1d1d1;
    font-family: "Century Gothic";
    font-size: 24px; 
    letter-spacing: 0.6px;
    background: linear-gradient(to right, rgba(10, 46, 88, 0.4) 0%, rgba(10, 46, 88, 0.0) 50% )
}
.tips .bold{
    font-weight: 700;
    letter-spacing: 0.6px;
    text-decoration: underline;
}
.mb-10{
    margin-bottom: 10px;
}
.mb-20{
    margin-bottom: 20px;
}
.help{
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #d1d1d1;
    position: relative;
    z-index: 10;
}
.block{
    display: flex;
    align-items: center;
}
.block label{
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 23px;
}
.block label .checkmark{
    position: absolute;
    left: 0;
    height: 15px;
    width: 15px;
    background: transparent;
    border: 1px solid #d1d1d1;
}
.block label input:checked ~ .checkmark{
    background: url('/img/startScreen/mark1.png') no-repeat;
    background-position: center center;
}
.block input{
    display: none;
}
.block .forgot{
    text-decoration: underline;
    cursor: pointer;
}
.remember{
    font-size: 1.57vh;
    color: #d1d1d1;
}
.content .link img{
    margin-left: 5px;
}
.slide-active, .slide-leave-active {
    transition: opacity 0.1s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
::placeholder {
    color: #b5b5b5;
    font-weight: 600
}
@media (max-width: 1367px){
    .login-card{
        width: 520px;
    }
    .news-card{
        width: 520px
    }
}
@media (max-width: 1080px){
    .tips{
        font-size: 18px;
        background: linear-gradient(to right, rgba(10, 46, 88, 0.404) 0%, rgba(10, 46, 88, 0.205) 50% )
    }
    .login-card{
        width: 450px;
        padding: 20px;
    }
    .logo img{
        width: 250px
    }
    .back{
        width: 30px;
        height: 30px;
    }
}
@media (max-width: 850px){
    .logo img{
        width: 200px
    }
    .login-card{
        width: 400px;
        padding: 20px;
    }
    .tips{
        font-size: 16px;
        background: linear-gradient(to right, rgba(10, 46, 88, 0.404) 0%, rgba(10, 46, 88, 0.205) 50% )
    }
    .back{
        width: 30px;
        height: 30px;
    }
}
</style>