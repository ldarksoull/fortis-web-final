<template>
	<div class="testHud">
		<div>Скорость: {{data.speed}} км.ч</div>
		<div>Обороты: {{data.rpm}}</div>
		<div>Передача: {{data.gear}}</div>
		<div>Бак: {{data.fuel}} л.</div>
		<div>Расход/паспорт: {{data.fuelRate}} л/10мин</div>
		<div>Расход/факт.: {{data.fuelRateCalc}} л/10мин</div>
		<div>Расход/цикл.: {{data.fuelRateCicle}}</div>
		<div>Потрачено: {{data.fuelSum}} л.</div>
		<div>Пробег: {{data.km}} км.</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
		...mapGetters({
				data: "getVehSpeedData",
			}),
	},
    methods: {
    },
	mounted() {
	},
    components:{
    },
}

</script>

<style scoped>
.testHud{
	position:absolute;
	top: 60vh;
	left: 0vw;
	background-color: rgba(0, 0, 0, 0.8);
	color: #fff;
	width: 30vh;
	padding: 10px;
}
</style>