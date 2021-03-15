<template>
<div class="wrapper vote">
  <div class="vote-card">
    <form @submit.prevent="sendVote" class="vote-form">
      <div class="vote-body">
        <div class="vote-person" v-for="person in candidates" :key="person.id">
          <input @change="getValue(person)" class="vote-input" type="radio" name="person" :id="`person${person.id}`">
          <label class="vote-info" :for="`person${person.id}`">
            <div class="vote-person__name">{{ person.name }}</div>
            <div class="vote-person__party">{{ 'от ' + person.party }}</div>
          </label>
        </div>
      </div>
      <div class="vote-footer">
        <button class="vote-btn">Проголосовать</button>
      </div>
    </form>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      chosen: null,
      candidates: [
        {
          id: 1,
          name: 'Emmett Brown',
          party: 'Демократической партии “OUTATIME”'
        },
        {
          id: 2,
          name: 'Jacob Vendetta',
          party: 'Социал-демократической партии “Voices of the San Andreas”'
        }
      ]
    }
  },
  methods:{
    getValue(value){
      this.chosen = value
      console.log('выбран ' + this.chosen.name);
    },
    sendVote(){
      this.chosen ? console.log('Голос отдан за ' + this.chosen.name) : console.log('Выберите кандидата');
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/utils.scss';
  .vote{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vote-card{
    width: vw(879);
    background: linear-gradient(180deg, #E9E9E9 0%, rgba(230, 230, 230, 0) 100%), #FFFFFF url('/img/texture.png') no-repeat;
    background-size: cover;
    border-radius: vw(10);
    padding: vw(60) vw(45);
  }
  .vote-body{
    margin: vw(25) 0;
    max-height: vw(400);
    overflow-y: auto;
  }
  .vote-input{
    appearance: none;
    width: 0;
    margin-left: vw(40);
  }
  .vote-person{
    display: flex;
    align-items: flex-start;
    min-height: vw(100);
    position: relative;
    margin-left: vw(25);
    &__party, &__name{
      font-size: vw(23);
      color: #000000;
    }
    &__name{
      font-family: "Century Gothic Bold";
      min-width: vw(250);
      width: vw(250);
      margin-right: vw(15);
    }
    &__party{
      font-family: "Century Gothic";
    }
  }
  .vote-info{
    position: relative;
    display: flex;
    align-items: flex-start;
    &::before{
      content: '';
      position: absolute;
      left: vw(-40);
      top: vw(4);
      width: vw(20);
      height: vw(20);
      background: transparent;
      border-radius: 50%;
      border: vw(1) solid #000000;
    }
    .vote-input:checked + &::before{
      background: #000000 url('/img/check.png') no-repeat;
      background-position: center;
      background-size: 75%;
    }
  }
  .vote-footer{
    display: flex;
    justify-content: center;
  }
  .vote-btn{
    width: vw(338);
    height: vw(64);
    border-radius: vw(5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
    font-family: "Century Gothic Bold";
    font-size: vw(22);
    cursor: pointer;
    transition: 0.2s;
    border: vw(2) solid #000000;
    &:hover{
      color: #FFFFFF;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(23, 23, 23, 0) 100%), #242424;
    }
  }
</style>