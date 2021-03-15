<template>
    <div class="wrapper">
        <div class="lscustoms cars-shop">
            <div class="exit" @click="exit">Выйти</div>
            <div class="main">
                <div class="left">
                    <div class="shop-logo">
                        <div class="lscustoms-icon"><img src="/img/car-shop/lscustoms-logo.png" alt="" /></div>
                    </div>
                    <div class="back" @click="openMainPage" v-if="page != 'main'">
                        <div class="back-icon"><img src="/img/car-shop/back.png" alt="" /></div>
                        <div class="back-text">Назад</div>
                    </div>
                    <div class="main-list list" v-if="page === 'main'">
                        <div class="cars-list">
                            <div class="cars-list-wrapper">
                                <div class="cars-item-wrapper" v-for="item in vehicleMods">
                                    <div class="cars-item" @click="openModPage(item.title)">{{ item.title }}</div>
                                </div>
                                <div class="cars-item-wrapper">
                                    <div class="cars-item" :class="{ active: modTitle === 'neon' }" @click="modTitle = 'neon'">Неоновая подсветка</div>
                                </div>
                                <div class="cars-item-wrapper">
                                    <div class="cars-item" :class="{ active: modTitle === 'paint' }" @click="modTitle = 'paint'">Покраска</div>
                                </div>
                                <div class="cars-item-wrapper">
                                    <div class="cars-item" @click="openModalPage('repair')">Починить</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list" ref="modList" v-if="page === 'modPage'">
                        <div class="cars-list">
                            <div class="cars-list-wrapper">
                                <div class="cars-item-wrapper" v-for="(item, index) in selectedMod">
                                    <div
                                        class="cars-item"
                                        :class="getActiveClass(item.modIndex)"
                                        @click="showModal(item.modIndex, item.price, item.mats)"
                                        @mouseover="mouseOverHandler(item.modIndex, index)"
                                        @mouseleave="mouseLeaveHandler()"
                                    >
                                        <div>{{ item.itemName }}</div>
                                        <div>{{ item.price | divideNumber }}$</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="block-1">
                        <div class="title">Характеристики улучшены на</div>
                        <div class="items">
                            <div class="item">
                                <div class="item-name">Скорость</div>
                                <div class="item-bar">
                                    <div class="filler filler-1" :style="{ width: car.Двигатель + '%' }"></div>
                                </div>
                                <div class="item-info">{{ car.Двигатель }}%</div>
                            </div>
                            <div class="item">
                                <div class="item-name">Ускорение</div>
                                <div class="item-bar">
                                    <div class="filler filler-2" :style="{ width: car.Трансмиссия + '%' }"></div>
                                </div>
                                <div class="item-info">{{ car.Трансмиссия }}%</div>
                            </div>
                            <div class="item">
                                <div class="item-name">Управляемость</div>
                                <div class="item-bar">
                                    <div class="filler filler-3" :style="{ width: car.Подвеска + '%' }"></div>
                                </div>
                                <div class="item-info">{{ car.Подвеска }}%</div>
                            </div>
                        </div>
                    </div>
                    <div class="block-2" v-show="modTitle === 'paint'">
                        <div class="items">
                            <chrome-picker v-model="primaryColorNew" @input="updateColor(1)"></chrome-picker>
                        </div>
                        <div class="color-title">
                            <div class="btn-title">
                                Основной цвет
                            </div>
                        </div>
                        <div class="btns">
                            <div class="btn" @click="setDefaultColor(1)">Отмена</div>
                            <div class="btn" @click="openModalPage('primaryColor')">Покрасить</div>
                        </div>
                    </div>
                    <div class="block-2" v-show="modTitle === 'paint'">
                        <div class="items">
                            <chrome-picker v-model="secondaryColorNew" @input="updateColor()"></chrome-picker>
                        </div>
                        <div class="color-title">
                            <div class="btn-title">
                                Дополнительный цвет
                            </div>
                        </div>
                        <div class="btns">
                            <div class="btn" @click="setDefaultColor()">Отмена</div>
                            <div class="btn" @click="openModalPage('secondaryColor')">Покрасить</div>
                        </div>
                    </div>
                    <div class="block-2" style="grid-column-start: 2" v-show="modTitle === 'neon'">
                        <div class="items">
                            <chrome-picker v-model="neonColorNew" @input="updateNeonColor()"></chrome-picker>
                        </div>
                        <div class="color-title">
                            <div class="btn-title">
                                Неоновая подсветка
                            </div>
                        </div>
                        <div class="btns">
                            <div class="btn" @click="setDefaultNeonColor()">Отмена</div>
                            <div class="btn" @click="openModalPage('neonColor')">Применить</div>
                        </div>
                    </div>
                </div>
            </div>
            <transition name="scale">
                <div class="modal" v-if="modalPage">
                    <div class="modal-body">
                        <div class="modal-text">
                            Вы уверены, что хотите
                            {{ getModalPageText() }}?
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="modal-btn" @click="acceptOffer()">Да</div>
                        <div class="modal-btn" @click="modalPage = ''">Нет</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import chrome from "vue-color/src/components/Chrome.vue";
