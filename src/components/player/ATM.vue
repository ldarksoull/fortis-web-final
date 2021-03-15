<template>
    <div class="wrapper">
        <div class="atm-wrapper">
            <div class="atm">
                <div class="atm-screen">
                    <!-- страничка для анимации при входе -->
                    <div class="enter" v-if="atmPage === 'enter'">
                        <div class="enter-title">Вход в систему</div>
                        <div class="enter-subtitle">Ваши данные в безопасности</div>
                        <div class="login-block">
                            <div class="login-item">
                                <div class="login-name">Login</div>
                                <div class="login-input-wrapper" id="login">
                                    <input class="login-input" disabled type="password" value="1111111">
                                </div>
                            </div>
                             <div class="login-item">
                                <div class="login-name">Password</div>
                                <div class="login-input-wrapper" id="password">
                                    <input class="login-input" disabled type="password" value="111111111">
                                </div>
                            </div>
                        </div>
                        <div class="loading" v-if="load === 1">
                            <div class="loading-text">Идёт загрузка...</div>
                            <div class="loader"></div>
                        </div>
                    </div>
                    <!--  -->
                    <div class="inner" v-if="atmPage === 'menu'">
                        <div class="content" v-if="menu === 'menu'">
                            <div class="page-title atm-title">Меню банкомата</div>
                            <div class="list center">
                                <div class="col">
                                    <div class="item center" @click="menu = 'getCash'">Снять наличные</div>
                                    <div class="item center" @click="menu = 'deposit'">Пополнить счет</div>
                                    <div class="item center" @click="menu = 'transfer'">Перевод на карту</div>
                                    <div class="item center" @click="menu = 'mob'">Пополнить номер мобильного</div>
                                </div>
                            </div>
                        </div>
                        <div class="content" v-if="menu === 'getCash'">
                            <div class="page-title">Снять наличные</div>
                            <div class="money-status">{{showBMoney()}} $</div>
                            <div class="center mt-1">
                               <div class="f-col">
                                   <label class="d-block" for="getCash" style="margin-bottom: 1.51vw">
                                       <div class="input-name">Введите сумму</div> 
                                       <input autofocus class="input" id="getCash" type="number" v-model.number="inputValue">
                                   </label>
                                   <div class="btn btn-1" @click="getCash()" :class="{disabled: loader === true}" :disabled="loader">Обналичить</div>
                               </div>
                            </div>
                            <div class="back" @click="menu = 'menu'">Вернуться в меню</div>
                        </div>
                        <div class="content" v-if="menu === 'deposit'">
                            <div class="page-title">Пополнить счет</div>
                            <div class="center mt-2">
                               <div class="f-col">
                                   <label class="d-block" for="getCash" style="margin-bottom: 1.51vw">
                                       <div class="input-name">Введите сумму</div> 
                                       <input autofocus class="input" id="getCash" type="number" v-model.number="inputValue">
                                   </label>
                                   <div class="btn btn-1" @click="putCash()" :class="{disabled: loader === true}" :disabled="loader">Пополнить</div>
                               </div>
                            </div>
                            <div class="back" @click="menu = 'menu'">Вернуться в меню</div>
                        </div>
                        <div class="content" v-if="menu === 'transfer'">
                            <div class="page-title">Перевод на карту</div>
                            <div class="center mt-1">
                               <div class="f-col">
                                   <label class="d-block" for="getCash" style="margin-bottom: 1.51vw">
                                       <div class="input-name">Введите номер карты</div> 
                                       <input autofocus class="input input-wide" id="getCash" type="text" maxlength="14" @input="updateInputCard" :value="inputCardText">
                                   </label>
                                   <label class="d-block" for="getCash" style="margin-bottom: 1.51vw">
                                       <div class="input-name">Введите сумму</div> 
                                       <input autofocus class="input" id="getCash" type="number" v-model.number="inputValue">
                                   </label>
                                   <div class="btn btn-1" :class="{disabled: loader === true}" :disabled="loader" @click="transferMoney()">Перевести</div>
                               </div>
                            </div>
                            <div class="back" @click="menu = 'menu'">Вернуться в меню</div>
                        </div>
                        <div class="content" v-if="menu === 'mob'">
                            <div class="page-title">Пополнение мобильного</div>
                            <div class="center mt-1">
                               <div class="f-col">
                                   <label class="d-block" for="getCash" style="margin-bottom: 1.51vw">
                                       <div class="input-name">Введите номер телефона</div> 
                                       <input autofocus class="input" id="getCash" type="text" v-model.number="inputPhone">
                                   </label>
                                   <label class="d-block" for="getCash" style="margin-bottom: 1.51vw">
                                       <div class="input-name">Введите сумму</div> 
                                       <input autofocus class="input" id="getCash" type="text" v-model.number="inputValue">
                                   </label>
                                   <div class="btn btn-1" :class="{disabled: loader === true}" :disabled="loader">Пополнить</div>
                               </div>
                            </div>
                            <div class="back" @click="menu = 'menu'">Вернуться в меню</div>
                        </div>
						<div class="loading" v-if="loader === true">
                            <div class="loading-text">Обработка операции...</div>
                            <div class="loader"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            atmPage: "enter",
            menu: "menu",
            inputValue: null,
            load: 1,
            loader: false,
            inputCardText: "",
            inputCard: "",
            inputPhone: "",
        };
    },
    computed: {
        ...mapGetters({
            money: "moneyData",
        }),
    },
    methods: {
        animateEnterPage() {
            setTimeout(() => {
                this.atmPage = "menu";
            }, 6000);
            setTimeout(() => {
                this.load = 1;
            }, 3000);
        },
        showLoader() {
            this.loader = true;
            setTimeout(() => {
                this.inputValue = null;
                this.loader = false;
            }, 2000);
        },
        startOperation() {
            if (this.inputValue && this.inputValue > 0 && this.inputValue <= Number.MAX_SAFE_INTEGER) {
                this.showLoader();
                return true;
            } else {
                storage.addNotification({ text: "Введите сумму", theme: "error" });
                return false;
            }
        },
        prettify(num) {
            let n = num.toString();
            const separator = " ";
            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
        },
        showBMoney() {
            return this.prettify(this.money.bank);
        },
        getCash() {
            if (!this.startOperation()) return;
            mp.trigger("cMisc-CallServerEvent", "sMoney-GetCash", this.inputValue);
        },
        putCash() {
            if (!this.startOperation()) return;
            mp.trigger("cMisc-CallServerEvent", "sMoney-PutCash", this.inputValue);
        },
        exit() {
            mp.trigger("cMisc-CallServerEvent", "sPlayer-setAnimation", "atmExitCard");
            setTimeout(() => {
                mp.trigger("cMisc-CallServerEvent", "sPlayer-setAnimation", "smoothCancel");
            }, 3000);

            mp.trigger("cCloseCef");
            mp.trigger("cSetPage", "none");
        },
        onKeyUp(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
        transferMoney() {
            if (!this.inputCard || this.inputCard.length !== 12) return storage.addNotification({ text: "Введите номер карты", theme: "error" });
            if (!this.startOperation()) return;
            mp.trigger("cMisc-CallServerEvent", "sMoney-transferMoney", this.inputCard, this.inputValue);
        },
        updateInputCard(event) {
            this.inputCard = event.target.value.replace(/\s+/g, "");
            if (event.inputType === "deleteContentBackward" || event.inputType === "deleteContentForward") return;
            const text = this.inputCard.split("");
            let count = 0;
            for (var i = 0; i < this.inputCard.length; i++) {
                if (i % 4 === 0 && i !== 0 && i !== 12) {
                    text.splice(i + count, 0, " ");
                    count++;
                }
            }
            this.inputCardText = text.join("");
        },
    },
    mounted() {
        this.animateEnterPage();
    },
    created() {
        document.addEventListener("keyup", this.onKeyUp);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyUp);
    },
};
</script>
<style scoped>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
* {
	padding: 0;
  	margin: 0;
  	outline: 0;
	text-decoration: none;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
li {
    list-style: none;
}
html,body {
	height: 100%;
  	width: 100%;
}
.wrapper{
	width: 100%;
	height: 100vh;
}
    .atm-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .atm{
        background: url('/img/atm/atm.png');
        background-size: 100%;
        background-size: 100%;
        width: 66.3vw;
        height: 36.46vw;
        position: relative;
    }
    .atm-screen{
        position: absolute;
        width: 36.35vw;
        height: 23.65vw;
        background: url('/img/atm/fleeca.png');
        background-size: 100%;
        top: 15.5%;
        left: 9.6%
    }
    .enter{
        width: 60%;
        padding-top: 13%;
        margin: 0 auto;
        pointer-events: none;
        user-select: none;
    }
    .enter-title{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 2.97vw;
        font-weight: 700;
        letter-spacing: -0.16vw;
        user-select: none;
    }
    .enter-subtitle{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.73vw;
        font-weight: 300;
    }
    .login-block{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 4vw;
    }
    .login-item{
        width: 8.28vw;
    }
    .login-name{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.73vw;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: -0.07vw;
        margin-bottom: 0.3vw;
    }
    .login-input{
        width: 100%;
        height: 1.77vw;
        border-radius: 0.52vw;
        background-color: #ffffff;
        border: none;
        color: #006730;
        padding: 0 0.42vw;
        padding-top: 0.2vw;
        font-size: 1.6vw;
        overflow: hidden;
        user-select: none;
    }
    .login-input-wrapper{
        position: relative;
        overflow: hidden;
        border-radius: 0.52vw;
    }
    #login::after, #password::after{
        position: absolute;
        width: 100%;
        height: 1.77vw;
        border-radius: 0.52vw;
        background-color: #ffffff;
        content: '';
        top: 0;
        left: 5%;
        z-index: 100;
    }
    #login::after{
        animation-name: login;
        animation-duration: 1.5s;
        animation-timing-function: steps(7);
        animation-fill-mode: forwards;
    }
    #password::after{
        animation-name: password;
        animation-duration: 1.5s;
        animation-timing-function: steps(9);
        animation-delay: 1.5s;
        animation-fill-mode: forwards;
    }
    .loading{
        display: flex;
        align-items: flex-end;
        position: absolute;
        bottom: 1.7vw;
        right: 2vw
    }
    .loading-text{
        color: #ffffff;
        font-family: "Myriad Pro";
        font-size: 0.73vw;
        font-weight: 400;
        letter-spacing: -0.18px;
        margin-right: 0.5vw;
    }
    img{
        max-width: 100%
    }
    @keyframes login{
        0%{
            left: 5%
        }
        100%{
            left: 53%;
        }  
    }
    @keyframes password{
        0%{
            left: 5%
        }
        100%{
            left: 66%;
        }  
    }
