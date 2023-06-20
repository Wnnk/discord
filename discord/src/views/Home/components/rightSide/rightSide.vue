<script lang="ts" setup>
import { reactive} from 'vue';

const state = reactive({
  link:['主页','Chat interface','Download','Blog','Support']
})
const emit = defineEmits(['change_right_side'])
  

const method = reactive({
  close_side(){

  }
})
</script>


<template>
  <!-- 遮罩层 -->
  <div class="backdrop" ></div>



  <nav class="panle panelThemed">
    <div class="spacer"></div>
    <div class="right-link" v-for="item in state.link" :key="item">
      <span class="link-text">{{item}}</span>
    </div>
  </nav>

  <div class="panel-DQ3DPk panelTransparent-1i_YWR">
    <button class="closeButton-3Rg5jW" @click="emit('change_right_side')">
      <svg class="closeIcon-3Cx1EL" 
      width="12" 
      height="12" 
      viewBox="0 0 12 12">
      <g fill="none" fill-rule="evenodd" aria-hidden="true">
        <path d="M0 0h12v12H0"></path>
        <path fill="currentColor" 
        d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6">
        </path>
      </g>
      </svg>
    </button>

    <div class="footer">
      <div class="downloadButtonWrapper-qXeiyh">
        <a class="button-ZGMevK buttonBrand-24ECS3 buttonSmall-1FIG7u downloadButton-34PPdg" 
        href="">
          <svg width="24" height="24" viewBox="0 0 24 24" class="icon-2tQ9Jt">
            <g fill="currentColor">
              <path d="M17.707 10.708L16.293 9.29398L13 12.587V2.00098H11V12.587L7.70697 9.29398L6.29297 10.708L12 16.415L17.707 10.708Z"></path>
              <path d="M18 18.001V20.001H6V18.001H4V20.001C4 21.103 4.897 22.001 6 22.001H18C19.104 22.001 20 21.103 20 20.001V18.001H18Z"></path>
            </g>
          </svg>Windows 版下载
        </a>
      </div>
    </div>
  </div>



      

</template>


<style lang="scss" scoped>
.backdrop{
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.3);
  z-index: 9999;
}

.panle{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 330px;
  z-index: 9999;
  overflow: hidden;
}
.panelThemed{
  background: #fff;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 24px 48px 120px 24px;
  overflow-y: scroll;
}
.spacer{
  width: 100%;
  height: 1px;
  background: #ebedef;
  margin-top: 24px;
  margin-bottom: 16px;
}
.right-link {
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 8px 16px;
  color: #23272a;
  
}
.link-text:hover{
  text-decoration: underline;
}
.link-text{
  font-size: 16px;
  line-height: 24px;
  
}
.panel-DQ3DPk{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 330px;
  z-index: 9999;
  overflow: hidden;
}
.panelTransparent-1i_YWR{
  pointer-events: none;
}
.closeButton-3Rg5jW{
  position: absolute;
  top: 24px;
  right: 24px;
  margin: -8px;
  padding: 8px;
  line-height: 0;
  z-index: 10000;
  pointer-events: auto;
  cursor: pointer;
  border: none;
  background-color: transparent;
}
.closeIcon-3Cx1EL {
  width: 24px;
  height: 24px;
  color: #23272a;
  color: var(--not-quite-black)
}
.footer{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 120px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  background: -webkit-gradient(linear,left top,left bottom,from(hsla(0,0%,100%,0)),color-stop(25%,#fff));
  background: linear-gradient(180deg,hsla(0,0%,100%,0),#fff 25%);
  border-bottom-left-radius: 8px;
  z-index: 10000;
  pointer-events: none;
}
.downloadButtonWrapper-qXeiyh {
    padding: 24px;
    pointer-events: auto;
    display: flex;
    justify-content: center;
}
.downloadButton-34PPdg {
    width: 100%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 14px;
}
.buttonSmall-1FIG7u {
    border-radius: 40px;
    font-size: 14px;
    padding: 7px 16px;
}
.buttonBrand-24ECS3 {
    background-color: #5865f2;
    color: #fff;
    text-align: center;
}


</style>
