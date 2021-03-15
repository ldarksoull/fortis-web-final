<template >
<div class="chat" v-show="show">
		<div class="chat-field scroll" ref="chatMsg" :class="{invisible: !status}">
			<div v-for="(item,index) in chat" v-html="msgShow(item)" class="msg" :class="chanalsClass[item.tag]" ></div>
		</div>
		<div class="chat-input-wrapper" v-if="status">
                <input class="chat-input" type="text" placeholder="Сказать" ref="newMsg" v-model.trim='msg' @focus="isFocus = true" @blur="isFocus = false"/>
        </div>
		<div class="chat-options" v-if="status">
				<div class="chat-options-item" :class="isActive(index)" v-for="(item,index) in channels" :key='index' @click="selectChanal(index)">{{item}}</div>
        </div>
	</div>
</template>

<script>

import { mapGetters } from "vuex";

export default{
    data(){
        return{
			msg:'',
			isFocus: false,
			chanalsClass:['say','ooc','me','do','try','global', 'globalPenalty', 'adminPM'],
			commandClass:['say','ooc','me','do','try'],
        }
    },
	computed: {
			...mapGetters({
				chat: "getChat",
				status: "getChatActive",
				show: "getChatShow",
				selectChannel: "getSelectChannel",
				channels: "getChatCannels",
			})
	},
    methods:{
    	onKeyDwon(e) {
    		/*отмена выделения на CTRL+A*/
			if (e.ctrlKey && e.keyCode == 65) e.preventDefault();
    	},
		onKeyUp(e) {
			//alert('show - '+show);
			if(!this.show) return;
			/*keyT*/
			if( e.keyCode === 84){
				if(!this.status){
					storage.setChatActive(true);
					setTimeout(this.setFocus, 200);
					mp.trigger("cBlockControl", true);
					mp.trigger("cShowCursor", true);
				}else{
					if(!this.isFocus){ 
						storage.setChatActive(false);
						mp.trigger("cBlockControl", false);
						mp.trigger("cShowCursor", false);
					}
				}
			}
			/*tab*/
			if( e.keyCode === 9){
				if(this.status){
					this.switchChanal();
					setTimeout(this.setFocus, 200);
				}
			}
			/*enter*/
			if( e.keyCode === 13){
				if(this.status){
					this.sendMsg();
				}
			}
			/*up*/
			if( e.keyCode === 38){
				if(this.status){
				
				}
			}
			/*down*/
			if( e.keyCode === 40){
				if(this.status){
				
				}
			}
		},
		sendMsg(){
			let tag = this.selectChannel;
			let msg = this.msg;
			if (this.msg[0] === "/") {
				const msgArr = this.msg.split(" ");
				const channel = msgArr[0].slice(1);
				const channelIndex = this.commandClass.findIndex(c => c === channel);
				if (channelIndex !== -1) {
					tag = channelIndex;
					msg = msgArr.splice(1).join(" ");
				}
			}
			if(msg != ''){
				var sendData = { tag, msg };
				mp.trigger("cMisc-CallServerEvent", "playerSayChat", JSON.stringify(sendData));
			}
			this.msg = '';
			storage.setChatActive(false);
			mp.trigger("cBlockControl", false);
			mp.trigger("cShowCursor", false);
		},
		msgShow(msg){
			//сказал
			if(msg.tag === 0 ){
				return '[SAY] <b>'+msg.name+'('+msg.playerId+')'+'</b>: '+msg.msg;
			}
			//ooc
			if(msg.tag === 1 ){
				return '[OOC] <b>'+msg.name+'('+msg.playerId+')'+'</b>: '+msg.msg;
			}
			//me
			if(msg.tag === 2 ){
				return '[ME] <b>'+msg.name+'('+msg.playerId+')'+'</b>: '+msg.msg;
			}
			//do
			if(msg.tag === 3 ){
				return '[DO] '+msg.msg+' [<b>'+msg.name+'</b>]'+'('+msg.playerId+')';
			}
			//try
			if(msg.tag === 4 ){
				if(msg.value === 0) var result = ' <span class="no">{ПРОВАЛ}</span>';
				else var result = ' <span class="yes">{УСПЕХ}</span>';
				return '[TRY] <b>'+msg.name+'('+msg.playerId+')'+'</b> - '+msg.msg+result;
			}
			if(msg.tag === 5 ){
				return '[GLOBAL] <b>'+msg.name+'</b>: '+msg.msg;
			}
			if(msg.tag === 6 ){
				return '[GLOBAL] '+msg.msg;
			}
			if(msg.tag === 7 ){
				return '[ADMIN] <b>'+msg.name+'</b>: '+msg.msg;
			}
		},
		setFocus(){
		  this.$refs.newMsg.focus();
		},
		switchChanal(){
			var newChannel = this.selectChannel + 1;
			if(newChannel === Object.keys(this.channels).length){
				newChannel = 0 ;
			}
			storage.setChatSelectChannel(newChannel);
		},
		selectChanal(id){
			if(this.channels[id]){
				storage.setChatSelectChannel(id);
			}
		},
		isActive(id){
			if(this.selectChannel === id) return 'active';
		},
		scrollToEnd(){ 
				if (!this.show) return;	
				const container = this.$refs["chatMsg"]
				container.scrollTop = container.scrollHeight;
		},
    },
	watch: {
		chat: {
			handler() {
				setTimeout(this.scrollToEnd, 100);
			},
			deep: true, //если нужно отслеживать изменение свойств
		},
		show: {
			handler(value) {
				if (value) setTimeout(this.scrollToEnd, 100);
			},
			deep: true, //если нужно отслеживать изменение свойств
		}
	},
	created() {
		document.addEventListener('keyup', this.onKeyUp);
		document.addEventListener('keydown', this.onKeyDwon);
	},
	mounted() {
		this.scrollToEnd();
	},
 
}

