<template>
    <div class="wrapper">
        <div class="store">
            <div class="main">
                <div class="header">
                    <div class="store-logo tequilala-logo"><img src="/img/stores/tequil-la-la.png" alt="" /></div>
                </div>
                <div class="body">
                    <div class="list">
                        <div class="item" v-for="(item, key) in assortment" :key="key">
                            <div class="left">
                                <div class="item-name">{{ item.title }}</div>
                                <div class="item-info">{{ item.description }}</div>
                            </div>
                            <div class="right">
                                <div class="item-icon"><img :src="itemImg(item.img)" alt="" /></div>
                                <div class="item-cost">{{ item.price }}$</div>
                            </div>
                            <div class="btn" @click="buyItem(key)">Купить</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="escape">
                <img src="/img/stores/escape-tips.png" alt="" />
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
            id: "enterBusiness",
            assortment: "getArrayFirst",
        }),
    },
    methods: {
        itemImg(img) {
            return "/img/player/inv/" + img;
        },
        buyItem(key) {
            if (this.assortment[key]) {
                mp.trigger("cMisc-CallServerEvent", "sStoreBuyItem", this.id, this.assortment[key].id);
            }
        },
        exit() {
            mp.trigger("cSetPage", "none");
        },
        onKeyDown(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
    },
    created() {
        document.addEventListener("keyup", this.onKeyDown);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyDown);
    },
};
</script>
<style scoped>
.store {
    width: 100%;
    height: 100%;
    background: url("/img/stores/bg.png");
    background-size: cover;
    padding-left: 1.56vw;
    padding-top: 3.7vw;
}
.store .main {
    width: 31.15vw;
    height: 35.94vw;
    box-shadow: 0 0.5vw 2.08vw rgba(0, 0, 0, 0.25);
    border-radius: 0.52vw;
    padding-bottom: 0.28vw;
}
.main {
    background: linear-gradient(180deg, #343333 0%, rgba(122, 120, 120, 0) 100%), #292e32;
}
.header {
    width: 100%;
    height: 21%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1%;
}
.store-logo {
    display: flex;
    justify-content: center;
    align-items: center;
}
.body {
    height: 78%;
}
.tequilala-logo {
    width: 17.6vw;
}
img {
    max-width: 100%;
}
.body {
    direction: rtl;
    overflow-y: auto;
    margin-left: 0.42vw;
}
.list {
    display: flex;
    flex-wrap: wrap;
    direction: ltr;
    margin-right: 0.42vw;
}
.row {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin-bottom: 3.35vw;
}
.item {
    width: 12.34vw;
    height: 5.94vw;
    border-radius: 0.52vw;
    background: linear-gradient(9.33deg, rgba(154, 154, 154, 0.0001) 7.33%, rgba(154, 154, 154, 0.22) 93.25%), #3f4953;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    display: flex;
    margin-bottom: 3.35vw;
    margin-left: 1.7vw;
}
.item .btn {
    width: 6.25vw;
    height: 1.5vw;
    border-radius: 0.52vw;
    position: absolute;
    bottom: -0.75vw;
    left: calc(50% - 6.25vw / 2);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: "Century Gothic";
    font-size: 0.78vw;
    font-weight: 400;
    letter-spacing: -0.15px;
    transition: 0.3s;
}
.item .btn {
    background-color: #8e959b;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: #ffffff;
}
.item .btn:hover {
    background-color: #ffffff;
    color: #04090e;
}
.item-name {
    font-family: "Century Gothic";
    font-size: 0.99vw;
    font-weight: 700;
    letter-spacing: -0.19px;
    /*white-space: nowrap;*/
}
.item-name.small {
    font-size: 0.7vw;
}
.item-name,
.item-info,
.item-cost {
    color: #ffffff;
}
.item-info {
    font-family: "Century Gothic";
    font-size: 0.68vw;
    font-weight: 400;
    letter-spacing: -0.13px;
    margin-top: 0.2vw;
}
.item-cost {
    font-family: "Century Gothic";
    font-size: 0.83vw;
    font-weight: 700;
    position: absolute;
    bottom: 1vw;
    left: 50%;
    transform: translateX(-50%);
}
.left {
    width: 60%;
    padding-left: 0.68vw;
    padding-top: 0.9vw;
}
.right {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.item-icon {
    width: 3.59vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.escape {
    position: absolute;
    bottom: 2vw;
    right: 2vw;
    width: 5.94vw;
    height: 2.19vw;
}
/* ползунок */
.body::-webkit-scrollbar {
    width: 0.52vw !important;
}
.body::-webkit-scrollbar-track {
    border-radius: 0.26vw;
}
.body::-webkit-scrollbar-thumb {
    border-radius: 0.26vw;
}
/* .... */
.body::-webkit-scrollbar-track {
    background-color: #04090e;
}
.body::-webkit-scrollbar-thumb {
    background-color: #8e959b;
}
@media (max-aspect-ratio: 4/3) {
    .store .main {
        position: absolute;
        top: 50%;
        left: 4vw;
        transform: translateY(-50%);
    }
}
</style>
