<script lang="ts" setup>

</script>

<template>
  <div class="introduction">
    <div class="container-box">
      <div class="layout-box top-none">
        <div class="img-area">
          <img src="@/assets/images/introduction.svg" alt="">
        </div>
        <div class="text-area">
          <h3>
            <strong>创建只有受邀者才可以加入的专属场所</strong>
          </h3>
          <div class="paragraph">
            根据话题不同，Discord 服务器被分成了多个频道。在那里，您可以随心所欲合作、分享或者聊聊自己的日常生活，完全不用担心在群组聊天中刷屏。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.introduction{
  background-color: #fff;
  padding-top:120px ;
  padding-bottom: 130px;
}
.container-box{
  width: 90%;
  max-width: 1180px;
  margin: auto;
  position: static;
}
.layout-box{
  display: grid;
  justify-items: start;
  align-items: center;
  align-content: start;
  grid-auto-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 16px;
  grid-column-gap: 20px;
}
.top-none{
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-flow: row;
  margin-top: 0;
}
.img-area{
  grid-area: span 1/span 6/span 1/span 6;
}
.text-area{
  grid-area: 1/8/2/12;
  h3{
    margin-top: 0;
    margin-bottom: 24px;
    font-weight: 700;
    strong{
      font-size: 48px;
    }
  }
}
.paragraph{
  margin-top: 24px;
  margin-bottom: 0;
  font-size: 20px;
  line-height: 28px;
}
</style>
