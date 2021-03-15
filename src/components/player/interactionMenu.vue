<template>
    <div class="menu active">
        <div class="wheel" v-if="enity.type === 'player'">
            <div class="title">
                <div class="title-text">
                    <div>{{ title }}</div>
                    <div class="numPage" v-if="showPages">
                        <div class="angle left" @click="prevPage()" v-if="pageNumber > 1">&#9666;</div>
                        <div class="num">{{ pageNumber }}</div>
                        <div class="angle right" @click="nextPage()" v-if="select[pageNumber].length > 0">&#9656;</div>
                    </div>
                </div>
                <div class="item i1" :class="{ active: menuItem === 'factionInt' }" @click="loadButtons('factionInt', 'Фракция', 6)" @mouseleave="leaveMouse()" @mouseover="title = 'Фракция'">
                    <div class="icon-wrapper"><img src="/img/menu/police-icon.png" alt="" /></div>
                </div>
                <div class="item i3" :class="{ active: menuItem === 'moneyInt' }" @click="loadButtons('moneyInt', 'Финансы', 3)" @mouseleave="leaveMouse()" @mouseover="title = 'Финансы'">
                    <div class="icon-wrapper"><img src="/img/menu/money-icon.png" alt="" /></div>
                </div>
                <div class="item i2" :class="{ active: menuItem === 'houseInt' }" @click="loadButtons('houseInt', 'Дом', 11)" @mouseleave="leaveMouse()" @mouseover="title = 'Дом'">
                    <div class="icon-wrapper"><img src="/img/menu/home-icon.png" alt="" /></div>
                </div>
                <div class="item i6" :class="{ active: menuItem === 'famillInt' }" @click="loadButtons('famillInt', 'Взаимное', 4)" @mouseleave="leaveMouse()" @mouseover="title = 'Взаимное'">
                    <div class="icon-wrapper"><img src="/img/menu/friend-icon.png" alt="" /></div>
                </div>
                <div class="item i8" :class="{ active: menuItem === 'docInt' }" @click="loadButtons('docInt', 'Документы', 1)" @mouseleave="leaveMouse()" @mouseover="title = 'Документы'">
                    <div class="icon-wrapper"><img src="/img/menu/passport-icon.png" alt="" /></div>
                </div>
            </div>
            <div class="btns active">
                <div class="btn" :class="renderClass(data.key)" v-for="(data, index) in select[selectPage]" :key="data.key" v-on:click.self="action(data.action.key)">
                    <div v-on:click.self="action(data.action.key)">{{ data.action.title }}</div>
                </div>
            </div>
            <div class="btns active vehicles" v-if="showThirdWheel">
                <div class="btn" v-if="showThirdWheel === 'int_sellVehicle'" :class="renderClassThirdWheel(index)" v-for="(veh, index) in property.vehicle" v-on:click.self="action(data.action.key)">
                    <div v-on:click.self="action('int_sellVehicle', veh.id)">{{ veh.title }} {{ veh.numberPlate }}</div>
                </div>
                <div class="btn" v-if="showThirdWheel === 'int_sellHouse'" :class="renderClassThirdWheel(index)" v-for="(house, index) in property.house" v-on:click.self="action(data.action.key)">
                    <div v-on:click.self="action('int_sellHouse', house.id)">Дом №{{ house.id }}</div>
                </div>
            </div>
        </div>
        <div class="wheel" v-if="enity.type === 'none'">
            <div class="title">
                <div class="title-text">
                    <div>{{ title }}</div>
                    <div class="numPage" v-if="showPages">
                        <div class="angle left" @click="prevPage()" v-if="pageNumber > 1">&#9666;</div>
                        <div class="num">{{ pageNumber }}</div>
                        <div class="angle right" @click="nextPage()" v-if="select[pageNumber].length > 0">&#9656;</div>
                    </div>
                </div>
                <div class="item i3" :class="{ active: menuItem === 'emoInt' }" @click="loadButtons('emoInt', 'Эмоции', 3)" @mouseover="title = 'Эмоции'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/emotions.png" alt="" /></div>
                </div>
                <div class="item i1" :class="{ active: menuItem === 'danceInt' }" @click="loadButtons('danceInt', 'Танцы', 6)" @mouseover="title = 'Танцы'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/dances-icon.png" alt="" /></div>
                </div>
                <div class="item i6" :class="{ active: menuItem === 'animInt' }" @click="loadButtons('animInt', 'Анимации', 4)" @mouseover="title = 'Анимации'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/animation-icon.png" alt="" /></div>
                </div>
                <div class="item i8" :class="{ active: menuItem === 'walkInt' }" @click="loadButtons('walkInt', 'Походка', 1)" @mouseover="title = 'Походка'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/walk.png" alt="" /></div>
                </div>
                <div class="item i7" :class="{ active: menuItem === 'dialogInt' }" @click="loadButtons('dialogInt', 'Социальное', 7)" @mouseover="title = 'Социальное'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/dialog.png" alt="" /></div>
                </div>
                <div class="item i4" :class="{ active: menuItem === 'sportInt' }" @click="loadButtons('sportInt', 'Спорт', 8)" @mouseover="title = 'Спорт'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/sport.png" alt="" /></div>
                </div>
                <div class="item i5" :class="{ active: menuItem === 'standInt' }" @click="loadButtons('standInt', 'Стойка', 10)" @mouseover="title = 'Стойка'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/stand.png" alt="" /></div>
                </div>
            </div>
            <div class="btns active">
                <div class="btn" :class="renderClass(data.key)" v-for="(data, index) in select[selectPage]" :key="index" v-on:click.self="action(data.action.key)">
                    <div v-on:click.self="action(data.action.key)">{{ data.action.title }}</div>
                </div>
            </div>
        </div>
        <div class="wheel" v-if="enity.type === 'vehicle'">
            <div class="title">
                <div class="title-text">
                    <div>{{ title }}</div>
                    <div class="numPage" v-if="showPages">
                        <div class="angle left" @click="prevPage()" v-if="pageNumber > 1">&#9666;</div>
                        <div class="num">{{ pageNumber }}</div>
                        <div class="angle right" @click="nextPage()" v-if="select[pageNumber].length > 0">&#9656;</div>
                    </div>
                </div>
                <div class="item i1" :class="{ active: menuItem === 'hackVeh' }" @click="loadButtons('hackVeh', 'Взлом', 6)" @mouseover="title = 'Взлом'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/hack.png" alt="" /></div>
                </div>
                <div class="item i3" :class="{ active: menuItem === 'keyVeh' }" @click="loadButtons('keyVeh', 'Ключи', 3)" @mouseover="title = 'Ключи'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/keys.png" alt="" /></div>
                </div>
                <div class="item i4" :class="{ active: menuItem === 'workVeh' }" @click="loadButtons('workVeh', 'Работа', 8)" @mouseover="title = 'Работа'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/gears.png" alt="" /></div>
                </div>
                <div
                    class="item i6"
                    :class="{ active: menuItem === 'intVeh' }"
                    @click="loadButtons('intVeh', 'Взaимо- действие', 4)"
                    @mouseover="title = 'Взaимо- действие'"
                    @mouseleave="leaveMouse()"
                >
                    <div class="icon-wrapper"><img src="/img/menu/door.png" alt="" /></div>
                </div>
                <div class="item i7" :class="{ active: menuItem === 'factionVeh' }" @click="loadButtons('factionVeh', 'Фракция', 7)" @mouseover="title = 'Фракция'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/fauto.png" alt="" /></div>
                </div>
                <div class="item i8" :class="{ active: menuItem === 'repairVeh' }" @click="loadButtons('repairVeh', 'Обслуживание', 1)" @mouseover="title = 'Обслуживание'" @mouseleave="leaveMouse()">
                    <div class="icon-wrapper"><img src="/img/menu/repair.png" alt="" /></div>
                </div>
            </div>
            <div class="btns active">
                <div class="btn" :class="renderClass(data.key)" v-for="(data, index) in select[selectPage]" :key="index" v-on:click.self="action(data.action.key)">
                    <div v-on:click.self="action(data.action.key)">{{ data.action.title }}</div>
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
            title: "",
            menuItem: "",
            pageNumber: 1,
            select: [[], [], [], [], []],
            selectPage: 0,
            showPages: false,
            showThirdWheel: false,
            addAnimClass: false,
        };
    },
    computed: {
        ...mapGetters({
            actions: "getActions",
            enity: "getActionEnity",
            property: "getPlayerProperty",
        }),
    },
    methods: {
        async loadButtons(type, title, matrixIndex) {
            this.addAnimClass = false;
            this.pageNumber = 1;
            this.selectPage = 0;
            this.showThirdWheel = false;
            this.select = [[], [], [], [], []];
            this.title = title;
            this.menuItem = type;
            await this.$nextTick();
            let defaultMatrixIndex = matrixIndex;
            let i = 0;
            let v = 0;
            for (let key in this.actions[type]) {
                let puhed = {
                    action: this.actions[type][key],
                    key: matrixIndex,
                };
                this.select[v].push(puhed);
                i++;

                /*распределение кнопок возле кнопки раздела*/
                if (i % 2 === 0) {
                    if (matrixIndex - i < 1) {
                        matrixIndex = 12 - (i - matrixIndex);
                    } else {
                        matrixIndex -= i;
                    }
                } else {
                    if (matrixIndex + i > 12) {
                        matrixIndex = matrixIndex + i - 12;
                    } else {
                        matrixIndex += i;
                    }
                }

                if (i > 11) {
                    i = 0;
                    v++;
                    matrixIndex = defaultMatrixIndex;
                }
            }
            this.showPages = this.actions[type].length > 12;

            setTimeout(() => {
                this.addAnimClass = true;
            }, 50);
        },
        renderClass(key) {
            if (!this.addAnimClass) return;
            return "b" + key + " active";
        },
        renderClassThirdWheel(i) {
            if (!this.addAnimClass) return;
            return "veh" + i + " active";
        },
        leaveMouse() {
            switch (this.menuItem) {
                case "factionInt":
                    this.title = "Фракция";
                    break;
                case "moneyInt":
                    this.title = "Финансы";
                    break;
                case "houseInt":
                    this.title = "Дом";
                    break;
                case "famillInt":
                    this.title = "Взаимное";
                    break;
                case "emoInt":
                    this.title = "Эмоции";
                    break;
                case "docInt":
                    this.title = "Документы";
                    break;
                case "danceInt":
                    this.title = "Танцы";
                    break;
                case "sportInt":
                    this.title = "Спорт";
                    break;
                case "animInt":
                    this.title = "Анимации";
                    break;
                case "dialogInt":
                    this.title = "Социальное";
                    break;
                case "standInt":
                    this.title = "Стойка";
                    break;
                case "walkInt":
                    this.title = "Походка";
                    break;
                case "hackVeh":
                    this.title = "Взлом";
                    break;
                case "keyVeh":
                    this.title = "Ключи";
                    break;
                case "workVeh":
                    this.title = "Работа";
                    break;
                case "intVeh":
                    this.title = "Взaимо- действие";
                    break;
                case "factionVeh":
                    this.title = "Фракция";
                    break;
                case "repairVeh":
                    this.title = "Починка";
                    break;
                default:
                    this.title = "";
                    break;
            }
        },

        nextPage() {
            this.pageNumber += 1;
            this.selectPage += 1;
        },
        prevPage() {
            if (this.pageNumber === 1) return false;
            this.pageNumber -= 1;
            this.selectPage -= 1;
        },
        action(k, param = false) {
            if ((k === "int_sellVehicle" || k === "int_sellHouse") && !param) {
                if (k === "int_sellHouse") {
                    if (this.property.house.length === 0) return;
                    if (this.property.house[0] && this.property.house[0].hotelTitle) return;
                }
                this.showThirdWheel = k;
                this.addAnimClass = false;
                setTimeout(() => {
                    this.addAnimClass = true;
                }, 50);
            } else {
                mp.trigger("cActionCommand", k, param);
            }
        },

        onKeyUp(e) {
            if (e.keyCode === 69 || e.keyCode === 9) {
                mp.trigger("cSetPage", "none");
            }
        },
    },
    components: {},
    mounted() {
        document.addEventListener("keyup", this.onKeyUp);
    },
    beforeDestroy() {
        this.showThirdWheel = false;
        document.removeEventListener("keyup", this.onKeyUp);
    },
};
</script>

