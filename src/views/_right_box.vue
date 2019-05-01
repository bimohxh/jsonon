<template>
<div class="right-inner">
  <!--操作栏-->
  <div class="tool-box">
    <div class="tool-left">
      <a href="javascript: void(0)" @click="compress">
        <v-icon name="database" />
      </a>
      <a href="javascript: void(0)" @click="beauty">
        <v-icon name="beauty" />
      </a>
      <a href="javascript: void(0)" @click="clearAll">
        <v-icon name="clear" />
      </a>
      <a href="javascript: void(0)">
        <v-icon name="export-txt" />
      </a>
      <a href="javascript: void(0)" @click="expandAll">
        <v-icon name="expand" />
      </a>
      <a href="javascript: void(0)" @click="collapseAll">
        <v-icon name="collapse" />
      </a>
    </div>
    <div class="tool-right">
      <a href="javascript: void(0)">
        <v-icon name="share" />
      </a>
      <a href="javascript: void(0)">
        <v-icon name="record" />
      </a>
      <a href="javascript: void(0)">
        <v-icon name="save" />
      </a>
      <!-- 主题 -->
      <span class="btn-box">
        <a href="javascript: void(0)">
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
  <div class="editor-box">
    <!-- JSON 正常显示视图-->
    <json-item :jsondata="jsondata"  v-if="view === 'json'" expandAction="expandAction" />

    <!-- 解析异常报错视图 -->
    <div v-if="view === 'error'" class="error-view">
      <pre>{{parseError}}</pre>
    </div>
    
  </div>
</div>
</template>

<script>
import JsonItem from '@/components/json-item'
import themes from '../lib/theme'
const Parse = require('../lib/parse')

export default {
  props: ['jsonstr'],
  data () {
    return {
      jsondata: {},
      view: 'json',
      parseError: '',
      expandAction: '',
      themes: themes
    }
  },
  components: {
    JsonItem
  },
  watch: {
    jsonstr: function () {
      this.setJSON()
    }
  },
  methods: {
    setJSON: function () {
      try {
        this.jsondata = {
          "": window.jsonlint.parse(this.jsonstr)
        }
        this.view = 'json'
      } catch (ex) {
        this.view = 'error'
        this.parseError =  ex.message
      }
    },

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
    }
  },
  created () {
    this.setJSON()
  }
}
</script>

<style lang="scss">
  .right-inner {
    display: flex;
    flex-direction: column;
  }

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