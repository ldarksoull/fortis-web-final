<template>
    <div class="console-content scroll" id="console-content">
        <div class="log" v-for="(item, key) in logs" :key="key">
            <p class="text" :class="item.type">[{{ item.date }}] {{ item.msg }}</p>
            <p class="text-type" :class="item.type">[{{ item.type }}]</p>
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
            logs: "getAdminConsoleLogs",
        }),
    },
    mounted() {
        this.scrollToEnd();
    },
    watch: {
        logs: {
            async handler() {
                await this.$nextTick();
                this.scrollToEnd();
            },
            deep: true,
        },
    },
    methods: {
        scrollToEnd() {
            const container = document.querySelector("#console-content");
            container.scrollTop = container.scrollHeight + 1000;
        },
        onKeyUp: function(e) {
            /*DELETE*/
            if (e.keyCode === 46) {
                storage.setAdminConsoleLogs([]);
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
.console-content {
    background: #000000bf;
    color: #fff;
    font-family: Myriad Pro;
    font-size: 1vw;
    position: absolute;
    top: 0;
    width: 100vw;
    padding-bottom: 1vw;
    height: 45vh;
    box-sizing: unset;
    overflow-x: hidden;
    overflow-y: auto;
}

.log {
    margin: 0.5vw 1vw;
    display: flex;
    justify-content: space-between;
    border-left: 3px solid;
    border-bottom: 1px solid;
}
.text {
    white-space: pre-wrap;
}
.text-type {
    text-align: right;
    align-self: center;
    font-size: 1.5vw;
}

.text-type.CEF_info,
.text-type.CEF_warn,
.text-type.CEF_log {
    color: #00ffe1;
}
.CEF_error,
.CLIENT_error,
.SERVER_error {
    color: #e62929;
}

.console-content::-webkit-scrollbar {
    width: 6px;
}

.console-content::-webkit-scrollbar-thumb {
    border-width: 1px 1px 1px 2px;
    border-color: #196;
    background-color: #196;
}

.console-content::-webkit-scrollbar-thumb:hover {
    border-width: 1px 1px 1px 2px;
    border-color: #085;
    background-color: #085;
}

.console-content::-webkit-scrollbar-track:hover {
    border-left: solid 1px #222;
    background-color: #222;
}
</style>
