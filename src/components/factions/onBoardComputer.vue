<template>
    <div class="wrapper">
        <div class="base">
            <transition name="trs">
                <div class="inner" v-if="page === 1">
                    <div class="enter-header">
                        <div class="line"></div>
                        <div class="logo"></div>
                    </div>
                    <div class="btn btn" @click="page = 2">Вход в бортовой компьютер</div>
                </div>
            </transition>
            <transition name="trs">
                <div class="inner" v-if="page === 2">
                    <div class="header">Введите номер автомобиля</div>
                    <div class="input-wrapper">
                        <input class="number" type="text" maxlength="8" v-model.trim='Auto.Number'>
                        <div class="btn btn2" @click="getData()">Пробить номер</div>
                    </div>
                </div>
            </transition>
            <transition name="trs">
                <div class="inner align-left" v-if="page === 3">
                    <div class="header">Поиск выполнен</div>
                    <div class="info-list">
                        <div class="info-item">
                            <div class="info-name">Имя владельца</div>
                            <div class="info-data">{{onBoardComputer.autoOwner}}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-name">Паспорт владельца</div>
                            <div class="info-data">{{onBoardComputer.passportId}}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-name">Номер авто</div>
                            <div class="info-data">{{onBoardComputer.autoNumber}}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-name">Модель авто</div>
                            <div class="info-data">{{onBoardComputer.autoModel}}</div>
                        </div>
                    </div>
                    <div class="btn btn3" @click="page = 2">Назад</div>
                </div>
            </transition>
            <transition name="trs">
                <div class="inner align-left" v-if="page === 4">
                    <div class="header">Номер не найден</div>

                    <div class="btn btn3" @click="page = 2">Назад</div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from "vuex";

    export default {
        data(){
            return{
                page: 1,
                Auto : {
                    Number : ''
                }
            }
        },
        computed: {
            ...mapGetters({
                onBoardComputer: "getOnBoardComputer",
            }),
        },
        methods: {
            getData() {
                mp.trigger("cMisc-CallServerEvent", "sFactionOnBoardComputerCalc", this.Auto.Number);
                this.page = 3;
            },
            exit() {
                mp.trigger("cCloseCef");
                mp.trigger("cSetPage", 'none');
            },
            onKeyUp(k) {
                if (k.keyCode === 27) {
                    this.exit();
                }
            }
        },
        created() {
            document.addEventListener('keyup', this.onKeyUp);
        },
        beforeDestroy() {
            document.removeEventListener('keyup',this.onKeyUp);
        }
    }
</script>
<style scoped lang="scss">
    .wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .base{
        width: 66.77vw;
        height: 39vw;
        background: url('/img/onBoardComputer/frame.png') no-repeat;
        background-size: contain;
        position: relative;
    }
    .inner{
        background:#426498 url('/img/onBoardComputer/bg.png') no-repeat;
        background-size: contain;
        border-radius: 0.52vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        position: absolute;
        top: 3.49vw;
        left: 2.76vw;
        width: 61.2vw;
        height: 32.5vw;
    }
    .line{
        width: 100%;
        height: 3.7vw;
        background: linear-gradient(180deg, #1E375E 0%, rgba(43, 81, 139, 0) 100%), #15315B;
        opacity: 0.7;
        box-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
        z-index: 2;
    }
    .logo{
        width: 11.46vw;
        height: 11.35vw;
        background: url('/img/onBoardComputer/lspd-logo.png') no-repeat;
        background-size: contain;
        position: absolute;
        z-index: 3;
    }
    .enter-header{
        height: 11.35vw;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-bottom: 7.34vw;
        margin-top: 1.09vw;
    }
    .btn{
        background: rgba(49, 150, 222, 0.5);
        box-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
        border-radius: 0.52vw;
        font-family: "Century Gothic";
        font-size: 2.81vw;
        color: #FEFAFA;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.42vw 1.04vw;
        transition: 0.2s;
        z-index: 10;
        &:hover{
            background: rgba(255, 255, 255, 0.85);
            color: #1E375E;
        }
    }
    .btn2{
        padding: 0.5vw 1.5vw;
    }
    .header{
        height: 5.36vw;
        width: 100%;
        background: rgba(49, 150, 222, 0.5);
        font-family: "Century Gothic";
        font-size: 3.13vw;
        color: rgba(255, 255, 255, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .input-wrapper{
        margin-top: 4.27vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .number{
        width: 39.69vw;
        height: 4.38vw;
        padding: 0 5%;
        background: #C4C4C4;
        border-radius: 0.52vw;
        font-family: "Century Gothic";
        font-size: 2.81vw;
        color: rgb(0, 0, 0);
        text-align: center;
        border: none;
        margin-bottom: 6.72vw;
    }
    .info-list{
        margin-left: 5vw;
        margin-top: 2.2vw;
        font-family: "Century Gothic";
        font-size: 2.08vw;
        color: rgba(255, 255, 255, 0.85);
    }
    .info-item{
        display: flex;
        margin-bottom: 1.51vw;
    }
    .info-name{
        width: 15.1vw;
        font-weight: bold;
    }
    .info-data{
        margin-left: 5vw;
    }
    .align-left{
        align-items: flex-start;
    }
    .btn3{
        position: absolute;
        bottom: 0.6vw;
        left: 1.1vw;
        font-size: 2.08vw;
        padding: 0.26vw 2vw;
    }
</style>
