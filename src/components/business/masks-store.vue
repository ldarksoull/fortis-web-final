<template>
    <div class="wrapper">
        <div class="camera">
            <div class="camera-item">
                <div class="camera-item-icon">Q</div>
                <div class="camera-item-text">Повернуть влево</div>
            </div>
            <div class="camera-item">
                <div class="camera-item-icon">E</div>
                <div class="camera-item-text">Повернуть вправо</div>
            </div>
            <div class="camera-item">
                <div class="camera-item-icon">Esc</div>
                <div class="camera-item-text">Выйти</div>
            </div>
        </div>
        <div class="clothes-store">
            <div class="left-block masks-store">
                <div class="left-block-content">
                    <div class="logo"><img src="/img/vespucci-masks-logo.png" alt="" /></div>
                    <div class="clother-list-wrapper scroll" ref="clothList">
                        <div class="clothes-list">
                            <div class="clothes-item" @click="selectCloth(key)" v-for="(item, key) in catalog.mask" :key="key" :class="{ active: selectItem === key }" :ref="`navItem_${key}`">
                                <div class="clothes-name">{{ item.title }}</div>
                                <div class="clothes-price">{{ item.basePrice }} $</div>
                                
                                <div class="arrow arrow-left" @click="prevColor()"><img src="/img/clothes-store/left.png" alt="" /></div>
                                <div class="clothes-type-num" v-if="selectItem === key">{{ selectColor }}</div>
                                <div class="clothes-type-num" v-if="selectItem != key">0</div>
                                <div class="arrow arrow-right" @click="nextColor()"><img src="/img/clothes-store/right.png" alt="" /></div>
                                <div class="clothes-addToCart"><img src="/img/clothes-store/cart-icon.png" alt="" @click.self="buy(key)" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="btn-buy">Купить</div> -->
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            selectItem: -1,
            selectColor: 0,
        };
    },
    computed: {
        ...mapGetters({
            catalog: "getFirstObj",
            id: "enterBusiness",
        }),
    },
    methods: {
        exit() {
            mp.trigger("cMisc-CallServerEvent", "sClothShopBuyerClose");
            mp.trigger("cMisc-CallServerEvent", "sInventoryPreviewReset");
            mp.trigger("cCloseCefAndDestroyCam");
        },
        selectCloth(key) {
            if (this.selectItem === key) return;
            this.selectItem = key;
            this.selectColor = 0;
            this.setClothToPlayer();
        },
        setClothToPlayer() {
            const id = this.catalog.mask[this.selectItem].id;
            const color = this.catalog.mask[this.selectItem].colors[this.selectColor];
            mp.trigger("cMisc-CallServerEvent", "sInventoryPreview", id, color);
        },
        buy: function(key) {
            const obj = {
                shopId: this.id,
                id: this.catalog.mask[this.selectItem].id,
                color: this.catalog.mask[key].colors[this.selectColor],
                basePrice: this.catalog.mask[key].basePrice,
            };
            mp.trigger("cMisc-CallServerEvent", "sInventoryBuyCloth", JSON.stringify(obj));
        },
        nextColor() {
            if (this.selectItem < 0) return;
            if (this.selectColor === this.catalog.mask[this.selectItem].colors.length - 1) {
                this.selectColor = 0;
            } else {
                this.selectColor++;
            }
            this.setClothToPlayer();
        },
        prevColor() {
            if (this.selectItem < 0) return;
            if (this.selectColor === 0) {
                this.selectColor = this.catalog.mask[this.selectItem].colors.length - 1;
            } else {
                this.selectColor--;
            }
            this.setClothToPlayer();
        },
        onKeyUp(e) {
            /*left*/
            if (e.keyCode === 37) {
                this.prevColor();
            }
            /*right*/
            if (e.keyCode === 39) {
                this.nextColor();
            }
            /*ESC*/
            if (e.keyCode === 27) {
                this.exit();
            }
        },
        onKeyDown(e) {
            /*q*/
            if (e.keyCode === 81) {
                mp.trigger("cTattoSaloneRotPlayer", "l");
            }

            /*e*/
            if (e.keyCode === 69) {
                mp.trigger("cTattoSaloneRotPlayer", "r");
            }
            /*up*/
            if (e.keyCode === 38) {
                if (this.selectItem - 1 < 0) return;
                this.selectItem--;
                this.selectColor = 0;
                this.scrollPage(this.selectItem);
                this.setClothToPlayer();
            }
            /*down*/
            if (e.keyCode === 40) {
                if (this.selectItem === this.catalog.mask.length - 1) return;
                this.selectItem++;
                this.selectColor = 0;
                this.scrollPage(this.selectItem);
                this.setClothToPlayer();
            }
        },
        scrollPage(count) {
            const el = document.querySelector(".clothes-item");
            this.$refs.clothList.scrollTop = el.scrollHeight * count - el.scrollHeight * 3;
        },
    },
    created() {
        document.addEventListener("keyup", this.onKeyUp);
        document.addEventListener("keydown", this.onKeyDown);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyUp);
        document.removeEventListener("keydown", this.onKeyDown);
    },
};
</script>
<style scoped>
.clothes-store {
    width: 100%;
    height: 100%;
    padding-top: 6.57vh;
    padding-left: 2.78vh;
    display: flex;
}
.left-block {
    width: 597px;
    height: 690px;
}
.masks-store {
    background: linear-gradient(180deg, rgba(92, 74, 202, 0.5) 0%, rgba(184, 125, 230, 0) 100%), #2b1e7a;
    border-radius: 0.52vw;
}
.logo {
    width: 100%;
    height: 172px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.title {
    color: rgba(255, 255, 255, 0.856);
    font-family: "Century Gothic";
    font-size: 29px;
    font-weight: 700;
    letter-spacing: 0.17px;
    margin-bottom: 30px;
}
.p40 {
    padding: 0 40px;
}
.list {
    display: flex;
    flex-wrap: wrap;
}
.item {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    flex-basis: 33.3%;
    margin-bottom: 30px;
}
.item-icon {
    margin-bottom: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 124px;
    height: 125px;
    border-radius: 10px;
    transition: 0.2s;
}
.item-name {
    color: rgb(255, 255, 255);
    font-family: "Century Gothic";
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.83px;
}
.clother-list-wrapper {
    width: 100%;
    direction: rtl;
    overflow-y: auto;
}
.clothes-list {
    height: 500px;
    direction: ltr;
}
.clothes-item {
    display: flex;
    align-items: center;
    padding: 20px 0;
    height: 67px;
    transition: background-color 0.3s;
}
.masks-store .clothes-item.active {
    background-color: #5243b4;
}
.clothes-name,
.clothes-price,
.clothes-type-num {
    color: rgb(255, 255, 255);
    font-family: "Century Gothic";
    font-size: 18px;
    font-weight: 400;
}
.clothes-name {
    letter-spacing: -0.19px;
    width: 50%;
    padding-left: 20px;
}
.clothes-price {
    width: 20%;
    margin-left: auto;
}
.clothes-buy {
    margin-left: auto;
    padding-right: 20px;
}
.clothes-type {
    width: 20%;
}
.clothes-addToCart {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.clothes-addToCart:active {
    transform: scale(0.95);
}
.clothes-type {
    display: flex;
    justify-content: center;
    align-items: center;
}
.clothes-type-num {
    width: 40px;
    text-align: center;
}
.arrow {
    border-radius: 50%;
    width: 33px;
    height: 33px;
    transition: 0.1s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.arrow-left img {
    margin-right: 2px;
}
.arrow-right img {
    margin-left: 2px;
}
.masks-store .arrow {
    background-color: rgba(81, 15, 62, 0.808);
}
.scroll::-webkit-scrollbar {
    width: 12px;
}
.scroll::-webkit-scrollbar-track,
.scroll::-webkit-scrollbar-thumb {
    border-radius: 6px;
}
.masks-store .scroll::-webkit-scrollbar-track,
.masks-store .scroll::-webkit-scrollbar-track {
    background-color: #ffffff;
}
.masks-store .scroll::-webkit-scrollbar-thumb {
    background-color: #6957dd;
}
.btn-buy {
    position: absolute;
    bottom: -115px;
    width: 100%;
    height: 96px;
    background: #2b1e7a;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic";
    font-size: 48px;
    color: #ffffff;
    border-radius: 50px;
    transition: 0.2s;
    text-transform: uppercase;
}
.btn-buy:hover {
    color: #2b1e7a;
    background: #fff;
}
.check {
    width: 380px;
    height: 495px;
    background: url("/img/clothes-store/check-bg.png");
    margin-left: auto;
    margin-right: 6vw;
    margin-top: 13vh;
}
.check-title {
    width: 100%;
    height: 100px;
    color: rgb(72, 72, 72);
    font-family: "Century Gothic";
    font-size: 46px;
    font-weight: 400;
    letter-spacing: -0.23px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 45px;
}
.check-list {
    height: 168px;
    padding: 0 10px;
    padding-right: 30px;
    direction: ltr;
}
.check-list-wrapper {
    width: 100%;
    direction: rtl;
    overflow-y: auto;
    margin-left: 10px;
}
.check-list-wrapper::-webkit-scrollbar {
    width: 9px;
}
.check-list-wrapper::-webkit-scrollbar-track {
    background-color: rgb(85, 85, 85);
    border-radius: 4px;
}
.check-list-wrapper::-webkit-scrollbar-thumb {
    background-color: rgb(116, 116, 116);
    border-radius: 4px;
}
.check-total {
    color: rgb(115, 115, 115);
    font-family: "Century Gothic";
    font-size: 27px;
    font-weight: 700;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    margin-bottom: 30px;
}
.check-actions {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: rgb(72, 72, 72);
    font-family: "Century Gothic";
    font-size: 20px;
    font-weight: 700;
}
.check-item {
    display: flex;
    align-items: center;
    min-height: 25px;
}
.check-item-name {
    color: rgb(115, 115, 115);
    font-family: "Century Gothic";
    font-size: 17px;
    font-weight: 700;
    width: 75%;
    line-height: 17px;
}
.check-item-price {
    color: rgb(115, 115, 115);
    font-family: "Century Gothic";
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -1.25px;
    width: 20%;
    position: relative;
}
.check-item-price::before,
.check-total-price::before {
    position: absolute;
    left: -35px;
    content: ".....";
    color: rgb(201, 201, 201);
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 1.25px;
    width: 20%;
}
.check-total-price::before {
    left: -50px;
}
.check-total-price {
    position: relative;
}
.check-item-checkbox {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 5%;
}
.container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}
/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    right: 0;
    height: 13px;
    width: 13px;
    background-color: #fff;
    border: 1px solid rgb(167, 167, 167);
}
/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
    border: 1px solid rgb(167, 167, 167);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
    left: 5px;
    top: -6px;
    width: 5px;
    height: 13px;
    border: solid rgb(115, 115, 115);
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
.help-info {
    position: absolute;
    top: 2vh;
    right: 2vh;
    width: 330px;
    height: 43px;
    box-shadow: 0 9px 40px rgba(0, 0, 0, 0.36);
    border-radius: 10px;
    color: rgb(255, 255, 255);
    background-color: rgba(10, 34, 81, 0.753);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: "Century Gothic";
}
.help-info .uppercase {
    text-transform: uppercase;
    font-weight: bold;
    margin: 0 10px;
}
.camera {
    position: absolute;
    bottom: 2vh;
    right: 2vh;
    width: 490px;
    height: 43px;
    box-shadow: 0 9px 40px rgba(0, 0, 0, 0.36);
    border-radius: 10px;
    background-color: rgba(10, 34, 81, 0.753);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.camera-item {
    display: flex;
    color: #ffffff;
    align-items: center;
}
.camera-item-icon {
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 22px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}
.camera-item-text {
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.94px;
    margin-left: 13px;
}
@media (max-width: 1605px) {
    .left-block {
        transform-origin: left top;
        transform: scale(0.9);
    }
    .check {
        transform-origin: right top;
        transform: scale(0.9);
    }
}
@media (max-width: 1500px) {
    .left-block {
        transform-origin: left top;
        transform: scale(0.85);
    }
    .check {
        transform-origin: right top;
        transform: scale(0.85);
    }
}
@media (max-width: 1370px) {
    .left-block {
        transform-origin: left top;
        transform: scale(0.75);
    }
    .check {
        transform-origin: right top;
        transform: scale(0.75);
    }
    .camera {
        transform-origin: right bottom;
        transform: scale(0.75);
    }
    .help-info {
        transform-origin: right top;
        transform: scale(0.75);
    }
}
@media (max-width: 1200px) {
    .left-block {
        transform-origin: left top;
        transform: scale(0.7);
    }
    .check {
        transform-origin: right top;
        transform: scale(0.7);
    }
    .camera {
        transform-origin: right bottom;
        transform: scale(0.7);
    }
    .help-info {
        transform-origin: right top;
        transform: scale(0.7);
    }
}
@media (max-width: 1000px) {
    .left-block {
        transform-origin: left top;
        transform: scale(0.65);
    }
    .check {
        transform-origin: right top;
        transform: scale(0.65);
    }
    .camera {
        transform-origin: right bottom;
        transform: scale(0.65);
    }
    .help-info {
        transform-origin: right top;
        transform: scale(0.65);
    }
}
@media (max-width: 900px) {
    .left-block {
        transform-origin: left top;
        transform: scale(0.6);
    }
    .check {
        transform-origin: right top;
        transform: scale(0.6);
    }
    .camera {
        transform-origin: right bottom;
        transform: scale(0.6);
    }
    .help-info {
        transform-origin: right top;
        transform: scale(0.6);
    }
}
</style>
