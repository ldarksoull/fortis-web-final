<template>
    <div class="wrapper">
        <div class="certificate fbi">
            <div class="left">
                <div class="certificate-fulltitle">Los Santos News</div>
                <div class="certificate-title">
                    <div class="title-badge center"><img src="/img/certificates/badge-lsn.png" alt=""></div>
                    <div class="title-text">LSN</div>
                    <div class="title-badge center"><img src="/img/certificates/badge-lsn.png" alt=""></div>
                </div>
                <div class="certificate-data">
                    <div class="row">
                        <div class="item">
                            <div class="item-name">Name</div>
                            <div class="item-text">{{doc.n}}</div>
                        </div>
                        <div class="item ml">
                            <div class="item-name">Position</div>
                            <div class="item-text">{{doc.rank}}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="item">
                            <div class="item-name">Surname</div>
                            <div class="item-text">{{doc.f}}</div>
                        </div>
                        <div class="row sign">
                            <div class="item-name">Dir. LSN</div>
                            <div class="item-sign">
                                <div class="fbi-sign-icon"><img src="/img/certificates/sign-lsn.png" alt=""></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="container">
                    <div class="main-badge">
                        <div class="pass">journalist pass</div>
                        <div class="title-text">LSN</div>
                        <div class="row sign">
                            <div class="item-name">Dir. LSN</div>
                            <div class="item-sign">
                                <div class="fbi-sign-icon"><img src="/img/certificates/sign-lsn.png" alt=""></div>
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
    data(){
        return{
            
        }
    },
    computed: {
        ...mapGetters({
            doc: "getShowDocument"
        })
    },
    methods: {
        exit() {
            mp.trigger("cPlayerStopWatchDocs", this.doc.id, "factionDoc");
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
.wrapper{
	width: 100%;
	height: 100vh;
}
img{
    max-width: 100%;
}
.row{
    display: flex;
    margin-top: 0.5vw;
}
.certificate{
    width: 62.97vw;
    height: 21.41vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url('/img/certificates/certificate.png');
    background-size: 100%;
    position: relative;
}
.left{
    position: absolute;
    top: 2.12vw;
    left: 2.52vw;
    width: 25.21vw;
    height: 16.67vw;
    padding: 0.89vw 0.8vw;
}
.certificate-fulltitle{
    color: #f1a835;
    font-size: 1.40vw;
    font-weight: 400;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    font-family: "LondonNineteenSixty";
}
.certificate-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.4vw;
    margin-bottom: 1.3vw;
}
.fbi .title-badge{
    width: 5.21vw;
    height: 5.21vw;
}
.title-text{
    flex-grow: 2;
    text-align: center;
    color: #f1a835;
    font-size: 5.26vw;
    line-height: 5.26vw;
    font-weight: 700;
    text-transform: uppercase;
    font-family: "NewYorkNineteenSixty";
}
.item{
    min-width: 10vw;
}
.ml{
    /*margin-left: 0.5vw;*/
}
.item-name{
    color: #f1a835;
    font-size: 1.41vw;
    font-weight: 400;
    font-family: "ParisNineteenSixty";
    line-height: 1.4vw
}
.item-text{
    color: #f1a835;
    font-size: 1.41vw;
    font-weight: 400;
    font-family: "NewYorkNineteenSixty";
    line-height: 1.4vw
}
.fbi .sign{
    align-items: flex-end;
    /*justify-content: flex-end;*/
    width: 100%;
    padding-right: 1vw;
}
.item-sign{
    width: 6.2vw;
    margin-bottom: 0.2vw;
    margin-left: 0.2vw;
    border-bottom: 1px solid #f1a835;
    position: relative;
}
.fbi-sign-icon{
    position: absolute;
    bottom: -0.7vw;
    right: -1vw;
    width: 6.41vw;
}
.right{
    position: absolute;
    right: 0;
    top: 0;
    width: 48%;
    height: 100%;
}
.right .container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fbi .main-badge{
    width: 80%;
    height: 90%;
    background: url('/img/certificates/badge-lsn-big.png') no-repeat;
    background-size: contain;
    background-position: center;
    padding-top: 17%;
}
.pass{
    width: 100%;
    text-align: center;
    color: #f1a835;
    font-family: "NewYorkNineteenSixty";
    font-size: 2.34vw;
    font-weight: 400;
    text-transform: uppercase;
}
.main-badge .sign{
    justify-content: flex-start;
    margin-top: 2vw;
    padding-left: 1vw;
}
.center{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
    