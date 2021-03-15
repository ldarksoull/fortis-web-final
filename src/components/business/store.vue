<template>
    <div class="wrapper">
        <div class="store" :class="styleShop()">
            <div class="main">
                <div class="header">
                    <div class="store-logo" :class="iconStyleShop()"><img :src="imgStyleShop()" alt=""></div>
                </div>
                <div class="body">
                    <div class="list">
                            <div class="item" v-for="(item,key) in assortment" :key='key'>
                                <div class="left">
                                    <div class="item-name">{{item.title}}</div>
                                    <div class="item-info">{{item.description}}</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img :src="itemImg(item.img)" alt=""></div>
                                    <div class="item-cost">{{item.price}}$</div>
                                </div>
                                <div class="btn" @click="buyItem(key)">Купить</div>
                            </div>
                    </div>
                </div>
            </div>
            <div class="escape">
                <img src="/img/stores/escape-tips.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    data(){
        return{
        }
    },
	computed: {
		...mapGetters({
				id: "enterBusiness",
				option: "getFirstObj",
                assortment: "getArrayFirst",
			}),
	},
    methods:{
		styleShop(){
			return this.option.styleShop;
		},
		imgStyleShop(){
			return "/img/stores/"+this.option.styleShop+".png";
		},
		iconStyleShop(){
			return this.option.styleShop+"-logo";
		},
		itemImg(img){
			return "/img/player/shop/"+img;
		},
		buyItem(key){
			if(this.assortment[key]){
				mp.trigger("cMisc-CallServerEvent", "sStoreBuyItem", this.id, this.assortment[key].id);
			}
		},
        exit() {
			mp.trigger("cSetPage","none");
		},
        onKeyDown(e){
		
            if( e.keyCode === 27){
				this.exit();
			}
            
        },
    },
    created() {
        document.addEventListener('keyup', this.onKeyDown);
    },
    beforeDestroy() {
		document.removeEventListener('keyup',this.onKeyDown);
	},
}
</script>
<style scoped>
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
html,body {
	height: 100%;
  	width: 100%;
}
.wrapper{
	width: 100%;
	height: 100vh;
}

    .store{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .store .main{
        width: 33.5vw;
        height: 35.94vw;
        box-shadow: 0 0.5vw 2.08vw rgba(0, 0, 0, 0.25);
        border-radius: 0.52vw;
        padding-bottom: 0.28vw;
    }
    
    .header{
        width: 100%;
        height: 21%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1%;
    }
    .store-logo{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .body{
        height: 78%;
    }

    img{
        max-width: 100%;
    }
    .body{
        direction: rtl;
        overflow-y: auto;
        margin-left: 0.42vw;
    }
    .list{
        display: flex;
        flex-wrap: wrap;
        direction: ltr;
        margin-right: 0.42vw;
        justify-content: space-around;
    }
    .item{
        width: 14.34vw;
        height: 6.8vw;
        border-radius: 0.52vw;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
        position: relative;
        display: flex;
        margin-bottom: 1.8vw;
    }
    
    .item .btn{
        width: 6.25vw;
        height: 1.50vw;
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
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.05);
    }
    
    
    .item-name{
        font-family: "Century Gothic";
        font-size: 0.99vw;
        font-weight: 700;
        letter-spacing: -0.19px;
        white-space: nowrap;
    }
    
    .item-info{
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: -0.13px;
        margin-top: 0.2vw;
    }
    .item-cost{
        font-family: "Century Gothic";
        font-size: 0.83vw;
        font-weight: 700;
        position: absolute;
        bottom: 1vw;
        left: 50%;
        transform: translateX(-50%)
    }
    .left{
        width: 60%;
        padding-left: 0.68vw;
        padding-top: 0.9vw;
    }
    .right{
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .item-icon{
        width: 3.59vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .escape{
        position: absolute;
        bottom: 2vw;
        right: 2vw;
        width: 5.94vw;
        height: 2.19vw;
    }
/* ползунок */
    .body::-webkit-scrollbar {
        width: 0.52vw!important;
    }
    .body::-webkit-scrollbar-track{
        border-radius: 0.26vw;
    }
    .body::-webkit-scrollbar-thumb{
        border-radius: 0.26vw;
    }

 /* 247 store */
	.store247 .main{
        background-color: rgba(241, 241, 241, 0.95);
    }
	.store247-logo{
        width: 8.75vw;
        height: 4.58vw;
    }
	.store247 .item{
        background-color: #095d2b;
    }
	.store247 .item .btn{
        background-color: #296a43;
        color: #ffffff;
    }
	.store247 .item .btn:hover{
        background-color: #9a0910;
    }
	.store247 .item-name, .store247 .item-info, .store247 .item-cost{
        color: #ffffff;
    }
	.store247 .body::-webkit-scrollbar-track{
        background-color: #bebec0;
    }
    .store247 .body::-webkit-scrollbar-thumb{
        background-color: #095d2b;
    }
/* cluckinbell */
    .cluckinbell .main{
        background-color: rgba(225, 225, 225, 0.95);
    }
    .cluckinbell-logo{
        width: 5.26vw;
        height: 6.41vw;
    }
    .cluckinbell .item{
        background-color: #dc3d2a;
    }
	.cluckinbell .item .btn{
        background-color: #dc3d2a;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.18);
        color: #ffffff;
    }
    .cluckinbell .item .btn:hover{
        background-color: #1e4f7b;
    }
    .cluckinbell .item-name, .cluckinbell .item-info, .cluckinbell .item-cost{
        color: #ffffff;
    }
    .cluckinbell .body::-webkit-scrollbar-track{
        background-color: #bebec0;
    }
    .cluckinbell .body::-webkit-scrollbar-thumb{
        background-color: #d34938;
    }
/* cyberworld */
    .cyberworld .main{
        background-color: rgba(44, 25, 72, 0.95);
    }
	.cyberworld-logo{
        width: 7.92vw;
        height: 6.67vw;
    }
    .cyberworld .item{
        background-color: #5337cc;
    }
    .cyberworld .item .btn{
        background-color: #4b2ec5;
        color: #ffffff;
    }
    .cyberworld .item .btn:hover{
        background-color: #41256b;
    }
    .cyberworld .item-name, .cyberworld .item-info, .cyberworld .item-cost{
        color: #ffffff;
    }
	.cyberworld .body::-webkit-scrollbar-track{
        background-color: #221335;
    }
    .cyberworld .body::-webkit-scrollbar-thumb{
        background-color: #5337cc;
    }
/* bigfish */

    .bigfish .main{
        background-color: rgba(70, 130, 208, 0.95);
    }
    .bigfish-logo{
        width: 9.74vw;
        height: 7.55vw;
    }
    .bigfish .item{
        background-color: #ffffff;
    }
    .bigfish .item .btn{
        box-shadow: 0 0.21vw 0.42vw 0.26vw rgba(0, 0, 0, 0.06);
        background-color: #ffffff;
        color: #335292;
    }
    .bigfish .item .btn:hover{
        background-color: #335292;
        color: #ffffff;
    }
    .bigfish .item-name, .bigfish .item-info, .bigfish .item-cost{
        color: #335292;
    }
    .bigfish .body::-webkit-scrollbar-track{
        background-color: #335292;
    }
    .bigfish .body::-webkit-scrollbar-thumb{
        background-color: #ffffff;
    }
</style>
    