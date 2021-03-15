<template>
        <div class="wrapper">
            <div class="docs-wrapper">
                <div class="docs passport" v-if="activeTab === 'passport'">
                    <div class="text type">P</div>
                    <div class="text code">FORTIS</div>
                    <div class="text player-id">000000{{document.guid}}-{{document.id}}</div>
                    <div class="text name">{{document.n}}</div>
                    <div class="text surname">{{document.f}}</div>
                    <div class="text nationality">AMERICAN</div>
                    <div class="text birth">{{fixBirthDate(document.dateOfBirth)}}</div>
                    <div class="text place">CALIFORNIA</div>
                    <div class="text gender">{{document.gender === 0 ? "M" : "F"}}</div>
                    <div class="text authority">San Andreas <br> Departament of State</div>
                    <div class="passport-footer">
                        <div class="first">P&nbsp;<&nbsp;&nbsp;<div>Alaniettoricardo</div>&nbsp;&nbsp;<<&nbsp;<div>Fosterizadzedimio</div>&nbsp;&nbsp;<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<</div>
                        <div class="second"><span>000000{{document.guid}}-{{document.id}}</span><span>Fortis Role Play</span><span>F18120519007820&nbsp;&nbsp;<&nbsp;2020</span></div>
                    </div>
                </div>
                   
                <div class="docs gun" v-if="activeTab === 'weapon'">
                    <div class="text player-id">FR000000{{document.guid}}-{{document.id}}</div>
                    <div class="text type"><img src="/img/docs/pistol-icon.png" alt=""><img src="/img/docs/pp.icon.png" alt=""></div>
                    <div class="text med-id">MED000000{{document.guid}}-{{document.id}}</div>
                    <div class="text date-from">31/08/2019</div>
                    <div class="text date-to">30/09/2019</div>
                    <div class="text gender">{{document.gender === 0 ? "M" : "F"}}</div>
                    <div class="text name">{{document.n}}</div>
                    <div class="text surname">{{document.f}}</div>
                </div>

                <div class="docs med" v-if="activeTab === 'medic'">
                    <div class="text name"><span>{{document.n}}</span> <span>{{document.f}}</span></div>
                    <div class="text med-id">МED000000{{document.guid}}-{{document.id}}</div>
                    <div class="text date-to">30/09/2019</div>
                    <div class="text tel">112</div>
                    <div class="text addiction">НАРКОТИЧЕСКАЯ</div>
                    <div class="text disease">НЕТ</div>
                    <div class="text hasMed">ЕСТЬ</div>
                </div>

                <div class="docs hunt" v-if="activeTab === 'hunt'">
                    <div class="text name">{{document.n}}</div>
                    <div class="text surname">{{document.f}}</div>
                    <div class="text gender">{{document.gender === 0 ? "M" : "F"}}</div>
                    <div class="text date-from">31/08/2019</div>
                    <div class="text date-to">30/09/2019</div>
                    <div class="text hasGun">ЕСТЬ</div>
                    <div class="text hasMed">ЕСТЬ</div>
                    <div class="fishing">РАЗРЕШЕНО</div>
                    <div class="hunting">РАЗРЕШЕНО</div>
                </div>
            
                <div class="docs work" v-if="activeTab === 'work'">
                    <div class="text name">{{document.n}}</div>
                    <div class="text surname">{{document.f}}</div>
                    <div class="text gender">{{document.gender === 0 ? "M" : "F"}}</div>
                    <div class="work-wrap">
                        <div class="work-data">
                            <div class="data">Army</div>
                            <div class="data">Capral</div>
                            <div class="data">31/09/2019</div>
                            <div class="data">31/09/2020</div>
                        </div>
                        <div class="work-data">
                            <div class="data">EMS</div>
                            <div class="data">Doctor</div>
                            <div class="data">31/09/2019</div>
                            <div class="data">31/09/2020</div>
                        </div>
                    </div>
                </div>

                <div class="docs air-water" v-if="activeTab === 'aw'">
                    <div class="text name">{{document.n}}</div>
                    <div class="text surname">{{document.f}}</div>
                    <div class="text gender">{{document.gender === 0 ? "M" : "F"}}</div>
                    <div class="text birthday">{{fixBirthDate(document.dateOfBirth)}}</div>
                    <div class="text nationality">AMERICAN</div>
                    <div class="text med-insurance">ЕСТЬ</div>
                    <div class="text date-from">31/08/2019</div>
                    <div class="text date-to">30/09/2019</div>
                    <div class="text air center">НЕТ</div>
                    <div class="text water center">ЕСТЬ</div>
                </div>
                
                <div class="tabs">
                    <div class="tab" :class="{active: tab === 1}" @click="setTab('passport')">PAS</div>
                    <div class="tab" :class="{active: tab === 2}" @click="setTab('weapon')">GUN</div>
                    <div class="tab" :class="{active: tab === 3}" @click="setTab('medic')">MED</div>
                    <div class="tab" :class="{active: tab === 4}" @click="setTab('hunt')">F&H</div>
                    <div class="tab" :class="{active: tab === 5}" @click="setTab('work')">WOR</div>
                    <div class="tab" :class="{active: tab === 6}" @click="setTab('aw')">S&S</div>
                </div>
            </div>
        </div>
