<template>
    <div class="wrapper" id="app">
        <div class="start-screen">
            <div class="bg"></div>
            <div class="login-card">
                <div class="card-header mb-20 ">
                    <div class="logo">
                        <img src="/img/startScreen/logo-white-200px.png" alt="">
                    </div>
                    <div class="back" title="Вернуться ко входу на сервер" v-on:click="mainPage"></div>
                </div>
                <div class="card-body mb-20">
                    <div class="input-field">
                        <div class="input mb-10"><input type="text" maxlength="100" placeholder="Имя пользователя" v-model.trim='login'></div>
                        <div class="input mb-10"><input type="email" maxlength="100" placeholder="Email" v-model.trim='email'></div>
                        <div class="input mb-10 pass">
                            <input :type="inputType" placeholder="Пароль" v-model.trim='pass1'>
                            <button tabindex="-1" ><img :src="iconPath" alt="" @click="toggleInputType"></button>
                        </div>
                        <div class="input mb-10"><input type="password" maxlength="100" placeholder="Повторите пароль" v-model.trim='pass2'></div>
                        <div class="input mb-10"><input type="text" maxlength="50" v-model.trim='promocode' placeholder="Промокод (необязательно)"></div>
                        <div class="code-wrapper" v-if="codeSended">>
                            <div class="input mb-10 input-code"><input type="text" maxlength="6" placeholder="Код из письма" v-model="code"></div>
                             <div class="input-action">
                                <button class="button button-accept mb-10" v-on:click="verifyCode">Подтвердить</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer" v-if="!codeSended">
                    <div class="input-action">
                        <button class="button" v-on:click="regSend"><img src="/img/startScreen/register-icon.png" alt=""></button>
                    </div>
                </div>
                <div class="tips">
                    Промокод дает
                    <div class="bold">небольшой бонус на старте</div> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default{
    data(){
        return{
            login: '',
            pass1: '',
            pass2: '',
            email: '',
            inputType: 'password',
            iconPath: '/img/startScreen/Visible_inactive.png',
            code: "",
            promocode: null,
        }
    },
    computed: {
        ...mapGetters({
            codeSended: "getCodeSended",
        }),
    },
    methods:{
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
        regSend: function (){
           let cheker = true;
            if (this.login.length == 0) {
                //window.dataCEF.$refs.notif.add(['error','Введите логин!']);
				this.addNotification({
						text: "Введите логин.",
						theme: "error"
					});
                cheker = false;
            }
            if (this.email.length == 0) {
				this.addNotification({
						text: "Введите Email.",
						theme: "error"
					});
                //window.dataCEF.$refs.notif.add(['error','Введите Email!']);
                cheker = false;
            }
            if (this.pass1.length == 0) {
                //window.dataCEF.$refs.notif.add(['error','Введите пароль!']);
				this.addNotification({
						text: "Введите пароль.",
						theme: "error"
					});
                cheker = false;
            }
            if (this.pass2.length == 0) {
                //window.dataCEF.$refs.notif.add(['error','Повторите пароль!']);
				this.addNotification({
						text: "Повторите пароль.",
						theme: "error"
					});
                cheker = false;
            }
            if (this.login.length < 5 || this.login.length > 20) {
                //window.dataCEF.$refs.notif.add(['error','Логин должен состоять из 5-20 символов!']);
				this.addNotification({
						text: "Логин должен состоять из 5-20 символов.",
						theme: "error"
					});
                cheker = false;
            }
            if (this.email.length > 40) {
                //window.dataCEF.$refs.notif.add(['error','Email должен быть менее 40 символов!']);
				this.addNotification({
						text: "Email должен быть менее 40 символов.",
						theme: "error"
					});
                cheker = false;
            }
            var r = /^[0-9a-z_\.-]{5,20}$/i;
            if (!r.test(this.login)) {
                //window.dataCEF.$refs.notif.add(['error','Некорректный логин!']);
				this.addNotification({
						text: "Некорректный логин.",
						theme: "error"
					});
                cheker = false;
            }
            if (this.pass1.length < 6 || this.pass1.length > 20) {
                //window.dataCEF.$refs.notif.add(['error','Пароль должен состоять из 6-20 символов!']);
				this.addNotification({
						text: "Пароль должен состоять из 6-20 символов.",
						theme: "error"
					});
                cheker = false;
            }
            var r = /^[0-9a-z-_\.]+\@[0-9a-z-_]{1,}\.[a-z]{1,}$/i;
            if (!r.test(this.email)) {
                //window.dataCEF.$refs.notif.add(['error','Некорректный email!']);
				this.addNotification({
						text: "Некорректный email.",
						theme: "error"
					});
                cheker = false;
            }
            if (this.pass2 !== this.pass1) {
                //window.dataCEF.$refs.notif.add(['error','Пароли не совпадают!']);
				this.addNotification({
						text: "Пароли не совпадают.",
						theme: "error"
					});
                cheker = false;
            }
            if(cheker){
                const sendData = {
                    login: this.login,
                    password: this.pass1,
                    email: this.email,
                    promocode: this.promocode,
                }
                //window.dataCEF.$refs.notif.add(['success','Отправка данных на сервер для проверки!']);
				this.addNotification({
						text: "Отправка данных на сервер для проверки.",
						theme: "success"
					});
                mp.trigger("cMisc-CallServerEvent", "sRegister-CreateAccount",JSON.stringify(sendData));
            }
        },
        mainPage(){
           storage.setCodeSended(false);
           storage.setPage('login');
		   mp.trigger("cSetPage", 'login');
        },
        verifyCode(){
            if (!this.code) return this.addNotification({ text: "Введите код из письма.", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sRegister-VerifyCode", this.code);
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
@font-face{
    font-family: 'Century Gothic';
    src: url('/fonts/Century Gothic.ttf')
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
    min-height: 40px;
    height: 5.09vh;
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
    /*margin-bottom: 20px;*/
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

.slide-active, .slide-leave-active {
    transition: opacity 0.1s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
.code-wrapper{
    display: flex;
    justify-content: space-between;
}
.input-code{
    width: 15vw;
}
.button-accept{
    width: 179px;
    min-height: 40px;
    height: 6.11vh;
    border-radius: 19px;
    background-color: #0a2e58;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: "Century Gothic";
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
        width: 150px
    }
    .back{
        width: 30px;
        height: 30px;
    }
}
@media (max-width: 850px){
    .logo img{
        width: 100px;
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