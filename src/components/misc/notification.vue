<template>
    <div>
        <div class="notify-wrapper">
        <transition-group name="list" tag="p">
            <div v-for="item in notifications" :key="item.id" :class="[item.theme]" class="notify">{{ item.text }}</div>
        </transition-group>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default{
	computed: {
			...mapGetters({
				notifications: "notificationsList"
			})
		},
    methods:{
    },
}
</script>

<style scoped>
.notify-wrapper{
    position: absolute;
    left: 0;
    bottom: 20vh;
    display: flex;
    flex-flow: column-reverse;
}
.notify{
    font-family: 'Century Gothic';
    position: relative;
    z-index: 9999;
    margin: 15px 0;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: #fff;
    opacity: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.38);
    background-color: rgba(8, 34, 75, 0.815);
    animation-name: error;
    animation-duration: 10000ms;
}
.notify::after{
    content: '';
    right: -26px;
    position: absolute;
    background-position: 0 0;
    background-size: cover;
    width: 53px;
    height: 100px;
}
.notify.error::after{
    background: url('/img/light-red.png') no-repeat;
}
.notify.success::after{
    background: url('/img/light-green.png') no-repeat;
}
.notify.info::after{
    background: url('/img/light-orange.png') no-repeat;
}
@keyframes error{
    0%{
        opacity: 1;
        transform: translateX(-100%)
    }
    5%, 99%{
        transform: translateX(0%);
    }
    95%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}
</style>
