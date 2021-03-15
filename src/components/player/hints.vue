<template>
  <div class="wrapper">
    <div class="hint">
      <div class="hint-header">
        ДОМА
      </div>
      <div class="hint-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrapper{
    background: rgb(172, 65, 65);
  }
  .hint{
    position: absolute;
    top: 20vh;
    transition: 0.2s;
  }
  .hint-header{
    width: 20.21vw; //388px;
    height: 4.69vw; //90px;
    background: radial-gradient(54.11% 50% at 54.11% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%), #060914;
    border-radius: 0.1vw; //2px;
    clip-path: polygon(0 0, 100% 0%, 18.18vw 100%, 0% 100%);
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 1.82vw; //35px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    padding-left: 1.56vw; //30px;
  }
  .hint-body{
    width: 18.18vw; //349px;
    background: #fff;
    font-family: "Century Gothic";
    font-size: 0.78vw; //15px;
    line-height: 1.3vw; //25px;
    color: #000000;
    padding: 0.94vw 1.3vw 2.29vw; // 18px 25px 44px;
    border-radius: 0px 0px 0.52vw 0px;
  }
</style>