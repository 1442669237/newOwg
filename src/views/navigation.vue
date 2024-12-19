<template>
  <div class="navBox">
    <div class="navMargin">
      <div class="navBox-left">
        <img class="navBox-left-img1" src="@/assets/images/logo.png" alt="" />
        <div class="navBox-left-text">一起玩吧</div>
      </div>
      <div class="navBox-center">
        <input
          type="text"
          class="navBox-center-input"
          placeholder="搜索游戏攻略"
        />
        <img class="navBox-center-img" src="@/assets/images/sousuo.png" />
      </div>
      <div class="navBox-right">
        <img class="navBox-right-img" src="@/assets/images/head.png" />
        <div class="navBox-right-text">
          <span>登录</span> / <span>注册</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
</script>
<style lang="less" scoped>
.navBox {
  width: 100%;
  height: 16px;
  background-color: #23292b;
  .navMargin {
    margin: 0 auto;
    width: 375px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .navBox-left,
    .navBox-center,
    .navBox-right {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    .navBox-left-img1 {
      width: 14px;
      height: 14px;
    }
    .navBox-left-text {
      font-size: 8px;
      color: #fff;
      margin-left: 4px;
    }
    .navBox-center {
      border-radius: 20px;
      width: 120px;
      height: 12px;
      background-color: #383e3e;
      align-items: center;
      .navBox-center-input {
        width: 100px;
        height: 8px;
        color: #fff;
        font-size: 5px;
      }
      .navBox-center-img {
        width: 10px;
        height: 11px;
        cursor: pointer;
      }
    }
    .navBox-right {
      cursor: pointer;
      .navBox-right-img {
        width: 13px;
        height: 12px;
      }
    }
    .navBox-right-text {
      font-size: 5px;
      color: #fff;
      margin-left: 2px;
    }
  }
}
</style>
