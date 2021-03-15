<template>
    <div class="wrapper">
        <div class="page-wrapper">
            <div class="base">
                <div class="header">
                    <div class="header-info">
                        <div class="info-wrap">
                            <div class="info-text">Свободных комнат:</div><div class="info-text info-value">{{freeRoomsCount}}</div>
                        </div>
                        <div class="info-wrap">
                            <div class="info-text">Цена суточной аренды:</div><div class="info-text info-value">{{price}}$</div>
                        </div>
                    </div>
                </div>
                <div class="body">
                    <div class="cards-list">
                        <div class="card"
                         :class="{free: room.ownerId === 0, 'not-free': room.ownerId != playerGuid, owner: room.ownerId === playerGuid}"
                         v-for="room in rooms" :key="room.guid">
                            <div class="card-header">{{ room.title }}</div>
                            <div class="card-body">
                                <div class="input-name" v-if="room.ownerId === 0">Кол-во дней:</div>
                                <div class="input-name" v-if="room.ownerId === playerGuid">Осталось времени:</div>
                                <input class="input" v-if="room.ownerId === 0" type="number" v-model.number="room.rentDays">
                                <div class="input" v-if="room.ownerId === playerGuid">{{getTimeLeft(room.hoursLeft)}}</div>
                                <div class="room-not-free" v-if="room.ownerId != playerGuid && room.ownerId != 0">ЗАНЯТО</div>
                                <div class="btn btn-white" style="margin: 1vw;" v-if="room.ownerId != playerGuid && room.ownerId != 0" @click="enterRoom(room.dim, room.guid)">Войти</div>
                            </div>
                            <div class="card-footer">
                                <div class="options" v-if="room.ownerId === playerGuid">
                                    <div class="btn btn-blue" @click="moveOut(room.guid)">
                                        Выселиться
                                    </div>
                                    <div class="btn btn-white" @click="enterRoom(room.dim)">
                                        Войти
                                    </div>
                                    <div class="btn btn-green" v-if="room.isClosed" @click="changeCloseState(room.guid, 0)">
                                        Открыть
                                    </div>
                                    <div class="btn btn-red" v-if="!room.isClosed" @click="changeCloseState(room.guid, 1)">
                                        Закрыть
                                    </div>
                                </div>
                                <div class="price" v-if="room.ownerId === 0">{{price}}$</div>
                                <div class="main-btn" v-if="room.ownerId === 0" @click="rentRoom(room)">Арендовать</div>
                                <div class="main-btn" v-if="room.ownerId === playerGuid" @click="showModal(room)">Продлить аренду</div>
                            </div>
                        </div>
                    </div>
                    <transition name="fade">
                    <div class="modal" v-if="modal === 1">
                        <div class="modal-header">Введите кол-во дней</div>
                        <div class="modal-body">
                            <input class="modal-input" type="number" v-model.number="daysAdd">
                        </div>
                        <div class="modal-footer">
                            <div class="modal-btn" @click="closeModal()">
                                Отмена
                            </div>
                            <div class="modal-btn" @click="rentDaysAdd()">
                                Ок
                            </div>
                        </div>
                    </div>
                    </transition>
                    <transition name="fade">
                    <div class="overlay" v-if="modal === 1"></div>
                    </transition>
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
            modal: 0,
            daysAdd: "",
        };
    },
    computed: {
        ...mapGetters({
            rooms: "getHotelRoom",
            price: "getHotelRoomPrice",
            playerGuid: "getGUID",
        }),
        freeRoomsCount: function() {
            return this.rooms.filter(r => r.ownerId === 0).length;
        },
    },
    methods: {
        showModal(room) {
            this.rentedRoom = room;
            this.modal = 1;
        },
        closeModal() {
            this.modal = 0;
        },
        getTimeLeft(hours) {
            const d = Math.floor(hours / 24);
            const h = hours - d * 24;
            return `${d} д. ${h} ч.`;
        },
        exit() {
            mp.trigger("cCloseCef");
        },
        onKeyUp(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
        rentRoom(room) {
            if (!Number.isInteger(room.rentDays) || room.rentDays < 1 || room.rentDays > 7)
                return storage.addNotification({ text: "Введите количество дней от 1 до 7", theme: "error" });
            const sendData = {
                id: room.guid,
                days: room.rentDays,
            };
            mp.trigger("cMisc-CallServerEvent", "sHotelRentRoom", JSON.stringify(sendData));
        },
        rentDaysAdd() {
            if (!Number.isInteger(this.daysAdd) || this.daysAdd < 1) return;
            const totalHours = this.daysAdd * 24 + this.rentedRoom.hoursLeft;
            if (totalHours > HOURS_IN_WEEK) {
                return storage.addNotification({ text: "Аренду номера можно продлить до 7 дней", theme: "error" });
            }
            const sendData = {
                id: this.rentedRoom.guid,
                hours: totalHours,
                days: this.daysAdd,
            };
            mp.trigger("cMisc-CallServerEvent", "sHotelAddRentDays", JSON.stringify(sendData));
            this.modal = 0;
        },
        moveOut(id) {
            mp.trigger("cMisc-CallServerEvent", "sHotelMoveOut", id);
        },
        enterRoom(roomDim, roomGuid = false) {
            mp.trigger("cMisc-CallServerEvent", "sHotelRoomEnter", JSON.stringify({ roomDim, roomGuid }));
            this.exit();
        },
        changeCloseState(id, state) {
            mp.trigger("cMisc-CallServerEvent", "sHotelRoomChangeClose", JSON.stringify({ id, state }));
        },
    },
    created() {
        document.addEventListener("keyup", this.onKeyUp);
    },
    beforeDestroy() {
        mp.trigger("cMisc-CallServerEvent", "sHotelCloseMenu");
        document.removeEventListener("keyup", this.onKeyUp);
    },
};
const HOURS_IN_WEEK = 168;
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