export default {
    data() {
        return {
            modalPage: false,
            car: {
                Двигатель: 0,
                Трансмиссия: 0,
                Подвеска: 0,
            },
            carDefaultStats: {
                Двигатель: 0,
                Трансмиссия: 0,
                Подвеска: 0,
            },
            primaryColorNew: {
                rgba: { r: 11, g: 11, b: 11, a: 1 },
            },
            secondaryColorNew: {
                rgba: { r: 255, g: 255, b: 255, a: 1 },
            },
            neonColorNew: {
                rgba: { r: 0, g: 0, b: 0, a: 1 },
            },
            page: "main",
            selectedMod: [],
            modTitle: "",
            modType: 0,
            modIndex: 0,
            modPrice: 0,
            modMats: 0,
            modStats: {
                Двигатель: [0, 25, 50, 75, 100],
                Трансмиссия: [0, 35, 70, 100],
                Подвеска: [0, 25, 50, 75, 100],
            },
            scrollTop: {},
            modIndexArrow: 0,
            modIndexArrowMod: 0,
            showSelected: false,
        };
    },
    computed: {
        ...mapGetters({
            primaryColorDefault: "getVehPrimaryColor",
            secondaryColorDefault: "getVehSecondaryColor",
            neonColorDefault: "getNeonColor",
            vehicleMods: "getVehicleMods",
            additionalPrice: "getVehicleAditionalPrice",
        }),
    },
    methods: {
        showModal(index, price, mats) {
            if (this.isModInstalled(index)) return;
            this.openModalPage("mod");
            this.modIndex = index;
            this.modPrice = price;
            this.modMats = mats;
        },
        updateColor(isPrimary = 0) {
            const firstColor = this.primaryColorNew.rgba ? this.primaryColorNew.rgba : this.primaryColorNew;
            const secondColor = this.secondaryColorNew.rgba ? this.secondaryColorNew.rgba : this.secondaryColorNew;
            const sendData = {
                color: isPrimary ? [firstColor.r, firstColor.g, firstColor.b] : [secondColor.r, secondColor.g, secondColor.b],
                isPrimary: isPrimary,
            };
            mp.trigger("cMisc-CallServerEvent", "sCustomsCheckColor", JSON.stringify(sendData));
        },
        updateNeonColor() {
            const color = this.neonColorNew.rgba ? this.neonColorNew.rgba : this.neonColorNew;
            mp.trigger("cMisc-CallServerEvent", "sCustomsCheckNeon", JSON.stringify([color.r, color.g, color.b]));
        },
        setDefaultColor(isPrimary = 0) {
            if (isPrimary) {
                this.primaryColorNew = JSON.parse(JSON.stringify(this.primaryColorDefault));
            } else {
                this.secondaryColorNew = JSON.parse(JSON.stringify(this.secondaryColorDefault));
            }
            this.updateColor(isPrimary);
        },
        setDefaultNeonColor() {
            this.neonColorNew = JSON.parse(JSON.stringify(this.neonColorDefault));
            this.updateNeonColor();
        },
        acceptOffer() {
            if (this.modalPage === "primaryColor" || this.modalPage === "secondaryColor") {
                const firstColor = this.primaryColorNew.rgba ? this.primaryColorNew.rgba : this.primaryColorNew;
                const secondColor = this.secondaryColorNew.rgba ? this.secondaryColorNew.rgba : this.secondaryColorNew;
                const sendData = {
                    color: this.modalPage === "primaryColor" ? [firstColor.r, firstColor.g, firstColor.b] : [secondColor.r, secondColor.g, secondColor.b],
                    colorType: this.modalPage,
                    price: this.additionalPrice.paint.price,
                    mats: this.additionalPrice.paint.mats,
                };
                mp.trigger("cMisc-CallServerEvent", "sCustomsSaveColor", JSON.stringify(sendData));
            }
            if (this.modalPage === "mod") {
                let isMotoWheel = false;
                if (this.modType === 23 && this.vehicleMods.find(m => m.isMoto)) isMotoWheel = true;
                const sendData = {
                    modType: this.modType,
                    modIndex: this.modIndex,
                    price: this.modPrice,
                    mats: this.modMats,
                    vehicleMods: this.vehicleMods,
                    isMotoWheel: isMotoWheel,
                };
                mp.trigger("cMisc-CallServerEvent", "sCustomsSaveMod", JSON.stringify(sendData));
            }
            if (this.modalPage === "repair") {
                const sendData = {
                    price: this.additionalPrice.repair.price,
                    mats: this.additionalPrice.repair.mats,
                };
                mp.trigger("cMisc-CallServerEvent", "sCustomsRepairVeh", JSON.stringify(sendData));
            }
            if (this.modalPage === "neonColor") {
                const neonColor = this.neonColorNew.rgba ? this.neonColorNew.rgba : this.neonColorNew;
                const sendData = {
                    color: [neonColor.r, neonColor.g, neonColor.b],
                    price: this.additionalPrice.neon.price,
                    mats: this.additionalPrice.neon.mats,
                };
                mp.trigger("cMisc-CallServerEvent", "sCustomsSaveNeon", JSON.stringify(sendData));
            }
            this.modalPage = false;
        },
        openModalPage(page) {
            if (this.modalPage) return;
            if (page === "primaryColor" && !this.primaryColorNew.rgba) return;
            if (page === "secondaryColor" && !this.secondaryColorNew.rgba) return;
            this.modalPage = page;
        },
        exit() {
            mp.trigger("cMisc-CallServerEvent", "sCustomsExit");
            mp.trigger("cSetPage", "none");
            setTimeout(()=>{
                mp.trigger("cRenderChangeDisableKey", "[200]", false);
            }, 1000);
        },
        async openModPage(title) {
            if (this.modalPage) return;
            this.page = "modPage";
            this.modTitle = title;
            const mod = this.vehicleMods.find(m => m.title === title);
            this.selectedMod = mod.modTypes;
            this.modType = mod.modType;
            this.modIndexArrow = 0;
            this.modIndexArrowMod = 0;
            this.showSelected = false;
            await this.$nextTick();
            this.$refs.modList.scrollTop = this.scrollTop[title] || 0;
        },
        mouseOverHandler(modIndex, index) {
            if (this.modalPage) return;
            let isMotoWheel = false;
            if (this.modType === 23 && this.vehicleMods.find(m => m.isMoto)) isMotoWheel = true;
            const sendData = {
                modType: this.modType,
                modIndex: modIndex,
                isMotoWheel: isMotoWheel,
            };
            mp.trigger("cMisc-CallServerEvent", "sCustomsCheckMod", JSON.stringify(sendData));
            if (this.car[this.modTitle] == undefined) return;
            const stat = this.modStats[this.modTitle];
            this.car[this.modTitle] = stat[index];
        },
        mouseLeaveHandler() {
            const defaultModIndex = this.vehicleMods.find(m => m.modType === this.modType).selectedType;
            let isMotoWheel = false;
            if (this.modType === 23 && this.vehicleMods.find(m => m.isMoto)) isMotoWheel = true;
            const sendData = {
                modType: this.modType,
                modIndex: defaultModIndex,
                isMotoWheel: isMotoWheel,
            };
            mp.trigger("cMisc-CallServerEvent", "sCustomsCheckMod", JSON.stringify(sendData));
            if (this.car[this.modTitle] == undefined) return;
            this.car[this.modTitle] = this.carDefaultStats[this.modTitle];
        },
        getActiveClass(index) {
            const selectedType = this.vehicleMods.find(m => m.title === this.modTitle).selectedType;
            if (selectedType === index || (this.showSelected && this.modIndexArrowMod === index)) return "active";
        },
        isModInstalled(index) {
            const selectedType = this.vehicleMods.find(m => m.title === this.modTitle).selectedType;
            if (selectedType === index) return true;
        },
        getModalPageText() {
            switch (this.modalPage) {
                case "primaryColor":
                case "secondaryColor":
                    return `изменить цвет авто за ${this.additionalPrice.paint.price}$`;
                    break;
                case "mod":
                    return "приобрести данную модификацию";
                    break;
                case "repair":
                    return `починить авто за ${this.additionalPrice.repair.price}$`;
                    break;
                case "neonColor":
                    return `изменить цвет неоновой подсветки авто за ${this.additionalPrice.neon.price}$`;
                    break;
                default:
                    return "";
                    break;
            }
        },
        openMainPage() {
            const list = this.$refs.modList;
            if (list) this.scrollTop[this.modTitle] = list.scrollTop;
            this.page = "main";
            this.showSelected = false;
        },
        onKeyDown({ keyCode }) {
            if (this.page === "modPage" && (keyCode === 38 || keyCode === 40)) {
                this.showSelected = true;
                /*up*/
                if (keyCode === 38) {
                    if (this.modIndexArrow === 0) {
                        this.modIndexArrow = this.selectedMod.length - 1;
                    } else {
                        this.modIndexArrow--;
                    }
                }
                /*down*/
                if (keyCode === 40) {
                    if (this.modIndexArrow === this.selectedMod.length - 1) {
                        this.modIndexArrow = 0;
                    } else {
                        this.modIndexArrow++;
                    }
                }
                this.modIndexArrowMod = this.selectedMod[this.modIndexArrow].modIndex;
                this.mouseOverHandler(this.modIndexArrowMod, this.modIndexArrow);
                this.scrollPage(this.modIndexArrow);
            }
            /*ESC*/
            if (keyCode === 27) {
                if (this.page !== "main") {
                    this.modalPage = ''
                    this.mouseLeaveHandler();
                    this.openMainPage();
                } else {
                    this.exit();
                }
            }
        },
        scrollPage(count) {
            const el = document.querySelector(".cars-item-wrapper");
            this.$refs.modList.scrollTop = el.scrollHeight * count - el.scrollHeight * 5;
        },
    },
    mounted() {
        this.primaryColorNew = JSON.parse(JSON.stringify(this.primaryColorDefault));
        this.secondaryColorNew = JSON.parse(JSON.stringify(this.secondaryColorDefault));
        this.neonColorNew = JSON.parse(JSON.stringify(this.neonColorDefault));
        this.carDefaultStats = {
            Двигатель: 0,
            Трансмиссия: 0,
            Подвеска: 0,
        };
        /*подсчет сколько процентов к характеристикам добавляет мод(зависит от кол-ва доступных модов на это авто)*/
        for (const key in this.modStats) {
            this.modStats[key] = [];
            
            const mod = this.vehicleMods.find(m => m.title === key);
            if (!mod) continue;
            const modTypeCount = mod.modTypes.length;
            const increment = 100 / (modTypeCount - 1);
            let percent = 0;
            for(let i = 0; i < modTypeCount; i++){
                this.modStats[key].push(Math.floor(percent));
                percent += increment;
            }
        }

        for (const stat in this.carDefaultStats) {
            const installedMod = this.vehicleMods.find(m => m.title === stat);
            if (installedMod) {
                const indexForCarStats = installedMod.selectedType + 1;
                this.carDefaultStats[stat] = this.modStats[stat][indexForCarStats];
            }
        }
        this.car = JSON.parse(JSON.stringify(this.carDefaultStats));
    },
    watch: {
        vehicleMods: function(val) {
            for (const stat in this.carDefaultStats) {
                const installedMod = this.vehicleMods.find(m => m.title === stat);
                if (installedMod) {
                    const indexForCarStats = installedMod.selectedType + 1;
                    this.carDefaultStats[stat] = this.modStats[stat][indexForCarStats];
                }
            }
            this.car = JSON.parse(JSON.stringify(this.carDefaultStats));
        },
    },
    created() {
        document.addEventListener("keydown", this.onKeyDown);
    },
    beforeDestroy() {
        document.removeEventListener("keydown", this.onKeyDown);
    },
    components: {
        "chrome-picker": chrome,
    },
};
</script>
<style scoped>
.exit {
    position: absolute;
    bottom: 2.03vw;
    right: 2.03vw;
    color: #f5f5f6;
    font-family: "Century Gothic";
    font-size: 1.56vw;
    font-weight: 700;
}
.cars-shop {
    width: 100%;
    height: 100%;
    padding-top: 2.03vw;
    padding-left: 2.29vw;
    padding-right: 2.03vw;
    padding-bottom: 3.75vw;
    position: relative;
    display: flex;
    align-items: center;
}
.main {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2.6vw;
    width: 100%;
}
.left {
    padding-bottom: 2vw;
    padding-left: 1vw;
    z-index: 2;
    width: 27.55vw;
    height: 36.7vw;
    border-radius: 1.04vw;
    position: relative;
}
.right {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.5vw;
}
.right .block-1 {
    width: 17.24vw;
    height: 17.71vw;
    border-radius: 1.04vw;
    margin-bottom: 0.5vw;
    grid-column-start: 2;
}
.right .block-2 {
    width: 17.24vw;
    border-radius: 1.04vw;
    grid-row-start: 2;
}
.right .block-1 .title {
    width: 100%;
    text-align: center;
    font-family: "Century Gothic";
    font-size: 1.56vw;
    font-weight: 700;
    letter-spacing: -0.75px;
    padding-top: 0.7vw;
    padding-bottom: 1.2vw;
}
.block-1 .items {
    padding: 0 2.19vw;
}
.block-1 .item {
    position: relative;
    margin-bottom: 1vw;
}
.block-1 .item-name {
    font-family: "Century Gothic";
    font-size: 1.15vw;
    font-weight: 700;
}
.block-1 .item-bar {
    width: 100%;
    height: 0.68vw;
    border-radius: 0.36vw;
    margin-top: 0.83vw;
}
.block-1 .item-info {
    font-family: "Century Gothic";
    font-size: 0.94vw;
    font-weight: 700;
    position: absolute;
    right: 0;
    bottom: 0.9vw;
}
.block-1 .filler {
    height: 100%;
    transition: 0.4s;
    border-radius: 0.36vw;
}
.block-2 {
    padding-bottom: 1.4vw;
    position: relative;
}
.block-2 .items {
    padding: 1vw 0.9vw;
}
.block-2 .color-title {
    position: absolute;
    top: calc(-2.34vw / 2);
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.block-2 .btn-title {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 12.04vw;
    height: 2.34vw;
    border-radius: 20px;
    background-color: #0c1a3c;
    background-image: linear-gradient(30deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.2) 100%);
    font-size: 0.89vw;
    font-weight: 700;
    font-family: "Century Gothic";
    transition: 0.2s;
}
.block-2 .btns {
    position: absolute;
    bottom: calc(-2.34vw / 2);
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.block-2 .btn {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 6.04vw;
    height: 2.34vw;
    border-radius: 20px;
    background-color: #0c1a3c;
    background-image: linear-gradient(30deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.2) 100%);
    font-size: 0.89vw;
    font-weight: 700;
    font-family: "Century Gothic";
    transition: 0.2s;
}
.block-2 .btn:hover {
    background-color: #fa917a;
    box-shadow: 0 0 0.83vw rgba(229, 147, 129, 0.16);
    background-image: linear-gradient(30deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.2) 100%);
}
.block-2 .item-name,
.block-2 .item-info {
    font-family: "Century Gothic";
    font-size: 1.15vw;
    font-weight: 700;
}
.block-2 .item-info {
    width: 100%;
    height: 1.61vw;
    border-radius: 0.78vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 0.6vw;
    margin-top: 0.7vw;
}
.shop-logo {
    height: 27%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cars-list {
    padding-left: 0.72vw;
    z-index: 2;
    padding-right: 1.72vw;
    padding-top: 0.5vw;
    padding-bottom: 0.5vw;
}
.list {
    height: 73%;
    width: 100%;
    overflow: auto;
    direction: rtl;
}
.cars-list-wrapper {
    direction: ltr;
}
.cars-item {
    width: 100%;
    height: 3.07vw;
    border-radius: 1.04vw;
    margin-bottom: 0.57vw;
    font-family: "Century Gothic";
    font-size: 1.15vw;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1.77vw;
    padding-right: 1vw;
    z-index: 3;
    position: relative;
    transition: 0.2s;
}
.modal {
    width: 32.14vw;
    height: 16.56vw;
    position: absolute;
    border-radius: 1.04vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    top: calc(50% - 16.56vw / 2);
    left: calc(50% - 32.14vw / 2);
}
.modal-body {
    display: flex;
    align-items: center;
    height: 65%;
}
.modal-text {
    font-family: "Century Gothic";
    font-size: 1.56vw;
    font-weight: 400;
    text-align: center;
    padding-left: 5.21vw;
    padding-right: 5.21vw;
}
.modal-footer {
    display: flex;
    justify-content: space-evenly;
    height: 35%;
    align-items: flex-start;
}
.modal-btn {
    font-family: "Century Gothic";
    font-size: 1.25vw;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 11.82vw;
    height: 3.65vw;
    border-radius: 0.52vw;
    transition: 0.2s;
}
.lscustoms .left {
    background-color: rgba(12, 26, 60, 0.95);
    background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
}
.lscustoms .right .block-1 {
    background-color: rgba(12, 26, 60, 0.95);
    background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
}
.lscustoms .right .block-2 {
    background-color: rgba(18, 32, 64, 0.95);
    background-image: linear-gradient(66deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
}
.lscustoms .list::-webkit-scrollbar {
    width: 0.36vw !important;
}
.lscustoms .list::-webkit-scrollbar-track {
    background-color: #0d214c;
    border-radius: 0.16vw;
}
.lscustoms .list::-webkit-scrollbar-thumb {
    box-shadow: 0 0 1.41vw rgba(235, 146, 127, 0.38);
    border-radius: 0.16vw;
    background-color: #fa917a;
    background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
}
.lscustoms-icon {
    width: 11.93vw;
    height: 5.36vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.lscustoms .block-1 .title {
    color: #f5f5f6;
}
.lscustoms .block-1 .item-name {
    color: #f5f5f6;
}
.lscustoms .block-1 .item-bar {
    background-color: #131f3e;
}
.lscustoms .block-1 .item-info {
    color: #f5f5f6;
}
.lscustoms .block-1 .filler {
    box-shadow: 0 0 1vw 0.3vw rgba(229, 147, 129, 0.09);
    background-color: #fa917a;
    background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
}
.lscustoms .block-2 .items {
    color: #f5f5f6;
}
.lscustoms .block-2 .item-info {
    background-color: #161615;
}
.lscustoms .cars-item {
    background-color: #1a2a4d;
    background-image: linear-gradient(31deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.02) 100%);
    color: #ffffff;
}
.lscustoms .cars-item:hover,
.lscustoms .cars-item.active {
    box-shadow: 0 0 0.5vw 0.2vw rgba(229, 147, 129, 0.16);
    background-color: #fa917a;
    background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
}
.lscustoms .colors-list-item:hover {
    box-shadow: 0 0 0px 3px #6b6b6b;
}

.lscustoms .price-title {
    color: #ffffff;
}
.lscustoms .price-num {
    color: #ffffff;
}
.lscustoms .buy-btn {
    box-shadow: 0 0 1vw 0.1vw rgba(27, 165, 211, 0.38);
    transition: 0.2s;
    background-color: rgba(28, 165, 211, 0.95);
    background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    color: #ffffff;
}
.lscustoms .buy-btn:hover {
    box-shadow: 0 0 2vw 0.5vw rgba(27, 165, 211, 0.38);
}
.lscustoms .colors-title {
    color: #f5f5f6;
}
.lscustoms .filler-1 {
    width: 40%;
}
.lscustoms .filler-2 {
    width: 20%;
}
.lscustoms .filler-3 {
    width: 10%;
}
img {
    max-width: 100%;
}
.lscustoms .modal {
    background-color: rgba(19, 32, 65, 0.95);
}

.lscustoms .modal-text {
    color: #ffffff;
}
.lscustoms .modal-btn {
    border: 1px solid #e59381;
    color: #ffffff;
}
.lscustoms .modal-btn:hover {
    background-color: #fa917a;
}
.scale-enter-active,
.scale-leave-active {
    transition: all 0.2s;
    transform: scale(1);
}
.scale-enter, .scale-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: scale(0.5);
}
.back {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 7.3vw;
    background-color: #222c47;
    width: 4.74vw;
    height: 1.61vw;
    border-radius: 0.52vw;
    transition: 0.2s;
}
.back:hover {
    background-color: #152443;
}
.back-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.04vw;
    height: 0.99vw;
}
.back-text {
    margin-left: 0.3vw;
    color: rgba(255, 255, 255, 0.5);
    font-family: "Century Gothic";
    font-size: 0.89vw;
    font-weight: 400;
    letter-spacing: -1px;
}
</style>