<style scoped>
.menu {
    position: absolute;
    z-index: 999;
    top: 40%;
    left: 55%;
    opacity: 0;
    transform-origin: center center;
    transform: scale(0);
}
.menu .wheel {
    width: 15.05vw;
    height: 15.05vw;
    border-radius: 50%;
    background-color: rgba(7, 45, 80, 0.952);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: center center;
}
.menu.active .wheel {
}
.menu.active {
    opacity: 1;
    transform: scale(1);
    transform-origin: center;
}
.menu .title {
    position: relative;
    width: 4.53vw;
    height: 4.53vw;
    border-radius: 50%;
    background-color: rgba(9, 55, 98, 0.945);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 0.73vw;
    font-weight: 400;
    line-height: 0.73vw;
    padding: 0.52vw;
    text-align: center;
    transform-origin: center center;
}
.menu .wheel .item {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 2.34vw;
    height: 2.4vw;
    transform-origin: center center;
}
.menu .wheel .item .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
.menu .wheel .item:hover,
.menu .wheel .item.active {
    background-color: rgba(9, 55, 98, 0.95);
}
.btn {
    position: absolute;
    width: 8.65vw;
    height: 2.34vw;
    border-radius: 1.04vw;
    background-color: rgba(9, 55, 98, 0.952);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 0.68vw;
    font-weight: 400;
    letter-spacing: 0.13px;
    opacity: 0;
    padding: 0 0.26vw;
    transition: 0.2s;
    transform: scale(0.1);
}
.btns {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
}
.btns.active {
    opacity: 1;
}
.btn.active {
    opacity: 1;
}
.btn:hover {
    background-color: rgba(7, 45, 80, 0.952);
}

