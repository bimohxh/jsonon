<template>
<div class="top-box">
  <div style="flex-grow: 1">
    <h3>JSON ON</h3>
  </div>
  <div>
    <div class="slide-in" v-if="showSlogan" v-html="currentSlogan"></div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      slogans: [
        '「<strong>也许</strong>」是最好用的JSON格式化验证工具',
        '「<strong>换肤</strong>」选择你喜欢的色彩主题',
        '「<strong>导出</strong>」到本地文件可保存在电脑中',
        '「<strong>分享</strong>」支持通过链接快速分享给别人',
        '「<strong>保存</strong>」到本地浏览器缓存中便于读取',
        '「<strong>全部折叠/展开</strong>」功能真的很方便'
      ],
      currentSlogan: '',
      showSlogan: true
    }
  },
  methods: {
    // 切换口号
    switchSlogan: function () {
      this.showSlogan = false
      let _index = parseInt(Math.random() * (this.slogans.length - 1))
      this.currentSlogan = this.slogans.splice(_index, 1)[0]
      this.slogans.push(this.currentSlogan)
      setTimeout(() => {
        this.showSlogan = true
      })
    }
  },
  created () {
    this.switchSlogan()
    setInterval(() => {
      this.switchSlogan()
    }, 8000)
  }
}
</script>

<style lang="scss" scoped>
.top-box {
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border-bottom: #DDD 1px solid;
  padding: 0 10px;
  display: flex;
  overflow: hidden;
}

@keyframes slidein {
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1
  }
}

.slide-in{
  animation: slidein 2s;
}

</style>