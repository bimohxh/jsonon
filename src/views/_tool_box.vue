<template>
<div class="tool-box">
  <div class="tool-left">
    <a href="javascript: void(0)" @click="compress"  class="hint--top"  data-hint="压缩">
      <v-icon name="database" />
    </a>
    <a href="javascript: void(0)" @click="beauty"  class="hint--top"  data-hint="美化">
      <v-icon name="beauty" />
    </a>
    <a href="javascript: void(0)" @click="clearAll"  class="hint--top"  data-hint="清空">
      <v-icon name="clear" />
    </a>
    
    <a href="javascript: void(0)" @click="expandAll"  class="hint--top"  data-hint="全部展开">
      <v-icon name="expand" />
    </a>
    <a href="javascript: void(0)" @click="collapseAll"  class="hint--top"  data-hint="全部折叠">
      <v-icon name="collapse" />
    </a>
  </div>
  <div class="tool-right">
    <a href="javascript: void(0)"  @click="exportFile"  class="hint--top"  data-hint="导出下载">
      <v-icon name="export-txt" />
    </a>
    <a href="javascript: void(0)" class="hint--top"  data-hint="分享">
      <v-icon name="share" />
    </a>
    <a href="javascript: void(0)" class="hint--top"  data-hint="历史保存">
      <v-icon name="record" />
    </a>
    <a href="javascript: void(0)" class="hint--top"  data-hint="保存在本地">
      <v-icon name="save" />
    </a>
    <!-- 主题 -->
    <span class="btn-box">
      <a href="javascript: void(0)" class="hint--top"  data-hint="换肤">
        <v-icon name="theme" />
      </a>
      <div class="theme-box pop">
        <div :class="'theme-item checked-' + (isCheckedTheme(theme))" v-for="theme in themes" @click="switchTheme(theme)">
          <span class="theme-color" v-for="color in theme" :style="{backgroundColor: color}" ></span>
        </div>
      </div>
    </span>
  </div>
</div>
</template>

<script>
import themes from '../lib/theme'
const Parse = require('../lib/parse')

export default {
  props: ['jsonstr'],
  data () {
    return {
      themes: themes
    }
  },
  methods: {
    // 全部折叠
    collapseAll: function () {
      this.$store.commit('expand', 'collapse-' + Date.now())
    },
    
    // 全部展开
    expandAll: function () {
      this.$store.commit('expand', 'expand-' + Date.now())
    },

    // 清空
    clearAll: function () {
      this.$emit('setVal', '')
    },
    
    // 美化
    beauty: function () {
      this.$emit('setVal', JSON.stringify(JSON.parse(this.jsonstr), '', 4))
    },

    // 压缩
    compress: function () {
      this.$emit('setVal', Parse.compress(this.jsonstr))
    },

    // 是否是选中的主题
    isCheckedTheme: function (theme) {
      return JSON.stringify(this.$store.state.theme.arr) === JSON.stringify(theme)
    },

    // 切换主题
    switchTheme: function (theme) {
      this.$store.commit('setTheme', theme)
    },

    // 导出文件
    exportFile: function () {
      var FileSaver = require('file-saver');
      var blob = new Blob([this.jsonstr], {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, 'jsonon.txt')
    }
  }
}
</script>

<style lang="scss">
  .tool-box {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-bottom: #EEE 1px solid;
    & > div {
      display: flex;
      align-items: center;
      & > * {
        padding: 10px 3px;
      }
    }
    .tool-left {
      flex-grow: 1
    }
    a {
      margin-right: 20px;
    }
    a:link, a:visited {
      color: #999;
    }
    a:active, a:hover {
      color: #f34e5c;
    }
    .btn-box {
      position: relative;
      .pop {
        display: none;
      }
      &:hover {
        .pop {
          display: block;
        }
      }
    }
  }

  .theme-box {
    width: 100px;
    box-shadow: 1px 1px 1px #DDD;
    background-color: #FFF;
    overflow: hidden;
    align-items: center;
    flex-direction: column;
    padding: 10px 0;
    position: absolute;
    right: 0;
    top: 40px;
    border: #DDD 1px solid;
    border-bottom: 0;
    border-top: 0;

    .theme-item {
      cursor: pointer;
      padding: 5px 0px;
      width: 100%;
      text-align: center;

      &.checked-true{
        box-shadow: 1px 0px 10px #aeaeae;
      }
    }

    .theme-color {
      display: inline-block;
      width: 10px;
      height: 10px;
    }
  }

  .editor-box {
    flex-grow: 1;
    font-weight: bold;
    line-height: 20px;
    a {
      text-decoration: none;
      display: inline-block;
      color: #333;
    }
    .error-view {
      color: red;
      padding: 10px 30px;
    }
  
    .json-item {
      padding-left: 30px;
    }
    & > .json-item {
      padding-left: 12px;
    }
  }
</style>