.b1.active {
    transform: translate(0px, -9.38vw) scale(1);
}
.b2.active {
    transform: translate(9.38vw, -7.29vw) scale(1);
}
.b3.active {
    transform: translate(11.98vw, -3.65vw) scale(1);
}
.b4.active {
    transform: translate(12.5vw, 0px) scale(1);
}
.b5.active {
    transform: translate(11.98vw, 3.65vw) scale(1);
}
.b6.active {
    transform: translate(9.9vw, 7.29vw) scale(1);
}
.b7.active {
    transform: translate(0, 9.38vw) scale(1);
}
.b8.active {
    transform: translate(-9.9vw, 7.29vw) scale(1);
}
.b9.active {
    transform: translate(-11.98vw, 3.65vw) scale(1);
}
.b10.active {
    transform: translate(-12.5vw, 0px) scale(1);
}
.b11.active {
    transform: translate(-11.98vw, -3.65vw) scale(1);
}
.b12.active {
    transform: translate(-9.38vw, -7.29vw) scale(1);
}

.i1 {
    transform: translate(3.59vw, 3.59vw) scale(1);
}
.i2 {
    transform: translate(-3.59vw, -3.59vw) scale(1);
}
.i3 {
    transform: translate(3.59vw, -3.59vw) scale(1);
}
.i4 {
    transform: translate(-3.59vw, 3.59vw) scale(1);
}
.i5 {
    transform: translate(-5vw, 0px) scale(1);
}
.i6 {
    transform: translate(5vw, 0px) scale(1);
}
.i7 {
    transform: translate(0px, 5vw) scale(1);
}
.i8 {
    transform: translate(0px, -4.79vw) scale(1);
}
.numPage {
    display: flex;
    justify-content: center;
    align-items: center;
}
.numPage .num {
    width: 0.9vw;
}
.scale-enter,
.scale-leave-to {
    transform: scale(0);
    opacity: 0;
}
.veh0 {
    transform: translate(21.98vw, -4.25vw);
}
.veh1 {
    transform: translate(21.18vw, -7.25vw);
}
.veh2 {
    transform: translate(22.18vw, -1.25vw);
}
.veh3 {
    transform: translate(20.18vw, -10.25vw);
}
.veh4 {
    transform: translate(22.18vw, 1.75vw);
}
.veh5 {
    transform: translate(19.18vw, -13.25vw);
}
.veh6 {
    transform: translate(22.18vw, 4.75vw);
}
.veh7 {
    transform: translate(17.88vw, -16.25vw);
}
.veh8 {
    transform: translate(21.18vw, 7.75vw);
}
.veh9 {
    transform: translate(20.18vw, 10.75vw);
}
@media (min-width: 2048px) {
    img {
        max-width: 150%;
    }
}
@media (max-width: 1600px) {
    .menu .wheel .item .icon-wrapper img {
        width: 90%;
        height: 90%;
    }
}
@media (max-width: 1368px) {
    .menu .wheel .item .icon-wrapper img {
        width: 80%;
        height: 80%;
    }
}
@media (max-width: 1100px) {
    .menu .wheel .item .icon-wrapper img {
        width: 60%;
        height: 60%;
    }
}
@media (max-aspect-ratio: 4/3) {
    .left-bottom {
        position: absolute;
        bottom: 2vh;
        left: 25vw;
    }
}
</style>
