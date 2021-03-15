<template>
  <div class="wrapper">
    <div class="base">
      <div class="header">Штрафстоянка</div>
      <div class="body">
        <div class="list">
          <div class="item">
            <div class="item-body">
              <div class="col">
                <div class="col-name">Модель авто</div>
                <div class="col-value">MERCEDES-BENZ 2000 GT</div>
              </div>
              <div class="col">
                <div class="col-name">Гос. номер</div>
                <div class="col-value">QWER4512</div>
              </div>
              <div class="col">
                <div class="col-name">Сумма штрафа</div>
                <div class="col-value">133243 $</div>
              </div>
            </div>
            <div class="item-footer">
              <div class="btn">Оплатить</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  .wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .base{
    width: 774px;
    background: linear-gradient(180deg, rgba(38, 153, 244, 0.3) 0%, rgba(255, 255, 255, 0) 100%), #045391;
    border-radius: 10px;
    @media (max-width: 1300px){
      transform: scale(0.75);
    }
  }
  .header{
    height: 70px;
    background: linear-gradient(180deg, rgba(86, 163, 223, 0.8) 0%, rgba(109, 185, 244, 0) 100%), #1E7CC7;
    border-radius: 10px 10px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic";
    font-size: 26px;
    color: #FFFEFE;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .body{
    padding: 20px 
    10px;
  }
  .list{
    padding: 0 20px;
    overflow: auto;
    height: 300px;
    &::-webkit-scrollbar{
      width: 7px;
    }
    &::-webkit-scrollbar-track{
      background: #FFFEFE;
      border-radius: 50px;
    }
    &::-webkit-scrollbar-thumb{
      background: #34A6FF;
      border-radius: 50px;
    }
  }
  .item{
    min-height: 159px;
    background: linear-gradient(180deg, rgba(86, 163, 223, 0.8) 0%, rgba(109, 185, 244, 0) 100%), #1E7CC7;
    border-radius: 10px;
    margin-bottom: 20px;
    padding-top: 22px;
    &:last-child{
      margin-bottom: 0;
    }
    &-body{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
    }
  }
  .col{
    text-align: center;
    padding: 0 10px;
  }
  .col-name, .col-value{
    font-size: 20px;
    color: #FFFEFE;
  }
  .col-name{
    margin-bottom: 15px;
    font-family: "Century Gothic";
  }
  .col-value{
    font-family: "Century Gothic Bold";
  }
  .item-footer{
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
  .btn{
    width: 253px;
    height: 36px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #34A6FF;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic Bold";
    font-size: 16px;
    color: #FFFEFE;
    transition: 0.2s;
    &:hover{
      color: #1E7CC7;
      background: #FFFEFE;
    }
  }
</style>