</template>

<script>

import { mapGetters } from "vuex";

export default{
    data(){
        return{
			test:'',
			timerId: null,
			activeTab: 'passport',
            tab: 1
        }
    },
	computed: {
			...mapGetters({
				document: "getShowDocument"
			})
		},
    methods:{
/*		decline(){
			storage.setShowDocument({});
			clearTimeout(this.timerId);
		},*/
		setTab(currentTab){
                switch(currentTab){
                    case 'aw': this.activeTab = 'aw';
                        this.tab = 6;
                        break;
                    case 'weapon': this.activeTab = 'weapon';
                        this.tab = 2;
                        break;
                    case 'medic': this.activeTab = 'medic';
                        this.tab = 3;
                        break;
                    case 'work': this.activeTab = 'work';
                        this.tab = 5;
                        break;
                    case 'hunt': this.activeTab = 'hunt';
                        this.tab = 4;
                        break;
                    default: this.activeTab = 'passport';
                        this.tab = 1;
                        break
                }
        },
        fixBirthDate: function (birth) {
            const day = birth.slice(0,2);
            const month = birth.slice(2,4);
            const year = birth.slice(4);
            return `${day}.${month}.${year}`;
        }, 
        exit() {
            mp.trigger("cPlayerStopWatchDocs", this.document.id, "passport");
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
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .wrapper{
        width: 100%;
        height: 100vh;
    }
    .docs-wrapper{
        position: relative;
        font-family: "arialbd";
        left: calc(50% - 615px / 2);
        height: 728px;
        width: 616px;
        top: calc(50% - 728px / 2);
    }
    .docs{
        position: absolute;
        left: calc(50% - 615px / 2);
        top: calc(50% - 728px / 2);
        height: 728px;
        width: 616px;
        z-index: 2;
        transition: .1s;
    }
    .text{
        text-transform: uppercase;
        position: absolute;
    }

    /* лицензии на водный и воздушный транспорт */
    .air-water{
        background: #fff url('/img/docs/air-water.png') no-repeat;
        background-size: cover;
    }
    .air-water .center{
        width: 80px;
        text-align: center;
    }
    .air-water .name{
        top: 57.4%;
        left: 9.5%;
    }
    .air-water .surname{
        top: 57.4%;
        left: 42%;
    }
    .air-water .gender{
        top: 57.4%;
        left: 69.5%;
    }
    .air-water .birthday{
        top: 62.3%;
        left: 23%;
    }
    .air-water .nationality{
        top: 67.7%;
        left: 23%;
    }
    .air-water .med-insurance{
        top: 73.2%;
        left: 23%;
    }
    .air-water .date-from{
        top: 78.6%;
        left: 23%;
    }
    .air-water .date-to{
        top: 83.7%;
        left: 23%;
    }
    .air-water .air{
        top: 71.3%;
        left: 79.1%;
    }
    .air-water .water{
        top: 78%;
        left: 79.1%;
    }

    /* лицуха на оружие */

    .gun{
        background: #fff url('/img/docs/weapon-bg.png') no-repeat;
        background-size: cover;
    }
    .gun .player-id{
        top: 64.6%;
        left: 45%;
    }
    .gun .type{
        top: 67%;
        left: 52%;
    }
    .gun .type img{
        margin-right: 10px;
    }
    .gun .med-id{
        top: 70.9%;
        left: 43.5%;
    }
    .gun .date-from{
        top: 74%;
        left: 43.5%;
    }
    .gun .date-to{
        top: 77.2%;
        left: 53%;
    }
    .gun .gender{
        top: 80.5%;
        left: 41%;
    }
    .gun .name{
        top: 83.55%;
        left: 41%;
    }
    .gun .surname{
        top: 86.7%;
        left: 47%;
    }
    /* лицуха на охоту и рыбалку */

    .hunt{
        background: #fff url('/img/docs/hunt.png') no-repeat;
        background-size: cover;
    }
    .hunt .text{
        left: 29%;
    }
    .hunt .name{
        top: 53.6%;
    }
    .hunt .surname{
        top: 57.5%
    }
    .hunt .gender{
        top: 61.6%
    }
    .hunt .date-from{
        top: 65.5%
    }
    .hunt .date-to{
        top: 69.8%
    }
    .hunt .hasGun{
        top: 74%
    }
    .hunt .hasMed{
        top: 78.5%
    }
    .hunt .fishing{
        position: absolute;
        top: 85.3%;
        left: 28%
    }
    .hunt .hunting{
        position: absolute;
        top: 85.3%;
        left: 76%
    }

    /* медстраховка */
    .med{
        background: #fff url('/img/docs/medics-bg.png') no-repeat;
        background-size: cover;
    }
    .med .name{
        top: 65.7%;
        left: 2.3%
    }
    .med .med-id{
        top: 73.5%;
        left: 2.3%
    }
    .med .date-to{
        top: 80.4%;
        left: 22%
    }
    .med .tel{
        top: 90%;
        left: 22%;
        font-size: 40px;
    }
    .med .addiction{
        top: 66.2%;
        left: 71%
    }
    .med .disease{
        top: 75.4%;
        left: 74%;
    }
    .med .hasMed{
        top: 85%;
        left: 74%;
    }
    /* passport */
    .passport{
        background: #fff url('/img/docs/passport.png') no-repeat;
        background-size: cover;
    }
    .passport .type{
        top: 57.5%;
        left: 45%
    }
    .passport .name{
        top: 63%;
        left: 39.1%;
    }
    .passport .surname{
        top: 68.9%;
        left: 39.1%
    }
    .passport .nationality{
        top: 74.3%;
        left: 39.1%;
    }
    .passport .birth{
        top: 80.7%;
        left: 39.1%
    }
    .passport .place{
        top: 87%;
        left: 39.1%
    }
    .passport .code{
        top: 57.5%;
        left: 58.5%;
    }
    .passport .player-id{
        top: 57.5%;
        left: 80%
    }
    .passport .gender{
        top: 68.6%;
        left: 85.6%
    }
    .passport .authority{
        top: 77%;
        left: 70%;
        text-align: center;
        text-transform: none;
    }
    .passport .passport-footer{
        font-family: "Bahnschrift";
        position: absolute;
        bottom: 0;
        font-size: 21px;
        color: rgba(27, 27, 30, 0.6);
        height: 68px;
        max-width: 615px;
        padding: 12px;
        padding-top: 10px;
    }
    .passport .passport-footer .first{
        display: flex;
        text-overflow: clip;
        white-space: nowrap;
        overflow: hidden;
    }
    .passport .passport-footer .second{
        display: flex;
        justify-content: space-between;
        padding-right: 50px;
    }
    /* трудовая */
    .work{
        background: #fff url('/img/docs/work-bg2.png') no-repeat;
        background-size: cover;
    }
    .work .name{
        top: 49.5%;
        left: 12%
    }
    .work .surname{
        top: 49.5%;
        left: 46%;
    }
    .work .gender{
        top: 49.5%;
        left: 76%;
    }

    .work .work-wrap{
        margin-top: 68.8%;
        overflow: auto;
        height: 240px;
    }
    .work .work-wrap::-webkit-scrollbar {
        width: 5px;
    }
    .work .work-wrap::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    .work .work-wrap::-webkit-scrollbar-thumb {
        background-color: rgba(49, 12, 214, 0.24);
    }
    .work .work-data{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5%;
        height: 9.2%;
    }
    .work .work-data .data{
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25%;
        line-height: 100%;
    }

    .tabs{
        position: absolute;
        height: 40px;
        left: 3.5%;
        bottom: -40px;
        display: flex;
        z-index: 1;
    }
    .tab{
        width: 95px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-family: "BookAntiqua";
        background: url('/img/docs/tab-bg.png') no-repeat;
        color: #000000;
        font-size: 21px;
        font-weight: 700;
        text-transform: uppercase;
        cursor: pointer;
        transition: 0.3s;
    }
    .tab:hover{
        background: url('/img/docs/current-tab-bg.png') no-repeat;
        margin-top: -2px;
    }
    .tab.active{
        margin-top: -4px;
        background: url('/img/docs/current-tab-bg.png') no-repeat;
    }
    @media (max-height: 1000px){
        .wrapper{
            transform: scale(0.9);
        }
    }
    @media (max-height: 900px){
        .wrapper{
            transform: scale(0.8);
        }
    }
    @media (max-height: 700px){
        .wrapper{
            transform: scale(0.7);
        }
    }
</style>