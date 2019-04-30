<template>
<div class="json-box">
  <div class="top-box">
    <h3>JSONON</h3>
  </div>
  <div class="bottom-box">
    <div class="left-box">
      <textarea v-model="jsonstr"></textarea>
    </div>
    <div class="split-box"></div>
    <div class="right-box">
      <right-box :jsonstr="jsonstr" />
    </div>
  </div>
  <!--用于移动的时候遮住文本域 避免被选中-->
  <div class="move-cover">
    </div> 
  </div>
</template>

<script>
import RightBox from './_right_box'
const $ = require('jquery')

export default {
  data () {
    return {
      jsonstr: '{\n\
  "name": "Json on",\n\
  "description": "一个简洁的在线 JSON 查看器",\n\
  "open source": {\n\
    "是否开源": true,\n\
    "GitHub": "https://github.com/bimohxh/jsonon"\n\
  }\n\
}'
    }
  },
  components: {
    RightBox
  },
  mounted () {
    //横向拖动
    $('.split-box').mousedown(function (eve) {
      $('.move-cover').show()
      var left_box = $('.left-box')
      var current_position = eve.clientX
      var left_width = left_box.width()
      $('body').mousemove(function (e) {
        left_box.width(left_width + e.clientX - current_position)
      }) 
    })
    // 停止拖动
    $('body').mouseup(function () {
      $('body').unbind('mousemove')
      $('.move-cover').hide()
    })
  }
}
</script>

<style lang="scss">
.json-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top-box {
    height: 50px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    border-bottom: #DDD 1px solid;
  }
  .bottom-box {
    flex-grow: 1;
    display: flex;
  }

  .left-box {
    width: 35%;
    textarea {
      display: block;
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      resize: none;
      padding: 10px;
      font-size: 14px;
      line-height: 1.42857143;
      box-sizing: border-box;
    }
  }

  .split-box {
    width: 3px;
    cursor: w-resize;
    border-right: #EEE 1px solid;
    border-top: 0;
    border-bottom: 0;
    flex-shrink: 0;
    position: relative;
  }

  .right-box {
    flex-grow: 1;
  }

  .move-cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    display: none
  }
}
</style>