.loader,
.loader:after {
  border-radius: 50%;
  width: 2.5vw;
  height: 2.5vw;
}
.loader {
  font-size: 0.52vw;
  position: relative;
  text-indent: -9999vw;
  border-top: 0.3vw solid rgba(255, 255, 255, 0.185);
  border-right: 0.3vw solid rgba(255, 255, 255, 0.185);
  border-bottom: 0.3vw solid rgba(255, 255, 255, 0.185);
  border-left: 0.3vw solid #ffffff;
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;
  transform-origin: center; 
}
@-webkit-keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.inner{
    width: 100%;
    height: 100%;
}
.content{
    padding: 0 2.45vw;
    padding-top: 1.98vw;
    position: relative;
    width: 100%;
    height: 100%;
}
.page-title{
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 1.72vw;
    font-weight: bold;
    letter-spacing: -0.13vw;
    text-align: right;
    user-select: none;
}
.list .col{
    margin: 0 auto
}
.atm-title{
    margin-bottom: 2.86vw;
}
.list .item{
    width: 12.66vw;
    height: 2.55vw;
    border-radius: 0.78vw;
    background-color: #ffffff;
    color: #2b8032;
    font-family: "Gotham Pro";
    font-size: 0.83vw;
    font-weight: bold;
    letter-spacing: -0.08vw;
    padding: 0 5%;
    margin-bottom: 1.41vw;
    transition: 0.1s;
}
.list .item:hover{
    box-shadow: 0 0 0.52vw rgb(255, 255, 255);
}
.money-status{
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 0.83vw;
    font-weight: 500;
    letter-spacing: -0.08vw;
    padding-right: 0.52vw;
    border-right: 2px solid #fff;
    text-align: right;
    margin-top: 1.04vw;
}
.d-block{
    display: block;
}
.f-col{
    display: flex;
    flex-direction: column;
    align-items: center
}
.input-name{
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 0.73vw;
    font-weight: 300;
    text-align: center;
    margin-bottom: 0.52vw;
    user-select: none;
}
.input{
    width: 10.42vw;
    height: 2.6vw;
    border-radius: 0.78vw;
    background-color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 0.94vw;
    font-weight: bold;
    padding: 0 0.94vw;
    text-align: center;
    transition: 0.2s;
}
.input:focus{
    box-shadow: 0 0 0.52vw rgb(255, 255, 255);
}
.input-wide{
    width: 15.42vw;
}
.btn{
    border: 1px solid #ffffff;
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 0.73vw;
    font-weight: 500;
    letter-spacing: -0.05vw;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: 0.2s;
    user-select: none;
	background: transparent;
}
.btn:hover{
    background: rgb(255, 255, 255);
    color: #2b8032;
}
.btn.disabled, .btn:hover.disabled{
    color: #acacac!important;
    border: 1px solid #acacac;
    background: transparent;
}
.btn-1{
    width: 6.93vw;
    height: 1.98vw;
    border-radius: 0.78vw;
}
.back{
    position: absolute;
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 0.78vw;
    font-weight: 300;
    letter-spacing: -0.06vw;
    left: 2.34vw;
    bottom: 2.34vw;
    display: flex;
    align-items: center;
}
.back::before{
    content: '';
    width: 0.36vw;
    height: 0.63vw;
    background: url('/img/atm/back.png') no-repeat;
    background-size: cover;
    position: absolute;
    left: -1.04vw;

}
.center{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
input{
    border: none;
}
.mt-1{
    margin-top: 2.86vw;
}
.mt-2{
    margin-top: 4vw;
}
</style>