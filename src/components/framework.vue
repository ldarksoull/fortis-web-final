<template>
  <section class="framework" :class="slug" v-if="data">
    <div class="framework__data">
      <trend-chart
        :datasets="[dataset]"
        :min="0"
        padding="5 5 0"
        :interactive="true"
        @mouse-move="onMouseMove"
      ></trend-chart>
	  
		<div class="framework__period">
			<span class="framework__period-text">{{info.label}}</span> <div class="framework__downloads"> {{info.value}}</div>
		</div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
	periodText: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentInfo: null
    };
  },
  computed: {
    name() {
		return `${this.slug[0].toUpperCase() + this.slug.slice(1)}`;
    },
    weeklyDownloads() {
      return this.numberWithSpaces(this.data.reduce((a, c) => a + c.value, 0));
    },
    dataset() {
      return {
        data: this.data,
        showPoints: true,
        fill: true,
        className: `curve-${this.slug}`
      };
    },
    info() {
      return {
        label: this.currentInfo ? this.currentInfo.label + ' ' +this.periodText : "Сумма за период",
        value: this.currentInfo ? this.currentInfo.value + ' $' : this.weeklyDownloads + ' $'
      };
    }
  },
  methods: {
    numberWithSpaces(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    onMouseMove(params) {
      if (!params) {
        this.currentInfo = null;
        return;
      }
      this.currentInfo = {
        label: params.data[0].title,
        value: this.numberWithSpaces(params.data[0].value)
      };
    }
  }
};
</script>

