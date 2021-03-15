<template>
    <div class="wrapper">
        <div class="tablet-wrapper">
            <div class="tablet">
                <div class="tablet-inner">
                    <div class="tablet-header">
                        <div class="col w-20 center">
                            <div class="gerb center"><img src="/img/driver-license/gerb.png" alt=""></div>
                        </div>
                        <div class="col w-flex header-content">
                            <div class="coffers-title">Состояние казны на сегодняшний день :</div>
                            <div class="coffers-status">{{govMoney | splitNumber}} $</div>
                            <div class="header-menu">
                                <div class="header-btn" @click="headerTab = 1" :class="{active: headerTab === 1}">Налоги</div>
                                <div class="header-btn" @click="headerTab = 2" :class="{active: headerTab === 2}">Бюджет</div>
                                <div class="header-btn" @click="headerTab = 3" :class="{active: headerTab === 3}">Премии</div>
                            </div>
                        </div>
                        <div class="col w-20 center">
                            <div class="logo center"><img src="/img/logo-v1.png" alt=""></div>
                        </div>
                    </div>
                    <div class="tablet-body" v-if="headerTab === 0">
                        <div class="body-header">
                            <div class="body-menu-wrapper">
                                <div class="body-menu">
                                    <div class="menu-btn" @click="toggleOrgList()" :class="{active: mainTab === 1}">Зарплаты гос-сотрудников</div>
                                    <div class="menu-btn" @click="showPrices()" :class="{active: mainTab === 2}">Цены на услуги</div>
                                </div>
                                <div class="org-list" v-if="orgList === 'show'">
                                    <div class="org-item" @click="showOrg(faction.id)" :class="{active: org === faction.id}" v-for="faction in factions">{{faction.title}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="body-content" v-if="mainTab === 1">
                            <div class="content-table" v-if="org">
                                <div class="table-head">
                                    <div class="table-row">
                                        <div class="table-col">Звание:</div>
                                        <div class="table-col">Зарплата:</div>
                                    </div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="rank in selectedFaction.ranks" :key="rank.rank">
                                        <div class="table-col">{{ rank.rankTitle }}</div>
                                        <div class="table-col">
                                            <div class="table-input">
                                                <input type="number" v-model.number="rank.payment" @keydown="changeEditState(rank)">
                                            </div>
                                            <div class="table-input-control" :class="{'payday-change':rank.change}" @click="savePayment(rank)"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="body-content" v-if="mainTab === 2">
                            <div class="content-table">
                                <div class="table-head">
                                    <div class="table-row">
                                        <div class="table-col">Услуга:</div>
                                        <div class="table-col">Цена:</div>
                                    </div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="(service, i) in services" :key="i">
                                        <div class="table-col">{{ service.title }}</div>
                                        <div class="table-col">
                                            <div class="table-input">
                                                <input type="number" v-model.number="service.price" @keydown="changeEditState(service)">
                                            </div>
                                            <div class="table-input-control" :class="{'payday-change':service.change}" @click="savePrice(service)"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tablet-body without-header" v-if="headerTab === 1">
                        <div class="body-content">
                            <div class="content-table">
                                <div class="table-head">
                                    <div class="table-row">
                                        <div class="table-col">Наименование налога:</div>
                                        <div class="table-col">Процент налога:</div>
                                    </div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="tax in taxValues">
                                        <div class="table-col">{{ tax.title }}</div>
                                        <div class="table-col">
                                            <div class="table-input">
                                                <input type="number" v-model.number="tax.percent" @keydown="changeEditState(tax)">
                                            <!-- {{tax.value}} -->
                                            </div>
                                            <div class="table-input-control" :class="{'payday-change':tax.change}" @click="saveTax(tax)"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tablet-body" v-if="headerTab === 2">
                        <div class="body-header">
                            <div class="body-menu-wrapper">
                                <div class="body-menu">
                                    <div class="menu-btn" @click="budgetTab = 1" :class="{active: budgetTab === 1}">Доходы</div>
                                    <div class="menu-btn" @click="budgetTab = 2" :class="{active: budgetTab === 2}">Расходы</div>
                                </div>
                            </div>
                        </div>
                        <div class="body-content budget-stat" v-if="budgetTab === 1">
                            <div class="content-table">
                                <div class="table-head">
                                    <div class="table-row">
                                        <div class="table-col w-60">Название:</div>
                                        <div class="table-col w-15">Сумма:</div>
                                        <div class="table-col w-25">Дата:</div>
                                    </div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="log in budgetLogPlus" :key="log.id">
                                       <div class="table-col w-60">{{log.title}}</div>
                                       <div class="table-col w-15">{{log.value | splitNumber}} $</div>
                                       <div class="table-col w-25">{{log.date | formatDate}}</div>
                                   </div>
                                </div>
                            </div>
                        </div>
                         <div class="body-content budget-stat" v-if="budgetTab === 2">
                            <div class="content-table">
                                <div class="table-head">
                                    <div class="table-row">
                                        <div class="table-col w-60">Название:</div>
                                        <div class="table-col w-15">Сумма:</div>
                                        <div class="table-col w-25">Дата:</div>
                                    </div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="log in budgetLogMinus" :key="log.id">
                                       <div class="table-col w-60">{{log.title}}</div>
                                       <div class="table-col w-15">{{log.value | splitNumber}} $</div>
                                       <div class="table-col w-25">{{log.date | formatDate}}</div>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tablet-body bonuses" v-if="headerTab === 3">
                        <div class="body-header">
                            <div class="body-menu-wrapper">
                                <div class="body-menu">
                                    <div class="menu-btn" 
                                    @click="toggleOrgListBonus" 
                                    :class="{active: (showOrgBonusList === true) || showOrgBonusItem === 'clicked'}"
                                    >{{ fractionName }}</div>
                                </div>
                            </div>
                            <div class="org-list" v-if="showOrgBonusList">
                                <div class="org-item" 
                                    v-for="(faction, i) in premiumList" 
                                    :key="i"
                                    @click="showOrgBonus(i)"
                                    :class="{active: orgBonus === i}"
                                >{{ faction.factionTitle }}</div>
                                <div class="empty-premium-list" v-if="premiumList.length === 0">Нет заявок на премию</div>
                            </div>
                        </div>
                        <div class="body-content" v-if="orgBonus !== null && premiumList.length">
                            <div class="content-table">
                                <div class="table-head">
                                    <div class="table-row">
                                        <div class="table-col w-20">Предложил:</div>
                                        <div class="table-col w-20">Имя фамилия:</div>
                                        <div class="table-col w-45">Причина:</div>
                                        <div class="table-col w-10" style="padding: 0.2vw">Сумма:</div>
                                        <div class="table-col w-5"></div>
                                    </div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="premia in premiumList[orgBonus].premiumList" :key="premia.id">
                                        <div class="table-col w-20">{{premia.suggestName}}</div>
                                        <div class="table-col w-20">{{premia.playerName}}</div>
                                        <div class="table-col w-45">
                                            <div class="table-input">{{premia.reason}}</div>
                                        </div>
                                        <div class="table-col w-10">{{premia.amount}}</div>
                                        <div class="table-col w-5">
                                            <div class="baks-icon">
                                                <img @click="modalOpen(premia.id, premia.amount)" src="/img/baks.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <transition name="fade">
                        <div class="modal" v-if="modal === true">
                            <div class="modal-body">
                                <div class="input">
                                    <span class="input-name">Введите сумму:</span>
                                    <input type="number" v-model.number="selectedPremia.amount">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <div class="modal-btn" @click="acceptPremia()">Выдать премию</div>
                                <div class="modal-btn" @click="declinePremia()">Отказать</div>
                            </div>
                        </div>
                        </transition>
                        <transition name="fade">
                        <div class="overlay" v-if="modal === true" @click="modalClose"></div>
                        </transition>
                    </div>
                </div>
                <div class="home-btn" @click="toHome"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            headerTab: 0,
            mainTab: 0,
            budgetTab: 0,
            org: 0,
            orgItem: "",
            orgList: "closed",
            showOrgBonusList: false,
            orgBonus: null,
            fractionName: "Выберите фракцию",
            showOrgBonusItem: "",
            modal: false,
            selectedPremia: {
                id: '',
                amount: '',
            },
        };
    },
    computed: {
        ...mapGetters({
            factions: "getFactions",
            govMoney: "getGovMoney",
            budgetLogPlus: "getBudgetLogPlus",
            budgetLogMinus: "getBudgetLogMinus",
        }),
        selectedFaction: function() {
            const factionData = this.factions.find(f => f.id === this.org);
            factionData.ranks.forEach(r => this.$set(r, "change", false));
            return factionData;
        },
        services: function () {
            const servicesList = this.$store.getters.getServicesList;
            servicesList.forEach(s => this.$set(s, "change", false));
            return servicesList;
        },
        taxValues: function () {
            const taxList = this.$store.getters.getTaxValues;
            taxList.forEach(s => this.$set(s, "change", false));
            return taxList;
        },
        premiumList: function() {
            const allPremium = this.$store.getters.getPremiumList;
            const final = [];
            allPremium.forEach(premia => {
                const category = final.find(cat => cat.factionTitle === premia.factionTitle);
                if (category) {
                    category.premiumList.push(premia);
                } else {
                    final.push({
                        factionTitle:premia.factionTitle,
                        premiumList: [premia]
                    })
                }
            })
            if (!final.length) this.fractionName = "Выберите фракцию"
            return final
        }
    },
    methods: {
        toggleOrgList() {
            if (this.mainTab != 1) {
                this.mainTab = 1;
            }
            this.orgListToggle();
        },
        showOrg(e) {
            this.org = e;
            this.orgItem = "clicked";
            this.orgList = "closed";
            this.mainTab = 1;
        },
        showPrices() {
            this.orgItem = "";
            this.mainTab = 2;
            this.orgList = "closed";
        },
        orgListToggle() {
            if (this.orgList === "closed") {
                this.orgList = "show";
            } else {
                this.orgList = "closed";
            }
        },
        toggleOrgListBonus() {
            this.showOrgBonusList = !this.showOrgBonusList;
        },
        showOrgBonus(i) {
            this.orgBonus = i;
            this.toggleOrgListBonus();
            this.fractionName = this.premiumList[i].factionTitle;
            this.showOrgBonusItem = "clicked";
        },
        modalOpen(id, amount) {
            this.modal = true;
            this.selectedPremia = {id, amount};
        },
        modalClose() {
            this.modal = false;
            this.selectedPremia = {id: '', amount: ''};
        },
        toHome() {
            this.modal = false;
            this.orgList = "closed";
            this.headerTab = 0;
            this.showOrgBonusList = false;
            this.orgBonus = null;
            this.mainTab = 0;
            this.budgetTab = 0;
            this.fractionName = "Выберите фракцию";
        },
        savePayment(rank) {
            if (!rank.change) return;
            if (!rank.payment || rank.payment < 1) return;
            // rank.change = false;
            const data = {
                factionId: this.org,
                rankTitle: rank.rankTitle,
                rank: rank.rank,
                payment: rank.payment,
            };
            mp.trigger("cMisc-CallServerEvent", "sGovChangePayday", JSON.stringify(data));
        },
        savePrice(service) {
            if (!service.change) return;
            if (!service.price || service.price < 1) return;
            const data = {
                type: service.type,
                data: service.data,
                price: service.price,
                title: service.title,
            };
            mp.trigger("cMisc-CallServerEvent", "sGovChangeServicePrice", JSON.stringify(data));
        },
        saveTax(tax) {
            if (!tax.change) return;
            if (tax.percent === "" || tax.percent < -25 || tax.percent > 25) {
                return storage.addNotification({text: "Введите значение процента от -25 до 25",theme: "error"});
            }
            const data = {
                type: tax.type,
                percent: tax.percent,
            }
            mp.trigger("cMisc-CallServerEvent", "sGovChangeTaxPercent", JSON.stringify(data));
            tax.change = false;
        },
        changeEditState(data) {
            data.change = true;
        },
        exit: function() {
            mp.trigger("cSetPage", "none");
        },
        onKeyUp(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
        acceptPremia() {
            if (!this.selectedPremia.amount || this.selectedPremia.amount < 1) {
                return storage.addNotification({text: "Введите сумму премии",theme: "error"});
            }
            mp.trigger("cMisc-CallServerEvent", "sGovAcceptPremia", JSON.stringify(this.selectedPremia));
            this.modalClose();
        },
        declinePremia() {
            mp.trigger("cMisc-CallServerEvent", "sGovDeclinePremia", JSON.stringify(this.selectedPremia));
            this.modalClose();
        }
    },
    filters: {
        splitNumber: (x) => {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return parts.join(",");
        },
        formatDate: (dateStr) => {
            let date = new Date(Date.parse(dateStr));
            let day = date.getDate();
            let month = date.getMonth() + 1;
            const year = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            if (day < 10) day = "0" + day
            if (month < 10) month = "0" + month
            if (hours < 10) hours = "0" + hours
            if (minutes < 10) minutes = "0" + minutes
            return `${day}.${month}.${year} ${hours}:${minutes}`;
        }
    },
    created() {
        document.addEventListener("keyup", this.onKeyUp);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyUp);
    },
};
</script>
<style lang="scss" scoped>
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
    .tablet-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .tablet{
        background: url('/img/lspd-tablet/tablet.png');
        background-size: contain;
        width: 55.83vw;
        height: 39.79vw;
        padding-top: 2.6vw;
        padding-left: 4.69vw;
        padding-bottom: 2.34vw;
        padding-right: 4.64vw;
        position: relative;
    }
    .tablet-inner{
        width: 100%;
        height: 100%;
        background-color: #4f75c7;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .home-btn{
        height: 3.8vw;
        width: 1.41vw;
        border: 0.1vw solid rgb(199, 199, 199);
        box-shadow: inset 0 0 0.63vw 0.1vw rgba(0, 0, 0, 0.486);
        border-radius: 0.78vw;
        position: absolute;
        right: 1.77vw;
        top: 45.5%;
    }
    .tablet-header{
        background: #2f519b;
        height: 35%;
        width: 100%;
        display: flex;
    }
    .tablet-body{
        height: 65%;
        width: 100%;
        
        &.without-header{
            padding-top: 1.5vw;
            .content-table{
                max-height: 19.1vw;
            }
        }
    }
    .w-20{
        min-width: 20%;
        flex-grow: 1
    }
    .w-flex{
        flex-grow: 2
    }
    .header-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .coffers-title{
        color: #ffffff;
        font-family: "ParisNineteenSixty";
        font-size: 0.99vw;
        font-weight: 400;
        margin-bottom: 0.8vw;
    }
    .coffers-status{
        color: #ffffff;
        font-family: "Myriad Pro";
        font-size: 3.39vw;
        font-weight: bold;
        margin-bottom: 1vw;
    }
    .body-header{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1vw;
    }
    .header-menu{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
    }
    .header-btn{
        padding: 0.5vw 1.2vw;
        background-color: #15337b;
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 1.04vw;
        font-weight: bold;
        border-radius: 0.2vw;
        transition: 0.2s;
        &.active{
            box-shadow: 0 0 1.41vw rgba(255, 255, 255, 0.21);
            background-color: #ffffff;
            color: #15337b;
        }
        &:hover{
            background-color: #ffffff;
            color: #15337b;
        }
    }
    .gerb, .logo{
        width: 5.89vw;
    }
    img{
        max-width: 100%;
    }
    .center{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .body-menu-wrapper{
        position: relative;
    }
    .body-menu{
        display: flex;
    }
    .menu-btn{
        background-color: #2f519d;
        padding: 0.5vw 1.2vw;
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 1.09vw;
        font-weight: bold;
        border-right: 0.1vw solid #fff;
        transition: 0.2s;
        &:first-child{
            border-top-left-radius: 0.3vw;
            border-bottom-left-radius: 0.3vw;
        }
        &:last-child{
            border-right: none;
            border-top-right-radius: 0.3vw;
            border-bottom-right-radius: 0.3vw
        }
        &.active{
            box-shadow: 0 0 1.41vw rgba(255, 255, 255, 0.21);
            background-color: #ffffff;
            color: #15337b;
        }
        &:hover{
            background-color: #ffffff;
            color: #15337b;
        }
    }
    .org-list{
        background-color: #2f519d;
        width: 16vw;
        position: absolute;
        margin-top: 0.49vw;
        top: 100%;
        left: 0.35vw;
        transform-origin: top;
        z-index: 99;
        box-shadow: 0 0.3vw 0.6vw rgba(0,0,0,0.3);
        transition: 0.2s;
    }
    .bonuses{
        .body-header{
            position: relative;
        }
        .org-list{
            left: 50%;
            transform: translateX(-50%);
            top: 3.3vw;
            z-index: 99;
        }
         .table-col{
            overflow-y: auto;
            margin: 0 0.1vw;
            padding: 0 1vw;
            text-align: left;
            &::-webkit-scrollbar{
                width: 0.2vw;
                border-radius: 0.5vw;
            }
            &::-webkit-scrollbar-track{
                background-color: #2f519b;
                border-radius: 0.2vw;
            }
            &::-webkit-scrollbar-thumb{
                background-color: #ffffff;
                border-radius: 0.2vw;
            }
        }
        .table-col.w-20{
            width: 20%;
        }
        .table-col.w-55{
            width: 55%;
        }
        .table-col.w-45{
            width: 45%;
        }
        .table-col.w-10{
            width: 10%;
        }
        .table-col.w-5{
            width: 5%;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .table-head{
           .table-col{
               font-size: 0.9vw;
           }
        }
        .table-body{
            .table-col{
                font-size: 0.75vw;
            }
        }
    }
    .org-item{
        width: 100%;
        height: 1.93vw;
        color: #ffffff;
        font-family: "ParisNineteenSixty";
        font-size: 0.83vw;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 0.99vw;
        transition: 0.1s;
        &.active{
            box-shadow: 0 0 1.41vw rgba(255, 255, 255, 0.21);
            background-color: #ffffff;
            color: #4f75c7;
        }
        &:hover{
            background-color: #ffffff;
            color: #4f75c7;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }

    .body-content{
        padding: 0 0.5vw;
    }
    .content-table{
        padding: 0 1vw;
        max-height: 16.7vw;
        overflow-y: auto;
        overflow-x: hidden;
        &::-webkit-scrollbar{
            width: 0.5vw;
            border-radius: 0.5vw;
        }
        &::-webkit-scrollbar-track{
            background-color: #2f519b;
            border-radius: 0.5vw;
        }
        &::-webkit-scrollbar-thumb{
            background-color: #ffffff;
            border-radius: 0.5vw;
        }
    }
    .table-row{
        display: flex;
        width: 100%;
        margin-bottom: 0.2vw;
        justify-content: space-between;
    }
    .table-col{
        width: 49.7%;
        background: #2f519d;
        padding-left: 1.41vw;
        height: 2.19vw;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .table-head{
        position: sticky;
        top: 0;
        overflow: hidden;
    }
    .table-head .table-col{
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 1.19vw;
        font-weight: bold;
    }
    .table-body .table-col{
        color: #ffffff;
        font-family: "LondonNineteenSixty";
        font-size: 1.09vw;
    }
    input{
        border: none;
        background: inherit;
        width: 100%;
        height: 100%;
    }
    .table-input{
        height: 100%;
        width: 90%;
        display: flex;
        align-items: center;
        input{
            color: #ffffff;
            font-family: "LondonNineteenSixty";
            font-size: 1.09vw;
        }
    }
    .table-input-control{
        background: url('/img/menu/pencil-create.png') no-repeat;
        background-size: contain;
        width: 0.89vw;
        height: 0.89vw;
    }
    .payday-change{
        background: url('/img/menu/pencil-create-red.png') no-repeat;
        background-size: contain;
    }
    .baks-icon{
        width: 1.15vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal{
        background-color: #2f519b;
        padding: 1vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 17vw;
        border-radius: 0.3vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 101;
        .input{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            .input-name{
                color: #ffffff;
                font-family: "ParisNineteenSixty";
                font-size: 1.04vw;
                font-weight: bold;
                text-align: center;
                margin-bottom: 0.4vw;
            }
            input{
                border: none;
                width: 100%;
                height: 1.7vw;
                background-color: #ffffff;
                color: #4f75c7;
                font-family: "NewYorkNineteenSixty";
                font-size: 1.15vw;
                font-weight: bold;
                text-align: center;
                border-radius: 0.3vw;
            }
        }
        .modal-footer{
            margin-top: 1vw;
        }
        .modal-btn{
            background-color: #ffffff;
            color: #4f75c7;
            font-family: "NewYorkNineteenSixty";
            font-size: 1.15vw;
            font-weight: bold;
            text-align: center;
            padding: 0.2vw 0.6vw;
            border-radius: 0.3vw;
            transition: 0.1s;
            margin-bottom: 1vw;
            &:hover{
                color: #ffffff;
                background: #4f75c7;;
            }
        }
    }
    .overlay{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        top: 0;
        left: 0;
        z-index: 100;
    }
    .empty-premium-list{
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 1.19vw;
        font-weight: bold;
        margin-bottom: 1vw;
        text-align: center;
    }
.table-col.w-15{
    width: 15%;
}
.table-col.w-60{
    width: 60%;
}
.table-col.w-20{
    width: 20%;
}
.table-col.w-25{
    width: 25%;
}
.budget-stat .table-col{
    margin: 0 0.1vw;
    padding-left: 0.4vw;
}
</style>