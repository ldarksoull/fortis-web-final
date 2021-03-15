<template>
    <div class="consoleBlock" @click="hideContext()">
		<div class="report_menu" v-show="contextMenu.show" ref="contextMenu">
			<div class="menu-item" @click="tpToPlayer()">Телепортироваться</div>
			<div class="menu-item" @click="tpPlayerToAdmin()">Телепортировать к себе</div>
            <div class="menu-item" @click="getPlayerId()">Узнать ID</div>
			<div class="menu-item" @click="takeTicket()" v-if="contextMenu.takeTicket">Закрепить за собой</div>
			<div class="menu-item" @click="closeTicket()" v-if="contextMenu.closeTicket">Закрыть тикет</div>
		</div>
        <div id="console">
			<div class="console-content scroll" id="console-content">
				<div class="log">
					<p>Консоль сервера Fortis RolePlay!<br />
						help - список команд<br />
						help level - список команд по уровню<br />
						help name - описание команды<br />
					</p>
				</div>
				<div v-for="(item,key) in logs" :key="key" :class="[item.type]"><p v-html="item.msg"></p></div>
			</div>
			<div class="console-admin" id="console-admin">
				<div class="admin-open" v-on:click="openAdmin">Admin<span class="count"></span></div>
				<div class="selector" v-if="adminMenu">
					<!-- <span class="select-chat">Чат<span class="count"></span></span> -->
					<span class="select-report active" @click="adminReport = !adminReport">Репорт<span class="count"></span></span>
					<!-- <span class="select-anticheat">Анти-чит<span class="count"></span></span> -->
				</div>
				<div class="console-chat"  v-if="adminChat">
					<div class="chat-content scroll">
						<!-- <div class="chat"><p>[10 lvl] Carter Slade [999]: Hello, World!</p></div> -->
					</div>
					<div class="chat-bottom">
						<input type="text" placeholder="message..." />
					</div>
				</div>
				<div class="console-report"  v-if="adminReport">
					<div class="report-list scroll">
						<!-- <input type="text" placeholder="nickname" readonly /> -->
						<div class="content scroll">
							<!-- <div class="empty">Можно отдохнуть</div> -->
							<div class="ticket-title scroll" 
								@click="selectTicket(ticket.id)"
								:class="{selected: ticket.id === selectedTicketId}"
								@contextmenu.prevent="showContext(ticket, $event)"
								v-for="ticket in ticketList">{{ticket.playerName}} | {{ticket.ticketName}} | {{ticket.lastDate | formatDate}}
							</div>
						</div>
					</div>
					<div class="report-dialog scroll">
						<div class="selector">
							<span class="select-all" :class="{active: ticketFilter === 'ALL'}" @click="changeTicketFilter('ALL')">Все</span>
							<!-- <span class="select-claim">Жалобы</span>
							<span class="select-help">Вопросы</span> -->
							<span class="select-my" :class="{active: ticketFilter === 'MY'}" @click="changeTicketFilter('MY')">Мои</span>
							<span class="select-busy" :class="{active: ticketFilter === 'FREE'}" @click="changeTicketFilter('FREE')">Свободные</span>
							<span class="select-busy" :class="{active: ticketFilter === 'BUSY'}" @click="changeTicketFilter('BUSY')">Занятые</span>
                            <span class="select-busy" :class="{active: ticketFilter === 'CLOSED'}" @click="changeTicketFilter('CLOSED')">Закрытые</span>
						</div>
						<div class="dialog-messages scroll" ref="chatField">
							<div class="empty" v-if="!selectedTicketId">Откройте тикет</div>
                            <div class="empty" v-if="!selectedTicketMessages.length">Идет загрузка сообщений...</div>
							<div class="msg-wrapper" :class="getMsgClass(message.from)" v-for="message in selectedTicketMessages">
                                <div class="msg">{{message.msg}}</div>
                                <div class="msg-date"><div class="time">{{message.time}}</div><div class="date">{{message.date}}</div></div>
                            </div>

						</div>

						<div v-if="ticketClosed()" class="ticket-input-error">Этот тикет закрыт</div>
						<input v-else-if="ticketAcces()" type="text" placeholder="message" v-model.trim="messageInput" maxlength="300" @keydown.enter="sendMsg()"/>
						<div class="ticket-input-error" v-else>Этот тикет закреплен за другим администратором</div>
					</div>
				</div>
			</div>
			<div class="console-bottom" id="console-bottom">
				<input type="text" placeholder="type command..." 
					ref="commandInput"
					v-on:keyup.enter="submitCommand"
					v-on:keyup.up="historyUp"
					v-on:keyup.down="historyDown"
					v-model.trim='command' />
			</div>
		</div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default{
	data(){
        return{
            adminMenu: false,
			adminChat: false,
			adminReport: true,
			historySelect: -1,
			command: '',
			selectedTicketId: false,
			messageInput: '',
			ticketFilter: 'ALL',
			contextMenu: {
				show: false,
				takeTicket: false,
				closeTicket: false,
			},
            selectedTicketMessages: [],
        }
    },
	computed: {
			...mapGetters({
				logs: "consoleData",
				history: "historyData",
				playerGuid: "getGUID",
                ticketMessages: "getTicketMessages",
                closedTickets: "getClosedTickets",
			}),
			ticketList: function () {
				const allTicket = this.$store.getters.getAdminTicketList;
				switch (this.ticketFilter) {
					case "ALL":
						return allTicket.filter(t => !t.isClosed);;
					case "MY":
						return allTicket.filter(t => t.adminGuid === this.playerGuid);
					case "FREE":
						return allTicket.filter(t => t.adminGuid === 0 && !t.isClosed);
					case "BUSY":
						return allTicket.filter(t => t.adminGuid !== 0 && !t.isClosed);
                    case "CLOSED":
                        return this.closedTickets;
					default:
						return allTicket
						break;
				}
			}
	},
	mounted() {
			this.scrollToEnd();
			this.setFocus();
	},
	watch: {
		logs: {
			handler() {
				setTimeout(this.scrollToEnd, 100);
			},
			deep: true, //если нужно отслеживать изменение свойств
		},
        selectedTicketId: function() {
            if (!this.selectedTicketId) return this.selectedTicketMessages = [];
            this.selectedTicketMessages = this.ticketList.find(t => t.id === this.selectedTicketId).messagesList || [];
            setTimeout(()=>{ this.$refs.chatField.scrollTop = this.$refs.chatField.scrollHeight }, 100);
        },
        ticketMessages: function() {
            if (!this.selectedTicketId) return this.selectedTicketMessages = [];
            this.selectedTicketMessages = this.ticketList.find(t => t.id === this.selectedTicketId).messagesList || [];
            setTimeout(()=>{ this.$refs.chatField.scrollTop = this.$refs.chatField.scrollHeight }, 100);
        }
	},
    methods:{
		openAdmin(){
			if(this.adminMenu){
				this.adminMenu = false;
				var contentAdmin = document.getElementById('console-admin');
				var contentConsole = document.getElementById('console-content');
				var contentBottom = document.getElementById('console-bottom');
				contentConsole.style.width = "95.7%";
				contentBottom.style.width = "95.7%";
				contentAdmin.style.right = "-50%";
				
			}else{
				this.adminMenu = true;
				var contentAdmin = document.getElementById('console-admin');
				var contentConsole = document.getElementById('console-content');
				var contentBottom = document.getElementById('console-bottom');
				contentConsole.style.width = "45%";
				contentBottom.style.width = "45%";
				contentAdmin.style.right = "0";
			}
			
		},
		submitCommand(){
			mp.trigger("cMisc-CallServerEvent", "sConsole-Command",this.command);
			storage.historyPush(this.command);
			this.historySelect = -1;
			this.command = '';
		},
		historyUp(){
			if(this.historySelect === -1){
				this.historySelect = this.history.length - 1;
			}else{
				this.historySelect = this.historySelect-1;
				if(this.historySelect<0){
					this.historySelect = -1;
					this.command = '';
				}
			}
			
			this.command = this.history[this.historySelect];
		},
		historyDown(){
			if(this.historySelect === -1){
				this.historySelect = 0;
			}else{
				this.historySelect = this.historySelect+1;
				if(this.historySelect<0){
					this.historySelect = -1;
					this.command = '';
				}
			}
			
			this.command = this.history[this.historySelect];
		},
		scrollToEnd(){ 	
				var container = this.$el.querySelector("#console-content");
				container.scrollTop = 999999999999999999;
		},
		setFocus(){
		  this.$refs.commandInput.focus();
		},
		getLastMessageTime(messages){
			const lastMessage = messages[messages.length - 1];
			return lastMessage.time + ' ' + lastMessage.date;
		},
		getMsgClass: function (from) {
            if (from === "admin") {
                return "incoming-msg"
            } else {
                return "self-msg"
            }
        },
        sendMsg: function() {
            if (!this.messageInput) return;
            if (!this.selectedTicketId) return
	        const message = {
	            messageData: { from: "admin", msg: this.messageInput, date: this.$store.getters.getDate, time: this.$store.getters.getTime },
	            id: this.selectedTicketId,
	        };
	        storage.pushAdminMessage(message);
            mp.trigger("cMisc-CallServerEvent", "sReportPushMessage", JSON.stringify(message));
            this.messageInput = "";
            setTimeout(()=>{ this.$refs.chatField.scrollTop = this.$refs.chatField.scrollHeight }, 0);
        },
        selectTicket:function(id) {
            if (this.selectedTicketId === id) return;
        	this.selectedTicketId = id;
            mp.trigger("cMisc-CallServerEvent", "sReportGetTicketMessages", id);
        	setTimeout(()=>{ this.$refs.chatField.scrollTop = this.$refs.chatField.scrollHeight }, 0);
        },
        ticketAcces: function () {
        	if (!this.selectedTicketId) return true;
        	const ticket = this.ticketList.find(t => t.id === this.selectedTicketId)
        	if (ticket.adminGuid === 0) return true;
        	if (this.playerGuid === ticket.adminGuid) return true;
        },
        ticketClosed: function () {
        	if (!this.selectedTicketId) return false;
        	const ticket = this.ticketList.find(t => t.id === this.selectedTicketId)
            if (!ticket) return true;
        	if (ticket.isClosed) return true;
        },
        changeTicketFilter: function (filter) {
            if (filter === "CLOSED") mp.trigger("cMisc-CallServerEvent", "sReportGetClosedTickets");
        	this.selectedTicketId = false;
        	this.ticketFilter = filter;
        },
        showContext: function (ticket, event) {
        	this.contextMenu.show = true;
        	this.contextMenu.ticket = ticket;
        	this.contextMenu.takeTicket = false;
        	this.contextMenu.closeTicket = false;

        	const contextMenu = this.$refs.contextMenu;
        	contextMenu.style.top = event.clientY+'px';
        	contextMenu.style.left = event.clientX+'px';

        	if (ticket.isClosed === 0) {
                this.contextMenu.closeTicket = true;
                this.contextMenu.takeTicket = true;
            }
        },
        hideContext: function () {
        	this.contextMenu.show = false;
        	this.contextMenu.ticket = false;
        	this.contextMenu.takeTicket = false;
        	this.contextMenu.closeTicket = false;
        },
        takeTicket: function () {
        	mp.trigger("cMisc-CallServerEvent", "sReportTakeTicket", this.contextMenu.ticket.id);
        },
        closeTicket: function () {
            this.selectedTicketMessages = [];
            this.selectedTicketId = false;
        	mp.trigger("cMisc-CallServerEvent", "sReportCloseTicket", this.contextMenu.ticket.id);
        },
        tpToPlayer: function () {
        	mp.trigger("cMisc-CallServerEvent", "sReportTpToPlayer", this.contextMenu.ticket.id);
        },
        tpPlayerToAdmin: function () {
        	mp.trigger("cMisc-CallServerEvent", "sReportTpPlayerToAdmin", this.contextMenu.ticket.id);
        },
        getPlayerId: function () {
            mp.trigger("cMisc-CallServerEvent", "sReportGetPlayerId", this.contextMenu.ticket.id);
        },
    },
}
</script>

