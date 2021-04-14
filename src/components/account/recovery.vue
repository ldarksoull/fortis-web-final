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
                    <div class="input-field" v-if="!codeSended">
                        <div class="input mb-10"><input type="email" placeholder="Email" maxlength="100"x v-model.trim='email'></div>
                        <div class="input mb-10"><input type="text" placeholder="Введите код из письма" maxlength="6" v-model="code"></div>
                    </div>
                    <!-- после ввода кода появляются доп поля -->
                    <div class="input-field" v-if="codeSended">
                        <div class="input mb-10 pass">
                            <input :type="inputType" v-model.trim='pass1' placeholder="Новый пароль">
                            <button tabindex="-1" ><img :src="iconPath" alt="" @click="toggleInputType"></button>
                        </div>
                        <div class="input mb-10"><input type="password" placeholder="Повторите пароль" v-model.trim='pass2'></div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="input-action" v-if="!codeSended">
                        <button class="button" @click="sendCode">Отправить код</button>
                        <button class="button" @click="checkCode">Восстановить пароль</button>
                    </div>
                    <!-- и заменяются кнопки -->
                    <div class="input-action" v-if="codeSended">
                        <button class="button" @click="saveNewPass">Сохранить</button>
                    </div>
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
            pass1: '',
            pass2: '',
            email: '',
            inputType: 'password',
            iconPath: '/img/startScreen/Visible_inactive.png',
            code: "",
        }
    },
    computed: {
        ...mapGetters({
            codeSended: "getCodeSended",
        }),
    },
    methods:{
		addNotification(notification) {
				storage.addNotification(notification);
		},
        mainPage(){
           //this.$emit('event',['page','login']);
		   storage.setPage('login');
		   mp.trigger("cSetPage", 'login');
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
        sendCode(){
            if (!this.email) return this.addNotification({ text: "Введите email.", theme: "error" });
            var r = /^[0-9a-z-_\.]+\@[0-9a-z-_]{1,}\.[a-z]{1,}$/i;
            if (!r.test(this.email)) return this.addNotification({ text: "Некорректный email.", theme: "error" });

            mp.trigger("cMisc-CallServerEvent", "sRegister-SendRecoveryCode", this.email);
        },
        saveNewPass() {
            if (this.pass1.length == 0) return this.addNotification({ text: "Введите пароль.", theme: "error" });
            if (this.pass2.length == 0) return this.addNotification({ text: "Повторите пароль.", theme: "error" });
            if (this.pass1.length < 6 || this.pass1.length > 20) return this.addNotification({ text: "Пароль должен состоять из 6-20 символов.", theme: "error" });
            if (this.pass2 !== this.pass1) return this.addNotification({ text: "Пароли не совпадают.", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sRegister-ChangePassword", this.pass1);
        },
        checkCode() {
            if (!this.code) return this.addNotification({ text: "Введите код.", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sRegister-CheckRecoveryCode", this.code);
        }
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
    box-shadow: inset 0 0 5px rgb(26, 108, 202);
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
    min-height: 40px;
    height: 5.09vh;
    font-size: 17px;
    color: #d1d1d1;
    border-radius: 19px;
    background-color: #0a2e58;
    margin: 0 5px;
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

@media (max-width: 1367px){
    .login-card{
        width: 520px;
    }
    .news-card{
        width: 520px
    }
    .card-footer .button{
        font-size: 16px;
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
    .card-footer .button{
        width: 179px;
        font-size: 14px;
    }
}
</style>