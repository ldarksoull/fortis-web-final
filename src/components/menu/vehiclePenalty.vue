<template>
    <div class="wrapper">
        <div class="base">
            <div class="header">Штрафстоянка</div>
            <div class="body">
                <div class="list">
                    <div class="item" v-for="vehicle in penaltyList">
                        <div class="item-body">
                            <div class="col">
                                <div class="col-name">Модель авто</div>
                                <div class="col-value">{{ vehicle.title }}</div>
                            </div>
                            <div class="col">
                                <div class="col-name">Гос. номер</div>
                                <div class="col-value">{{ vehicle.number }}</div>
                            </div>
                            <div class="col">
                                <div class="col-name">Сумма штрафа</div>
                                <div class="col-value">{{ vehicle.penaltyPrice | divideNumber(" ") }} $</div>
                            </div>
                        </div>
                        <div class="item-footer">
                            <div class="btn" @click="payPenalty(vehicle.vehicleId)">Оплатить</div>
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
            penaltyList: "getVehPenalty",
        }),
    },
    methods: {
        payPenalty(vehId) {
            mp.trigger("cMisc-CallServerEvent", "sVehiclePayPenalty", vehId);
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
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
.base {
    width: 774px;
    background: linear-gradient(180deg, rgba(38, 153, 244, 0.3) 0%, rgba(255, 255, 255, 0) 100%), #045391;
    border-radius: 10px;
    @media (max-width: 1300px) {
        transform: scale(0.75);
    }
}
.header {
    height: 70px;
    background: linear-gradient(180deg, rgba(86, 163, 223, 0.8) 0%, rgba(109, 185, 244, 0) 100%), #1e7cc7;
    border-radius: 10px 10px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic";
    font-size: 26px;
    color: #fffefe;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.body {
    padding: 20px 10px;
}
.list {
    padding: 0 20px;
    overflow: auto;
    height: 300px;
    &::-webkit-scrollbar {
        width: 7px;
    }
    &::-webkit-scrollbar-track {
        background: #fffefe;
        border-radius: 50px;
    }
    &::-webkit-scrollbar-thumb {
        background: #34a6ff;
        border-radius: 50px;
    }
}
.item {
    min-height: 159px;
    background: linear-gradient(180deg, rgba(86, 163, 223, 0.8) 0%, rgba(109, 185, 244, 0) 100%), #1e7cc7;
    border-radius: 10px;
    margin-bottom: 20px;
    padding-top: 22px;
    &:last-child {
        margin-bottom: 0;
    }
    &-body {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 5px;
    }
}
.col {
    text-align: center;
    padding: 0 10px;
}
.col-name,
.col-value {
    font-size: 20px;
    color: #fffefe;
}
.col-name {
    margin-bottom: 15px;
    font-family: "Century Gothic";
}
.col-value {
    font-family: "Century Gothic Bold";
}
.item-footer {
    display: flex;
    justify-content: center;
    padding: 20px 0;
}
.btn {
    width: 253px;
    height: 36px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #34a6ff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic Bold";
    font-size: 16px;
    color: #fffefe;
    transition: 0.2s;
    &:hover {
        color: #1e7cc7;
        background: #fffefe;
    }
}
</style>