<style scoped>

#console {
    background: #000;
    color: #fff;
    font-size: 1.5vh;
    height: 52vh;
    opacity: 0.9;
    position: absolute;
    top: 0;
    width: 100vw;
    overflow: hidden;
}

#console .console-admin {
    border-left: 1px solid #777;
    height: 100%;
    padding-left: 0.5vh;
    position: absolute;
    right: -50%;
    top: 0;
    width: 50%;
}

#console .console-admin .chat-bottom {
    padding-top: 1vh;
}

#console .console-admin .chat-bottom input {
    width: 99%;
}

#console .console-admin .chat-content {
    background: #111;
    height: 83.5%;
}

#console .console-admin .console-chat .chat {
    padding: 0 1vh;
    text-align: right;
}

#console .console-admin .admin-open {
    color: #fb0;
    left: -5%;
    position: absolute;
    text-align: center;
    top: 10%;
    transform: rotate(-90deg);
    /*width: 17vh;*/
}

#console .console-admin .admin-open:hover {
    opacity: 0.8;
}

#console .console-chat .chat {
    color: #1f0;
}

#console .console-content {
    height: 38vh;
    padding: 4vh 3vh 0 3vh;
    width: 95.7%;
    box-sizing: unset;
}

#console .console-bottom {
    padding: 2vh 3vh 0vh;
}

