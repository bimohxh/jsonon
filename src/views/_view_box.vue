<template>
<div class="editor-box">
  <!-- JSON 正常显示视图-->
  <div class="json-view" v-if="view === 'json'">
    <div class="line-box"></div>
    <json-item :jsondata="jsondata"  :line="1" />
  </div>

  <!-- 解析异常报错视图 -->
  <div v-if="view === 'error'" class="error-view">
    <pre>{{parseError}}</pre>
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
    height: 100%;
  }

  .editor-box {
    flex-grow: 1;
    font-weight: bold;
    line-height: 20px;
    overflow: auto;
    a {
      text-decoration: none;
      display: inline-block;
      color: #333;
    }

    .json-view {
      position: relative;
      display: flex;

      .line-box {
        width: 40px;
        background-color: #f8f4f4;
      }
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