</script>

<style scoped>
.chat-field{
        width: 700px;
        height: 181px;
        /*
		box-shadow: 5px 8px 40px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #00294e; 
        background-image: linear-gradient(to top, #0a2f4d 43%, #0d2b48 51%, rgba(30, 19, 39, 0) 100%);
		*/
        /*opacity: 0.38;*/
        resize: none;
        outline: none;
        border: none;
        display: block;
        /*margin-bottom: 16px;*/
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8), 0 0 0 rgba(0, 0, 0, 0.28);
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.07px;
        margin-bottom: 10px;
        overflow: auto;
    }
    .chat-input{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: rgba(0, 42, 78, 0.945);
        border: none;
        outline: none;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: 400;
        padding-left: 10px;
        margin-bottom: 10px
    }
    .chat-input::placeholder{
        color: rgba(255, 255, 255, 0.466);
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: 400;
    }
    .chat-input-wrapper{
        position: relative;
        display: block;
        width: 700px;
        height: 35px;
        margin-bottom: 10px;
    }
    .chat-icon{
        display: flex;
        position: absolute;
        content: '';
        background: url('/img/hud/chat_icon.png') no-repeat;
        background-position: center 55%;
        right: 0;
        top: 0;
        z-index: 11;
        width: 35px;
        height: 35px;
        margin-right: 5px;
    }
    .chat-options{
        display: flex;
        width: 300px;
    }
    .chat-options-item{
        width: 55px;
        height: 14px;
        border-radius: 7px;
        background-color: #00294e;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 11px;
        font-weight: 400;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
    }
    .chat-options-item.active{
        background-color: #1662c1;
    }

.chat-content div >>> b{
	font-weight: bold;
}
.chat {
	padding: 15px;
}
.chat .msg {
	/*opacity: 0.4;*/
	margin: 3px 0;
}

.chat .say {
    color: #fff;
}

.chat .ooc {
    color: #205fd6;
}

.chat .me {
    color: #71dde1;
}

.chat .do {
    color: #71dde1;
}

.chat .try {
    color: #f0d2f4;
}

.chat .global {
    color: #FF0000;
    opacity: 1;
    font-weight: bold;
}
.chat .globalPenalty {
    color: #FF0000;
    opacity: 1;
}
.chat .adminPM {
    color: #F2FF00;
    opacity: 1;
}

.try >>> .yes{
	color: green;
}

.try >>> .no{
	color: red;
}

.chat-field::-webkit-scrollbar {
    width: 5px;
}
 
.chat-field::-webkit-scrollbar-track {
    background-color: transparent;
    background-repeat: repeat-x;
    background-attachment: fixed; 
    position: absolute;
    padding: 1px;
}
 
.chat-field::-webkit-scrollbar-thumb {
    top: 2px;
    background-color: #456293;
    background-repeat: repeat-y;
    border-radius: 3px;
}
.invisible::-webkit-scrollbar-thumb {
	background-color: #45629300;
}
</style>