#console .console-content p {
    border-bottom: 1px solid #444;
    margin: 1vh;
    word-break: break-word;
}

#console .console-content p:hover {
    border-bottom: 1px solid #555;
    color: #ddd;
}

#console .console-report {
    display: grid;
    grid-template-columns: 38% 62%;
    grid-template-rows: repeat(1, 1fr);
    height: 93%;
}

#console .console-report .empty {
    color: #aaa;
    margin-top: 50%;
    text-align: center;
}

#console .dialog-messages {
    background: #111;
    height: 79%;
    padding: 1vh;
}

#console .report-dialog input {
    margin: 6px;
    /* margin-top: 1vh; */
    width: 94%;
}

#console .dialog-message {
    background: #fff;
    border-radius: 5px;
    color: #000;
    margin-bottom: 2vh;
    padding: 1vh;
    width: fit-content;
    word-break: break-word;
}

#console .dialog-message .date {
    color: #555;
    font-size: 1.3vh;
    text-align: right;
}

#console .dialog-message .date:hover {
    color: #777;
}

#console .dialog-message.my {
    background: #cde3ff;
}

.report_menu {
    background: #111;
    color: #fff;
    min-width: 15vh;
    position: absolute;
    z-index: 1;
    /*top: 10vh;
    right: 11vh;*/
}

