<template>
	<!--<div class="confDialog">
		<div>{{dialog.title}}</div>
		<div class="accept" @click="accept()">Подтвердить</div>
		<div class="decline" @click="decline()">Отклонить</div>
	</div>-->
	<!-- <div class="wrapper"> -->
		<div class="alert">
					<div class="alert-text">{{dialog.title}}</div>
					<div class="alert-action">
						<div class="alert-btn btn-ok" @click="accept()">Да [Y]</div>
						<div class="alert-btn btn-no" @click="decline()">Нет [N]</div>
					</div>
		</div>
    <!-- </div> -->
</template>

<script>

import { mapGetters } from "vuex";

export default{
    data(){
        return{
			test:'',
        }
    },
	computed: {
			...mapGetters({
				dialog: "getDialog"
			})
		},
    methods:{
		accept(){
			storage.setDialog({});
			mp.trigger("cMisc-CallServerEvent", "sPlayerDialogAccept");
		},
		decline(){
			storage.setDialog({});
			mp.trigger("cMisc-CallServerEvent", "sPlayerDialogDecline");
		},
		onKeyUp(e) {
			if( e.keyCode === 89){
				this.accept();
			}
			
			if( e.keyCode === 78 || e.keyCode === 27){
				this.decline();
			}
		}
    },
	mounted() {
	},
	created() {
		document.addEventListener('keyup', this.onKeyUp);
	},
    beforeDestroy() {
		document.removeEventListener('keyup',this.onKeyUp);
	}
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


.alert{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    z-index: 1111;
    width: 25vw;
    box-shadow: 0 0.5vw 2vw rgba(0, 0, 0, 0.38);
    border-radius: 0.52vw;
    background-color: rgba(14, 42, 90, 0.897);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.alert-text{
    padding: 2vw 1vw;
    text-align: center;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 1.09vw;
    font-weight: 400;
}
.alert-action{
    display: flex;
}
.alert-btn{
    width: 50%;
    padding: 1vw;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 1.09vw;
    font-weight: 400;
    transition: 0.15s;
}
.btn-ok{
    background: rgba(0, 126, 8, 0.7);
}
.btn-ok:hover{
    background: rgb(0, 126, 9);
}
.btn-no{
    background: rgba(197, 1, 1, 0.7);
}
.btn-no:hover{
    background: rgba(197, 1, 1);
}
</style>