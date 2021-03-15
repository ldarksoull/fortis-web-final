<template>
    <div class="wrapper flex-center">
        <div class="base">
            <div class="header">
                <span>Что вы желаете арендовать?</span>
            </div>
            <div class="body">
                <div class="body-item">
                    <div class="item-props">
                        <div class="item-prop"><span>Модель: </span>Winky</div>
                        <div class="item-prop"><span>Вместимость: </span> 3 чел.</div>
                        <div class="item-prop"><span>Цена аренды: </span> 1000$</div>
                    </div>
                    <div class="item-btn" @click="rent('winky', 1000)">Арендовать</div>
                </div>
                <div class="body-item">
                    <div class="item-props">
                        <div class="item-prop"><span>Модель: </span>Manchez</div>
                        <div class="item-prop"><span>Вместимость: </span> 1 чел.</div>
                        <div class="item-prop"><span>Цена аренды: </span> 500$</div>
                    </div>
                    <div class="item-btn" @click="rent('manchez2', 500)">Арендовать</div>
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
            carRentId: "getCarRentId",
        }),
    },
    methods: {
        rent(type, price) {
            mp.trigger("cMisc-CallServerEvent", "sVehicleRentCar", this.carRentId, type, price);
            this.exit();
        },
        exit() {
            mp.trigger("cCloseCef");
        },
        onKeyUp(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
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
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.base {
    width: 40.31vw; //774px;
    background: linear-gradient(180deg, rgba(38, 153, 244, 0.3) 0%, rgba(255, 255, 255, 0) 100%), #045391;
    border-radius: 0.52vw; //10px;
    overflow: hidden;
}
.header {
    height: 3.65vw; //70px;
    background: linear-gradient(180deg, rgba(86, 163, 223, 0.8) 0%, rgba(109, 185, 244, 0) 100%), #1e7cc7;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic";
    font-size: 1.3vw; //25px;
    color: #fffefe;
    text-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
}
.body {
    height: 16.15vw; //310px;
    overflow-y: auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 13.28vw; //255px;
    place-content: start center;
    gap: 1.46vw; //28px;
    padding: 1.61vw; //31px;
    height: 100%;
}
.body-item {
    background: linear-gradient(180deg, rgba(86, 163, 223, 0.8) 0%, rgba(109, 185, 244, 0) 100%), #1e7cc7;
    border-radius: 0.52vw; //10px;
    padding: 1.51vw; //29px;
    display: flex;
    flex-direction: column;
}
.item-prop {
    font-family: "Century Gothic";
    font-style: normal;
    font-weight: bold;
    font-size: 0.94vw; //18px;
    color: #fffefe;
    margin-bottom: 0.73vw; //14px;
}
.item-btn {
    width: 100%;
    height: 1.88vw; //36px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #34a6ff;
    border-radius: 1.04vw; //20px;
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 0.83vw; //16px;
    color: #fffefe;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.15s;
    margin-top: auto;
    &:hover {
        filter: brightness(115%);
    }
}
</style>