.report_menu .menu-item {
    border-bottom: 1px solid #222;
    border-left: 1px solid #000;
    font-weight: bold;
    padding: 1vh;
}

.report_menu .menu-item:hover {
    background: #fff;
    border-left: 2px solid #196;
    color: #000;
}

#console .report-list {
    border-right: 1px solid #555;
    border-top: 1px solid #555;
    position: relative;
}

#console .report-list input {
    margin-bottom: 1vh;
    width: 100%;
}

#console .report-list .content {
    height: 90%;
}

#console .report-list .content .report {
    border-left: 2px solid #fff;
    color: #3f2;
    margin-bottom: 0.4vh;
    padding: 0.5vh;
}

#console .report-list .content .report:hover {
    opacity: 0.8;
}

#console .report-list .report .name {
    font-size: 1.8vh;
}

#console .report-list .report .title {
    font-size: 1.4vh;
}

#console .report-list .content .claim {
    border-color: #f77;
}

#console .report-list .content .help {
    border-color: #7ff;
}

#console .report-list .content .my {
    color: #77f;
}

#console .report-list .content .busy {
    color: #e44;
}

#console .report-list .content .new {
    background: #333;
}

#console .selector {
    padding: 1vh 0;
    padding-right: 1vh;
    text-align: right;
}

#console .selector .active {
    border: 1px solid #fb0;
}

#console .selector > span {
    border: 1px solid #fff;
    padding: 0.5vh;
}

#console .selector span:not(.active):hover {
    border-color: #196;
}

#console .log {
    border-left: 3px solid #fff;
}

#console .info {
    border-left: 3px solid #00c;
}

#console .warning {
    border-left: 3px solid #f80;
}

#console .error {
    border-left: 3px solid #c00;
    font-style: italic;
}

#console .debug {
    border-left: 3px solid #bf0;
}

#console .console-bottom {
    width: 95.7%;
}

#console .console-bottom input {
    border-bottom: 1px solid #777;
    width: 100%;
}

#console .console-bottom input:focus {
    outline: none;
}

#console .console-bottom input::placeholder {
    color: #555;
}

#console input {
    background: #222;
    border: none;
    color: #fff;
    font-size: 1.5vh;
    padding: 0.6vh;
}

#console ::-webkit-scrollbar {
    width: 4px;
}

#console ::-webkit-scrollbar-thumb {
    border-width: 1px 1px 1px 2px;
    border-color: #196;
    background-color: #196;
}

#console ::-webkit-scrollbar-thumb:hover {
    border-width: 1px 1px 1px 2px;
    border-color: #085;
    background-color: #085;
}

#console ::-webkit-scrollbar-track:hover {
    border-left: solid 1px #222;
    background-color: #222;
}
.scroll {
    overflow-x: hidden;
    overflow-y: auto;
}
.ticket-title {
	height: 2vw;
    display: flex;
    align-items: center;
    border: 1px solid;
    padding: 4px;
    margin-bottom: 5px;
}
.msg-wrapper{
	margin-bottom: 1vw;
	display: flex;
	flex-direction: column;
}
.self-msg{
    align-items: flex-start
}
.incoming-msg{
    align-items: flex-end
}
.msg{
    max-width: 75%;
    display: inline-flex;
    padding: 0.5vw 0.83vw;
    border-radius: 0.52vw;
    background-color: #277abf;
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 0.83vw;
    font-weight: 300;
    letter-spacing: -0.05vw;
    margin-bottom: 0.2vw;
    word-break: break-all;
}
.msg-date{
    display: flex;
    justify-content: flex-end;
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 0.57vw;
    font-weight: 300;
    letter-spacing: -0.55px;
}
.time{
    margin-right: 0.2vw;
}
.ticket-input-error {
	text-align: center;
}
.selected {
	background: #9c9c9c;
}
</style>
