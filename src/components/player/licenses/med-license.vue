<template>
    <div class="wrapper">
        <div class="card-wrapper">
            <div class="card">
                <div class="body">
                    <div class="block">
                        <div class="col">
                            <div class="row">
                                <div class="title">Name</div>
                                <div class="text">{{doc.n}}</div>
                            </div>
                            <div class="row">
                                <div class="title">Surname</div>
                                <div class="text">{{doc.f}}</div>
                            </div>
                            <div class="row">
                                <div class="title">Date of Birth</div>
                                <div class="text">{{fixBirthDate(doc.dateOfBirth)}}</div>
                            </div>
                        </div>
                        <div class="col col-2">
                            <div class="row">
                                <div class="title">Illness</div>
                                <div class="text">None</div>
                            </div>
                            <div class="row">
                                <div class="title">Date of issue</div>
                                <div class="text">{{formatDate(medLicense[0].dateFrom)}}</div>
                            </div>
                            <div class="row">
                                <div class="title">Expiration date</div>
                                <div class="text">{{formatDate(medLicense[0].dateTo)}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="block">
                        <div class="col">
                            <div class="row">
                                <div class="title">Doctor</div>
                                <div class="text">{{medLicense[0].licensor}}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="sign"><img src="/img/licenses/sign-med.png" alt=""></div>
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
            doc: "getShowDocument",
        }),
        medLicense: function() {
            const license = this.$store.getters.getShowLicense.filter(l => l.type === "med");
            return license;
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
<style scoped>
.wrapper{
    width: 100%;
    height: 100vh;
}
img{
    max-width: 100%;
}
.card-wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}   
.card{
    width: 42.45vw;
    height: 22.4vw;
    background: url('/img/licenses/medlicense-bg.png');
    background-size: cover;
    position: relative;
    border-radius: 0.52vw;
    overflow: hidden;
    font-family: "Century Gothic";
}
.body{
    margin-top: 4.8vw;
    margin-left: 4vw;
}
.block{
    display: flex;
}
.row{
    margin-bottom: 0.5vw;
}
.col-2{
    margin-left: 1.5vw;
}
.title{
    color: #e94747;
    font-size: 1.41vw;
    font-weight: 400;
    line-height: 1.4vw;
}
.text{
    color: #1065b2;
    font-size: 1.41vw;
    font-weight: 700;
    line-height: 1.4vw;
}
.sign{
    position: absolute;
    bottom: 3.3vw;
    width: 10.63vw;
    left: 17vw
}
</style>
