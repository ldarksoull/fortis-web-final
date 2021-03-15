<template>
    <div class="wrapper">
        <div class="fw center">
            <div class="license">
                <div class="header center">
                    SAN ANDREAS STATE
                </div>
                <div class="body">
                    <div class="title center">Driver's license</div>
                    <div class="number">2741253217</div>
                    <div class="flag">
                        <div class="flag-pic"><img src="/img/driver-license/flag.png" alt=""></div>
                        <div class="flag-num">8AJ120T521</div>
                    </div>
                    <div class="gerb2"></div>
                    <div class="main">
                        <div class="left center">
                            <div class="gerb center">
                                <img src="/img/driver-license/gerb.png" alt="">
                            </div>
                            <div class="sign center">
                                <img src="/img/driver-license/sign.png" alt="">
                            </div>
                        </div>
                        <div class="mid">
                            <div class="items">
                                <div class="item">
                                    <div class="item-name">Name</div>
                                    <div class="item-data">{{doc.n}}</div>
                                </div>
                                <div class="item">
                                    <div class="item-name">Surname</div>
                                    <div class="item-data">{{doc.f}}</div>
                                </div>
                                <div class="item">
                                    <div class="item-name">Date of Birth</div>
                                    <div class="item-data">{{fixBirthDate(doc.dateOfBirth)}}</div>
                                </div>
                                <div class="item">
                                    <div class="item-name">Sex</div>
                                    <div class="item-data">{{doc.gender === 0 ? "M" : "F"}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="items">
                                <div class="item" v-for="license in driverLicense">
                                    <div class="item-name">{{license.title}}</div>
                                    <div class="item-data" v-if="license.available">{{license.dateFrom}} - {{license.dateTo}}</div>
                                    <div class="item-data noData" v-else>Not Available</div>
                                </div>
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
    data() {
        return {
            licensList: ["A","B","C","C+E","D","L","V",],
        };
    },
    computed: {
        ...mapGetters({
            doc: "getShowDocument",
        }),
        driverLicense: function() {
            const allLicense = this.$store.getters.getShowLicense.filter(l => l.type === "driver");
            const final = [];
            this.licensList.forEach(title => {
                const license = allLicense.find(l => l.title === title);
                if (license) {
                    final.push({
                        available: true,
                        title: license.title,
                        dateFrom: this.formatDate(license.dateFrom),
                        dateTo: this.formatDate(license.dateTo),
                    })
                } else {
                    final.push({available: false, title: title})
                }
            })
            return final;
        }
    },
    methods: {
        fixBirthDate: function(birth) {
            const day = birth.slice(0, 2);
            const month = birth.slice(2, 4);
            const year = birth.slice(4);
            return `${day}.${month}.${year}`;
        },
        formatDate(dateStr) {
            let date = new Date(Date.parse(dateStr));
            let day = date.getDate();
            let month = date.getMonth() + 1;
            const year = date.getFullYear();
            if (day < 10) day = "0" + day;
            if (month < 10) month = "0" + month;
            return `${day}/${month}/${year}`;
        },
        exit() {
            mp.trigger("cPlayerStopWatchDocs", this.doc.id, "passport");
            mp.trigger("cSetPage", "none");
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
    .wrapper{
        width: 100%;
        height: 100vh;
    }
    .fw{
        width: 100%;
        height: 100%;
    }
    .center{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .license{
        width: 42.45vw;
        height: 22.4vw;
        overflow: hidden;
        border-radius: 0.52vw;
        background: url('/img/driver-license/main-bg.png') no-repeat;
        background-size: cover;
    }
    .header{
        background: #6c8ca7 url('/img/driver-license/header-bg.png') no-repeat;
        background-size: cover;
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 1.98vw;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 0.1px;
        width: 100%;
        height: 3.85vw;
    }
    .title{
        width: 100%;
        height: 3.63vw;
        color: #323232;
        font-family: "NewYorkNineteenSixty";
        font-size: 2.24vw;
        font-weight: 400;
    }
    .gerb{
        width: 8.85vw;
        height: 8.85vw;
        margin-bottom: 0.5vw;
    }
    img{
        max-width: 100%;
    }
    .left{
        margin-top: 0.8vw;
        width: 12.86vw;
        flex-direction: column;
    }
    .sign{
        width: 4.95vw;
    }
    .main{
        display: flex;
    }
    .body{
        position: relative;
    }
    .number{
        position: absolute;
        color: rgba(64, 64, 66, 0.87);
        font-family: "NewYorkNineteenSixty";
        font-size: 1.99vw;
        font-weight: 400;
        transform: rotate(90deg);
        right: -3vw;
        top: 43%;

    }
    .mid{
        width: 11vw;
        .item{
            margin-bottom: 0.7vw;
        }
        .item-name{
            color: #1065b2;
            font-family: "ParisNineteenSixty";
            font-size: 1.41vw;
            line-height: 1vw;
        }
        .item-data{
            color: #323232;
            font-family: "NewYorkNineteenSixty";
            font-size: 1.41vw;
        }
    }
    .right{
        margin-left: 1vw;
        margin-top: 1vw;
        .item{
            display: flex;
            margin-bottom: 0.2vw;
            align-items: center;
        }
        .item-name{
            color: #323232;
            font-family: "NewYorkNineteenSixty";
            font-size: 0.99vw;
            font-weight: 400;
            text-transform: uppercase;
            width: 2.6vw;
        }
        .item-data{
            color: #323232;
            font-family: "ParisNineteenSixty";
            font-size: 0.83vw;
            font-weight: 400;
            text-transform: uppercase;
            font-weight: bold;
            &.noData{
                color: #ec5c5c;
                text-transform: capitalize
            }
        }
    }
    .flag{
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        bottom: 0;
        right: 2.5vw
    }
    .flag-pic{
        width: 3.59vw;
    }
    .flag-num{
        color: #323232;
        font-family: "LondonNineteenSixty";
        font-size: 0.99vw;
        font-weight: bold;
    }
    .gerb2{
        position: absolute;
        background: url('/img/driver-license/gerb2.png') no-repeat;
        background-size: contain;
        width: 9.58vw;
        height: 9.58vw;
        bottom: -3.8vw;
        left: 4vw;
    }
</style>