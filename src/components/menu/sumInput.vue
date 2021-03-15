<template>
    <div class="wrapper">
        <div class="modal">
            <div class="modal-header">
                {{sellingData.notice}}
            </div>
            <div class="modal-input-wrap">
                <input type="number" class="modal-input" v-model.number="price" />
            </div>
            <div class="modal-footer">
                <div class="modal-btn" @click="sell">Продолжить</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            price: "",
        };
    },
    computed: {
        ...mapGetters({
            sellingData: "getSellingData",
        }),
    },
    methods: {
        sell() {
            if (this.price <= 0 || this.price >= Number.MAX_SAFE_INTEGER) return;
            const data = {
                id: this.sellingData.id,
                buyerGuid: this.sellingData.buyerGuid,
                notice: this.sellingData.notice,
                price: this.price,
            };
            mp.trigger("cMisc-CallServerEvent", this.sellingData.func, JSON.stringify(data));
            this.exit();
        },
        exit: function() {
            mp.trigger("cSetPage", "none");
        },
        onKeyUp(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
    },
    mounted() {
        document.addEventListener("keyup", this.onKeyUp);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyUp);
    },
};
</script>
<style scoped lang="scss">
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal {
    width: 37.71vw;
    height: 12.81vw;
    background: #306fcd;
    border-radius: 0.52vw;
    overflow: hidden;
    &-header {
        width: 100%;
        height: 2.81vw;
        font-family: "Century Gothic";
        font-size: 1.88vw;
        color: #fffbfb;
        text-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
        background: #304666;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-input-wrap {
        width: 100%;
        padding: 0 3.39vw;
        margin: 1.77vw 0;
    }
    &-input {
        width: 100%;
        height: 2.66vw;
        background: #314767;
        border-radius: 0.26vw;
        text-align: center;
        font-family: "Century Gothic";
        font-size: 1.88vw;
        color: #fffbfb;
        border: none;
    }
    &-footer {
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
    &-btn {
        background: linear-gradient(180deg, rgba(119, 174, 255, 0.5) 0%, rgba(66, 141, 254, 0.5) 24.81%), #418dff;
        box-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
        border-radius: 0.26vw;
        font-family: "Century Gothic";
        font-size: 1.56vw;
        color: #fffbfb;
        padding: 0.26vw 1.56vw;
        display: inline-block;
        transition: box-shadow 0.1s;
        &:hover {
            box-shadow: 0px 0.1vw 0.1vw rgba(0, 0, 0, 0.25), inset 0 2.08vw 2.08vw rgba(0, 0, 0, 0.05);
        }
        &:active {
            box-shadow: 0px 0.1vw 0.1vw rgba(0, 0, 0, 0.25), inset 0 2.08vw 2.08vw rgba(0, 0, 0, 0.15);
        }
    }
}
</style>
