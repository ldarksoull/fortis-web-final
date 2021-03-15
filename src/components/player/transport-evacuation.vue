<template>
    <div class="wrapper">
        <div class="base">
            <div class="header">Эвакуация автомобилей</div>
            <div class="body">
                <div class="vehicle-empty" v-if="!cars.length">У вас нет личных автомобилей</div>
                <div class="list">
                    <div class="list-item" v-for="item in cars">
                        <div class="item-header">
                            <div class="ts-name">{{ item.title }}</div>
                        </div>
                        <div class="item-body">
                            <div class="ts-num">{{ item.numberPlate }}</div>
                        </div>
                        <div class="item-footer">
                            <div class="action-btn" @click="evacuate(item.id)">Эвакуировать</div>
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
            cars: "getPlayerCars",
        }),
    },
    methods: {
        evacuate: function(id) {
            mp.trigger("cMisc-CallServerEvent", "sVehicleEvacuatePlayerVehicle", id);
        },
        exit: function() {
            mp.trigger("cSetPage", "none");
        },
        onKeyUp: function(e) {
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
<style scoped lang="scss">
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
.base {
    width: 35vw;
    height: 23.8vw;
    background: #045391;
    border-radius: 0.52vw;
    overflow: hidden;
}
.header {
    font-family: "Century Gothic";
    font-size: 1.77vw;
    background: #1a8be4;
    color: #fff5f5;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.body {
    height: 85%;
    width: 100%;
    padding: 1vw 0.5vw;
}
.vehicle-empty {
    text-align: center;
    margin-top: 7vw;
    font-family: "Century Gothic";
    font-size: 1.77vw;
    background: #1a8be4;
    color: #fff5f5;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.list {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    max-height: 100%;
    justify-content: space-between;
    &::-webkit-scrollbar {
        width: 0.52vw;
    }
    &::-webkit-scrollbar-track {
        background: #fffbfb;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 0.52vw;
    }
    &::-webkit-scrollbar-thumb {
        background: #1a8be4;
        box-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
        border-radius: 0.52vw;
    }
}
.list-item {
    width: calc(50% - 1vw);
    border-radius: 0.26vw;
    margin: 0.5vw;
    padding: 0.4vw;
    margin-top: 0;
    margin-bottom: 1vw;
    background: #096ab7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
    font-family: "Century Gothic";
}
.item-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.2vw;
    .ts-name {
        font-size: 1.04vw;
        color: #fffbfb;
    }
}
.item-body {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.4vw;
    .ts-num {
        background: rgba(11, 70, 117, 0.85);
        border-radius: 0.26vw;
        width: 50%;
        height: 80%;
        font-size: 0.83vw;
        color: #fafdff;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.item-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    .action-btn {
        background: linear-gradient(180deg, #4facf5 0%, rgba(86, 168, 233, 0.348958) 65.1%, rgba(0, 0, 0, 0) 100%), #1a8be4;
        border-radius: 0.26vw;
        color: #fafdff;
        padding: 0.15vw 1.4vw;
        transition: 0.2s;
        font-size: 0.83vw;
        &:hover {
            background: #4facf5;
            color: #fff;
        }
    }
}
</style>
