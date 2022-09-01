<template>
  <footer class="app-footer">
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <!-- 版权信息 -->
        <div class="copyright">
          <p>影视 Recommendation —— 一个影视推荐平台</p>
          <p>CopyRight © 影视 Recommendation</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped lang='less'>
.app-footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;
  .extra {
    background-color: #333;
  }
  .copyright {
    height: 100px;
    padding-top: 25px;
    text-align: center;
    color: #999;
    font-size: 15px;
    p {
      line-height: 1;
      margin-bottom: 20px;
    }
  }
}
</style>