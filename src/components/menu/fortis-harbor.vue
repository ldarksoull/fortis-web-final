<template>
    <div class="wrapper">
        <div class="page-wrapper">
            <div class="base">
                <div class="header"></div>
                <div class="body">
                    <div class="cards-list">
                        <div class="card" :class="{ free: place.free, 'not-free': !place.free, owner: place.free && haveBoatPlace }" v-for="place in places" :key="place.id">
                            <div class="card-header">Место №{{ place.id }}</div>
                            <div class="card-body">
                                <div class="status">
                                    <div class="price" v-if="!place.free">ЗАНЯТО</div>
                                    <div class="boat-name" v-if="place.free && haveBoatPlace">{{ boatTitle }}</div>
                                    <div class="price" v-if="place.free && !haveBoatPlace">3 000$</div>
                                </div>
                                <div class="main-btn" v-if="place.free && !haveBoatPlace" @click="buyPlace()">Купить</div>
                                <div class="main-btn" v-if="place.free && haveBoatPlace" @click="evacuate(place.id)">Эвакуировать</div>
                            </div>
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
        return {};
    },
    computed: {
        ...mapGetters({
            haveBoatPlace: "getPlayerHaveBoat",
            places: "getBoatPlaces",
            boatTitle: "getBoatTitle",
        }),
    },
    methods: {
        exit() {
            mp.trigger("cCloseCef");
        },
        onKeyUp(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
        buyPlace() {
            mp.trigger("cMisc-CallServerEvent", "sHarborBuyPlace");
        },
        evacuate(id) {
            if (this.boatTitle === "У вас нет лодки") return;
            mp.trigger("cHarborEvacuate", id);
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
</script>
<style lang="scss" scoped>
.wrapper {
    width: 100%;
    height: 100vh;
}

.page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.base {
    width: 60vw;
    height: 36vw;
    background: #0f3c7e;
    border-radius: 0.52vw;
    overflow: hidden;
}
.header {
    width: 100%;
    height: 20%;
    background: #306fcd url("/img/fortis-harbor-logo.png") no-repeat;
    background-position: center;
    background-size: 35%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.header-info {
    display: flex;
    flex-direction: column;
    .info-wrap {
        display: flex;
        justify-content: flex-end;
    }
    .info-text {
        font-family: "Century Gothic";
        font-size: 1.2vw;
        line-height: 1.5vw;
        color: #fff9f9;
        display: flex;
    }
    .info-value {
        min-width: 4.5vw;
        margin-left: 1vw;
    }
}
.body {
    width: 100%;
    height: 80%;
    padding: 1vw 0.8vw;
    position: relative;
}
.cards-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    &::-webkit-scrollbar {
        width: 0.52vw;
        box-shadow: 0px 0.208vw 0.208vw rgba(0, 0, 0, 0.25);
    }
    &::-webkit-scrollbar-thumb {
        background: #2c7df7;
        box-shadow: 0px 0.208vw 0.208vw rgba(0, 0, 0, 0.25);
        border-radius: 0.52vw;
    }
    &::-webkit-scrollbar-track {
        background: #faf3f3;
        border-radius: 0.52vw;
    }
}
.card {
    flex-basis: 23%;
    box-shadow: 0px 0.208vw 0.208vw rgba(0, 0, 0, 0.25);
    margin: 1%;
    min-height: 6.25vw; //120px;
    position: relative;
    border-radius: 0.52vw;
    overflow: hidden;
}
.card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 5.729vw; //110px;
}
.card.not-free {
    background: #8d0909;
    .card-header {
        background: linear-gradient(172.87deg, rgba(255, 243, 243, 0.2) 31.27%, rgba(238, 197, 50, 0) 64.48%, rgba(238, 197, 50, 0) 67.88%), #cf1010;
    }
    .status {
        background: rgba(78, 10, 10, 0.5);
    }
}
.card.free {
    background: #21ac37;
    .card-header {
        background: linear-gradient(172.87deg, rgba(255, 243, 243, 0.2) 31.27%, rgba(238, 197, 50, 0) 64.48%, rgba(238, 197, 50, 0) 67.88%), #138d09;
    }
    .status {
        background: rgba(22, 81, 31, 0.5);
    }
    .main-btn {
        background: #138d09;
        color: #fff;
        &:hover {
            background: darken(#138d09, 5%);
        }
    }
}
.card.owner {
    background: #184fa2;
    .card-header {
        background: linear-gradient(172.87deg, rgba(255, 243, 243, 0.2) 31.27%, rgba(238, 197, 50, 0) 64.48%, rgba(238, 197, 50, 0) 67.88%), #306fcd;
    }
    .status {
        background: #306fcd;
    }
    .main-btn {
        background: #2e77e3;
        color: #fff;
        &:hover {
            background: darken(#2e77e3, 10%);
        }
    }
}
.card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3vw 0;
    width: 100%;
    font-family: "Century Gothic";
    font-size: 1.04vw;
    text-align: center;
    color: #fff4f4;
    text-shadow: 0px 0.208vw 0.208vw rgba(0, 0, 0, 0.25);
}

.btn {
    margin: 0.1vw;
    width: 90%;
    padding: 0.25vw 0;
    border-radius: 0.26vw;
    font-family: "Century Gothic";
    font-size: 0.75vw;
    text-align: center;
    transition: 0.15s;
}
.btn-blue {
    background: #062149;
    color: #fff;
    &:hover {
        background: lighten(#062149, 10%);
    }
}
.btn-white {
    background: #fff;
    color: #184fa2;
    &:hover {
        background: darken(#fff, 10%);
    }
}
.btn-green {
    background: #21ac37;
    color: #fff;
    &:hover {
        background: lighten(#21ac37, 10%);
    }
}
.btn-red {
    background: #cf1010;
    color: #fff;
    &:hover {
        background: lighten(#cf1010, 10%);
    }
}
.status {
    width: 85%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.104vw; //2px;
}
.boat-name {
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 0.781vw; //15px;
    text-align: center;
    color: #fcf8f8;
}
.price {
    font-family: "Century Gothic";
    font-size: 1.302vw; //25px;
    text-align: center;
    color: #fff8f8;
}
.main-btn {
    font-family: "Century Gothic";
    font-size: 0.8vw;
    width: 85%;
    height: 1.3vw;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0.208vw 0.208vw rgba(0, 0, 0, 0.25);
    border-radius: 0.26vw;
    margin-top: 3%;
    transition: 0.15s;
    &:active {
        box-shadow: 0px 0.1vw 0.1vw rgba(0, 0, 0, 0.25);
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
</style>
