<template>
<div class="right-inner">
  <!--操作栏-->
  <div class="tool-box">
    <div class="tool-left">
      <a href="javascript: void(0)">
        <v-icon name="database" />
      </a>
      <a href="javascript: void(0)">
        <v-icon name="beauty" />
      </a>
      <a href="javascript: void(0)">
        <v-icon name="clear" />
      </a>
      <a href="javascript: void(0)">
        <v-icon name="export-txt" />
      </a>
      <a href="javascript: void(0)">
        <v-icon name="expand" />
      </a>
      <a href="javascript: void(0)">
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
      <a href="javascript: void(0)">
        <v-icon name="theme" />
      </a>
    </div>
  </div>
  <div class="editor-box">
    <!-- JSON 正常显示视图-->
    <json-item :jsondata="jsondata" :theme="theme" v-if="view === 'json'" />

    <!-- 解析异常报错视图 -->
    <div v-if="view === 'error'" class="error-view">
      <pre>{{parseError}}</pre>
    </div>
  </div>
</div>
</template>

<script>
import JsonItem from '@/components/json-item'
export default {
  props: ['jsonstr'],
  data () {
    return {
      jsondata: {},
      view: 'json',
      parseError: ''
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
  computed: {
    theme: function () {
      // let th = this.themes[this.checkedTheme]
      let th = ['#92278f', '#3ab54a', '#25aae2', '#f3934e', '#f34e5c', '#717171']
      let result = {}
      let index = 0
      ;['key', 'String', 'Number', 'Boolean', 'Null', 'link-link'].forEach(key => {
        result[key] = th[index]
        index++
      })
      return result
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
}

.tool-box {
  height: 46px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: #EEE 1px solid;
  & > div {
    display: flex;
    align-items: center;
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
}

.editor-box {
  flex-grow: 1;
  font-weight: bold;
  a {
    text-decoration: none;
    display: inline-block;
    color: #333;
  }
  .error-view {
    color: red;
    padding: 10px 30px;
  }
}

</style>