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
                            <div class="page-title atm-title">Меню банка</div>
                            <div class="list mt-2">
                                <div class="row center">
                                    <div class="item center" @click="menu = 'getCash'">Снять наличные</div>
                                    <div class="item center" @click="menu = 'deposit'">Пополнить счет</div>
                                </div>
                                <div class="row center">
                                    <div class="item center" @click="menu = 'transfer'">Перевод на карту</div>
                                    <div class="item center" @click="menu = 'mob'">Пополнить номер мобильного</div>
                                </div>
                                <div class="row center">
                                    <div class="item center" @click="menu = 'taxesMenu'">Налоги</div>
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
                                       <input autofocus class="input" id="getCash" type="text">
                                   </label>
                                   <label class="d-block" for="getCash" style="margin-bottom: 1.51vw">
                                       <div class="input-name">Введите сумму</div> 
                                       <input autofocus class="input" id="getCash" type="text">
                                   </label>
                                   <div class="btn btn-1">Пополнить</div>
                               </div>
                            </div>
                            <div class="back" @click="menu = 'menu'">Вернуться в меню</div>
                        </div>
                        <div class="content" v-if="menu === 'taxesMenu'">
                            <div class="page-title">Налоги</div>
                            <div class="list mt-2 center">
                                <div class="col">
                                    <div class="item center" @click="openTaxMenu('vehTax', 'vehicle')">Налог на транспорт</div>
                                    <div class="item center" @click="openTaxMenu('houseTax', 'house')">Налог на дом</div>
                                    <div class="item center" @click="openTaxMenu('bizTax', 'business')">Налог на бизнес</div>
                                </div>
                            </div>
                            <div class="back" @click="menu = 'menu'">Вернуться в меню</div>
                        </div>
                        <div class="content" v-if="menu === 'vehTax'">
                            <div class="page-title">Налоги</div>
                            <div class="page-subtitle">Ваши налоги на “Транспортное Средство”</div>
                            <div class="col center mt-1 vehicle-list">
                                <div class="taxes-wrapper vehicle-tax-wrapper" v-for="vehicle in this.taxes.vehicle">
                                    <div class="veh-title">{{vehicle.title}} - {{vehicle.number}}</div>
                                    <div class="row center">
                                        <div class="tax-item sum-1">
                                            <div class="tax-item-name">Сумма на вашем счету</div>
                                            <div class="tax-item-data">{{prettify(vehicle.money)}} $</div>
                                        </div>
                                        <div class="tax-item sum-2">
                                            <div class="tax-item-name ">Максимальная сумма</div>
                                            <div class="tax-item-data">{{prettify(vehicle.maxMoney)}} $</div>
                                        </div>
                                    </div>
                                    <div class="row center mt-3 bottom">
                                        <div class="tax-item sum-1">
                                            <div class="tax-item-name">Сумма пополнения:</div>
                                            <input type="number" autofocus class="tax-item-input" v-model.number="vehicle.taxInput">
                                        </div>
                                        <div class="tax-item">
                                            <div class="tax-btn center" @click="payTax('vehicle', vehicle.taxInput, vehicle.money, vehicle.maxMoney, vehicle.id)">Пополнить</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="back" @click="menu = 'taxesMenu'">Вернуться в меню</div>
                        </div>
                        <div class="content" v-if="menu === 'houseTax'">
                            <div class="page-title">Налоги</div>
                            <div class="page-subtitle">Ваши налоги на “Недвижимость”</div>
                            <div class="col center mt-1 vehicle-list">
                                <div class="taxes-wrapper vehicle-tax-wrapper" v-for="house in this.taxes.house">
                                    <div class="veh-title">Дом № {{house.id}}</div>
                                    <div class="row center">
                                        <div class="tax-item sum-1">
                                            <div class="tax-item-name">Сумма на вашем счету</div>
                                            <div class="tax-item-data">{{prettify(house.money)}} $</div>
                                        </div>
                                        <div class="tax-item sum-2">
                                            <div class="tax-item-name ">Максимальная сумма</div>
                                            <div class="tax-item-data">{{prettify(house.maxMoney)}} $</div>
                                        </div>
                                    </div>
                                    <div class="row center mt-3 bottom">
                                        <div class="tax-item sum-1">
                                            <div class="tax-item-name">Сумма пополнения:</div>
                                            <input type="number" autofocus class="tax-item-input" v-model.number="house.taxInput">
                                        </div>
                                        <div class="tax-item">
                                            <div class="tax-btn center" @click="payTax('house', house.taxInput, house.money, house.maxMoney, house.id)">Пополнить</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="back" @click="changeMenu('taxesMenu')">Вернуться в меню</div>
                        </div>
                        <div class="content" v-if="menu === 'bizTax'">
                            <div class="page-title">Налоги</div>
                            <div class="page-subtitle">Ваши налоги на “Бизнес”</div>
                            <div class="col center mt-1">
                                <div class="taxes-wrapper">
                                    <div class="row center">
                                        <div class="tax-item sum-1">
                                            <div class="tax-item-name">Сумма на вашем счету</div>
                                            <div class="tax-item-data">{{prettify(taxes.business.money)}} $</div>
                                        </div>
                                        <div class="tax-item sum-2">
                                            <div class="tax-item-name ">Максимальная сумма</div>
                                            <div class="tax-item-data">{{prettify(taxes.business.maxMoney)}} $</div>
                                        </div>
                                    </div>
                                    <div class="row center mt-3 bottom">
                                        <div class="tax-item sum-1">
                                            <div class="tax-item-name">Сумма пополнения:</div>
                                            <input type="number" autofocus class="tax-item-input" v-model.number="taxInput">
                                        </div>
                                        <div class="tax-item">
                                            <div class="tax-btn center" @click="payTax('business', taxInput, taxes.business.money, taxes.business.maxMoney, taxes.business.id)">Пополнить</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="back" @click="menu = 'taxesMenu'">Вернуться в меню</div>
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
            load: 0,
            loader: false,
            taxInput: "",
            inputCardText: "",
            inputCard: "",
        };
    },
    computed: {
        ...mapGetters({
            money: "moneyData",
            taxPercent: "getTaxValues",
            vipStatus: "getVipStatus",
        }),
        taxes: function () {
            const allTaxes = this.$store.getters.getTaxes;
            const houseTaxPercent = this.taxPercent.find(t => t.type === "house").value;
            const businessTaxPercent = this.taxPercent.find(t => t.type === "business").value;
            const vehicleTaxPercent = this.taxPercent.find(t => t.type === "vehicle").value;
            const haveVipStatus = this.vipStatus && this.vipStatus.type === 'Platinum';
            allTaxes.vehicle.forEach( tax => {
                tax.maxMoney = this.roundNum(tax.price / 100 * vehicleTaxPercent);
                if (haveVipStatus) tax.maxMoney *= 2;
            });
            allTaxes.house.forEach( tax => {
                tax.maxMoney = this.roundNum(tax.price / 100 * houseTaxPercent);
                if (haveVipStatus) tax.maxMoney *= 2;
            });
            if (Object.keys(allTaxes.business).length > 0) {
                allTaxes.business.maxMoney = this.roundNum(allTaxes.business.price / 100 * businessTaxPercent);
                if (haveVipStatus) allTaxes.business.maxMoney *= 2;
            }
            return allTaxes;
        }
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
            if (!num) return num;
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
            mp.trigger("cCloseCef");
            mp.trigger("cSetPage", "none");
        },
        onKeyUp(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
        changeMenu(menu) {
            this.menu = "taxesMenu";
            this.taxInput = "";
        },
        openTaxMenu(menuType, taxType) {
            if (Object.keys(this.taxes[taxType]).length === 0) {
                return storage.addNotification({ text: "У вас нету налогов этого типа", theme: "error" });
            }
            this.menu = menuType;
        },
        payTax(type, value, curValue, maxValue, id) {
            if (!value || value < 0) {
                return storage.addNotification({ text: "Введите сумму пополнения", theme: "error" });
            }
            const totalMoney = curValue + value;
            if (totalMoney > maxValue) {
                return storage.addNotification({ text: "Превышена максимальная сумма для налогового счета", theme: "error" });
            }
            const data = { type, value, id };
            mp.trigger("cMisc-CallServerEvent", "sGovChangeTaxMoney", JSON.stringify(data));
            this.clearTaxInput();
        },
        clearTaxInput() {
            this.taxes.vehicle.forEach(tax => (tax.taxInput = ""));
            this.taxes.house.forEach(tax => (tax.taxInput = ""));
            this.taxInput = "";
        },
        roundNum(num, ends = 0) {
            return parseFloat(num.toFixed(ends));
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
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
    user-select: none;
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
.page-subtitle{
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 0.73vw;
    font-weight: 500;
    letter-spacing: -0.05vw;
    text-align: right;
    margin-top: 0.2vw;
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
    margin: 0 1.41vw;
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
}
.btn:hover{
    background: rgb(255, 255, 255);
    color: #2b8032;
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
.taxes-wrapper{
    width: 25.1vw;
    height: 9.9vw;
    border-radius: 1.35vw;
    background-color: #ffffff;
    padding: 1.5vw;
    user-select: none;
}
.tax-item{
    margin: 0 1vw;
}
.tax-item-name{
    font-family: "Gotham Pro";
    font-size: 0.73vw;
    font-weight: 500;
    letter-spacing: -0.37px;
    margin-bottom: 0.4vw;
}
.tax-item-data{
    font-family: "Gotham Pro";
    font-size: 1.25vw;
    font-weight: 700;
}
.tax-item-input{
    width: 7.03vw;
    height: 1.82vw;
    border-radius: 0.68vw;
    background-color: rgb(218, 218, 218);
    color: #666666;
    font-family: "Gotham Pro";
    font-size: 0.83vw;
    font-weight: 700;
    text-align: center;
    padding: 0 1vw;
}
.tax-btn{
    width: 7.03vw;
    height: 1.82vw;
    border-radius: 0.68vw;
    border: 1px solid #006730;
    color: #27732d;
    font-family: "Gotham Pro";
    font-size: 0.83vw;
    font-weight: 700;
    transition: 0.2s;
}
.tax-btn:hover{
    background: #27732d;
    color: #fff;
}
.sum-1 .tax-item-name{
    color: #9f9f9f;
}
.sum-2 .tax-item-name{
    color: #a0a0a0;
}
.sum-1 .tax-item-data{
    color: #2b8032;
}
.sum-2 .tax-item-data{
    color: rgba(0, 0, 0, 0.808);
}
.row{
    display: flex;
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
.mt-3{
    margin-top: 1vw;
}
.bottom{
    align-items: flex-end
}
.vehicle-list{
    display: grid;
    height: 12.2vw;
    overflow: auto;
}
.vehicle-tax-wrapper{
    margin: 1vw;
    padding: 1vw;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background-color: #737373;
}
::-webkit-scrollbar-thumb {
  background-color: #fff;
}
.veh-title{
    color: #000;
    font-family: "Gotham Pro";
    font-size: 1vw;
    font-weight: 700;
}

</style>