.page-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10;
}
.modal{
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
    background: rgba(30, 91, 182, 0.9);
    border-radius: 0.52vw;
    color: #fff;
    font-family: "Century Gothic";
    padding: 0 1vw;
    width: 14vw;
    .modal-header{
        padding: 0.5vw;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1vw;
    }
    .modal-body{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-input{
        border: none;
        padding: 0.3vw 0;
        text-align: center;
        background: #7494C5;
        color: #fff;
        font-size: 1vw;
        width: 100%;
        border-radius: 0.26vw;
    }
    .modal-footer{
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 0.5vw 0;
        .modal-btn{
            width: 5.5vw;
            padding: 0.25vw 0;
            border-radius: 0.26vw;
            font-size: 0.75vw;
            text-align: center;
            transition: 0.15s;
            background: rgba(0,0,0,0.3);
            &:hover{
                background: rgba(0,0,0,0.5);
            }
        } 
    }
}
    .base{
        width: 60vw;
        height: 35vw;
        background: #0F3C7E;
        border-radius: 0.52vw;
        overflow: hidden;
    }
    .header{
        width: 100%;
        height: 20%;
        background: #306FCD url('/img/hotel-logo.png') no-repeat;
        background-position: center;
        background-size: 13%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .header-info{
        display: flex;
        flex-direction: column;
        .info-wrap{
            display: flex;
            justify-content: flex-end;
        }
        .info-text{
            font-family: "Century Gothic";
            font-size: 1.2vw;
            line-height: 1.5vw;
            color: #FFF9F9;
            display: flex;
        }
        .info-value{
            min-width: 4.5vw;
            margin-left: 1vw;
        }
    }
    .body{
        width: 100%;
        height: 80%;
        padding: 1vw 0.8vw;
        position: relative;
    }
    .cards-list{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        &::-webkit-scrollbar{
            width: 0.52vw;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
        &::-webkit-scrollbar-thumb{
            background: #2C7DF7;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 0.52vw;
        }
        &::-webkit-scrollbar-track{
            background: #FAF3F3;
            border-radius: 0.52vw;
        }
    }
    .card{
        flex-basis: 23%;
        height: 40%;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin: 1%;
        position: relative;
        border-radius: 0.52vw;
    }
    .card.not-free{
        .card-header{
            background: linear-gradient(172.87deg, rgba(255, 243, 243, 0.2) 31.27%, rgba(238, 197, 50, 0) 64.48%, rgba(238, 197, 50, 0) 67.88%), #CF1010;
        }
        .card-body{
            width: 100%;
            height: 75%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #8D0909;
            border-bottom-left-radius: 0.52vw;
            border-bottom-right-radius: 0.52vw;
            flex-direction: column;
        }
    }
    .card.free{
        .card-header{
            background: linear-gradient(172.87deg, rgba(255, 243, 243, 0.2) 31.27%, rgba(238, 197, 50, 0) 64.48%, rgba(238, 197, 50, 0) 67.88%), #138D09;
        }
        .card-body{
            background: rgb(20, 105, 29);
            height: 35%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-bottom: 0.2vw;
        }
        .card-footer{
            background: #21AC37;
            width: 100%;
            height: 40%;
            padding-top: 0.3vw;
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }
        .input{
            background: #8EFFAE;
            color: #196925;
        }
        .price{
            background: rgba(22, 81, 31, 0.5);
            padding: 0.1vw 0.4vw;
            text-align: center;
            font-family: "Century Gothic";
            font-size: 1vw;
            color: #fff;
            border-radius: 0.26vw;
            margin: 0.9vw;
        }
        .main-btn{
            width: 8vw;
            background: #138D09;
            color: #fff;
             &:hover{
                background: darken(#138D09, 5%);
            }
        }
    }
    .card.owner{
        .card-header{  
            background: linear-gradient(172.87deg, rgba(255, 243, 243, 0.2) 31.27%, rgba(238, 197, 50, 0) 64.48%, rgba(238, 197, 50, 0) 67.88%), #306FCD;
        }
        .card-body{
            background: rgba(23, 43, 73, 0.5);
            height: 35%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-bottom: 0.2vw;
        }
        .card-footer{
            background: #184FA2;
            width: 100%;
            height: 40%;
            .options{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
            }
        }
        .input{
            background: #7494C5;
        }
        .main-btn{
            background: #2E77E3;
            color: #fff;
             &:hover{
                background: darken(#2E77E3, 10%);
            }
        }
    }
    .card-header{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 25%;
        width: 100%;
        font-family: "Century Gothic";
        font-size: 1.04vw;
        text-align: center;
        color: #FFF4F4;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-top-left-radius: 0.52vw;
        border-top-right-radius: 0.52vw;
    }
    .card-footer{
        border-bottom-left-radius: 0.52vw;
        border-bottom-right-radius: 0.52vw;
    }
    .room-not-free{
        width: 75%;
        height: 50%;
        background: rgba(78, 10, 10, 0.5);
        border-radius: 2px;
        font-family: "Century Gothic";
        font-size: 1.3vw;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFF7F7;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    .input-name{
        font-family: "Century Gothic";
        font-size: 0.68vw;
        line-height: 1vw;
        text-align: center;
        color: #FFFCFC;
    }
    .input{
        width: 75%;
        height: 40%;
        border-radius: 3px;
        border: none;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.288);
        padding: 2px;
        font-family: "Century Gothic";
        font-size: 0.78vw;
        text-align: center;
        color: #fff;
        font-weight: bold;
    }
    .options{
        padding-top: 0.3vw;
    }
    .btn{
        margin: 0.1vw;
        width: 5.5vw;
        padding: 0.25vw 0;
        border-radius: 0.26vw;
        font-family: "Century Gothic";
        font-size: 0.75vw;
        text-align: center;
        transition: 0.15s;
    }
    .btn-blue{
        background: #062149;
        color: #fff;
        &:hover{
            background: lighten(#062149, 10%);
        }
    }
    .btn-white{
        background: #fff;
        color: #184FA2;
        &:hover{
            background: darken(#fff, 10%);
        }
    }
    .btn-green{
        background: #21AC37;
        color: #fff;
        &:hover{
            background: lighten(#21AC37, 10%);
        }
    }
    .btn-red{
        background: #CF1010;
        color: #fff;
        &:hover{
            background: lighten(#CF1010, 10%);
        }
    }
    .main-btn{
        font-family: "Century Gothic";
        font-size: 0.8vw;
        width: 10vw;
        height: 1.3vw;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 0.26vw;
        position: absolute;
        bottom: -0.65vw;
        left: 50%;
        transform: translateX(-50%);
        transition: background 0.15s;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
</style>