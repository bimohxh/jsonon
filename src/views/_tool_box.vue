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
   

    <!-- 分享 -->
    <div :class="'pop-btn show-pop-' + showpop.share">
      <div></div>
      <a href="javascript: void(0)" class="hint--top"  data-hint="分享" @click="showpop.share = !showpop.share">
        <v-icon name="share" />
      </a>
      <div class="share-box pop-card">
        <div class="pop-card-header">
          <span class="card-title">在线分享</span>
          <a href="javascript: void(0)" @click="showpop.share = false"><v-icon name="close" size="12" /></a>
        </div>
        <div class="pop-card-body" style="text-align: center; color: #AAA">
          即将到来
        </div>
      </div>
    </div>

    
    
    <!--历史保存-->
    <div :class="'pop-btn show-pop-' + showpop.history" v-if="historys.length > 0">
      <a href="javascript: void(0)" class="hint--top"  data-hint="历史保存"  @click="showpop.history = !showpop.history">
        <v-icon name="record" />
      </a>
      <div class="history-box pop-card">
        <div class="history-item" :key="history.key" v-for="(history, index) in historys">
          <a href="javascript: void(0)" class="history-name" :title="history.name" @click="restoreHistory(history)"> {{history.name}} </a>
          <a href="javascript: void(0)" class="trash-btn" @click="removeHistory(history, index)">
            <v-icon name="trash" />
          </a>
        </div>
      </div>
    </div>
    
    <!-- 保存 -->
    <div :class="'pop-btn show-pop-' + showpop.save">
      <div></div>
      <a href="javascript: void(0)" class="hint--top"  data-hint="保存" @click="showpop.save = !showpop.save">
        <v-icon name="save" />
      </a>
      <div class="save-box pop-card">
        <div class="pop-card-header">
          <span class="card-title">保存到当前浏览器中</span>
          <a href="javascript: void(0)" @click="showpop.save = false"><v-icon name="close" size="12" /></a>
        </div>
        <div class="pop-card-body">
          <input type="text" placeholder="这段JSON是干什么用的" v-model="saveName" />
          <button @click="saveHistory" :disabled="saveName.length === ''">保存</button>
        </div>
      </div>
    </div>

    <!-- 主题 -->
    <div :class="'pop-btn show-pop-' + showpop.theme">
      <a href="javascript: void(0)" class="hint--top"  data-hint="换肤"  @click="showpop.theme = !showpop.theme">
        <v-icon name="theme" />
      </a>
      <div class="theme-box pop-card">
        <div :class="'theme-item checked-' + (isCheckedTheme(theme))" v-for="theme in themes" :key="theme" @click="switchTheme(theme)">
          <span class="theme-color" v-for="color in theme" :key="color" :style="{backgroundColor: color}" ></span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import themes from '../lib/theme'
const Parse = require('../lib/parse')
const localforage = require('localforage')

export default {
  props: ['jsonstr'],
  data () {
    return {
      themes: themes,
      historys: [],
      saveName: '',
      showpop: {
        save: false,
        theme: false,
        history: false,
        share: false
      }
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
    },

    // 保存当前的JSON
    saveHistory: function () {
      var key = String(Date.now())
      var val = {
        name: this.saveName,
        key: key
      }
      this.historys.push(val)

      localforage.setItem('historys', this.historys, () => {
        val.data = this.jsonstr
        localforage.setItem('history_' + key, val, () => {
          this.showpop.save = false
          this.saveName = ''
        })
      })
    },

    // 根据历史恢复数据
    restoreHistory: function (history) {
      localforage.getItem('history_' + history.key, (err, value) => {
        if (!err) {
          this.$emit('setVal', value.data)
        }
      })
    },

    // 删除已保存的
    removeHistory: function (history, index) {
      this.historys.splice(index, 1)
      localforage.setItem('historys', this.historys, () => {
        localforage.removeItem('history_' + history.key, () => {})
      })
    }
  },
  created () {
    localforage.getItem('historys').then(value => {
      this.historys = value || []
    })
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
        padding: 10px 10px;
      }
    }
    .tool-left {
      flex-grow: 1
    }
    a {
      // margin-right: 20px;
    }
    a:link, a:visited {
      color: #999;
    }
    a:active, a:hover {
      color: #f34e5c;
    }
  }

  .pop-btn {
    display: inline-block;
    position: relative;
    &::before {
      content: '';
      display: block;
      position: absolute;
      top:43px;
      width:0;
      height:0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 15px solid #e4eaf5;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 45px;
      width:0;
      height:0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 15px solid #FFF;
    }
    &.show-pop-false {
      &::before {
        display: none;
      }
      &::after {
        display: none
      }
      .pop-card {
        display: none
      }
    }
    &.show-pop-true {
      a.hint--top {
        color: #f34e5c
      }
    }
    .pop-card {
      position: absolute;
      right: 0;  
      top: 50px;
      background-color: #FFF;
      box-shadow: 0 1px 10px 0 rgba(0,0,0,.05);
      border: 1px solid #e4eaf5;
      border-radius: 3px;

      .pop-card-header {
        display: flex;
        align-items: center;
        border-bottom: #e4eaf5 1px solid;
        padding: 10px;
        .card-title {
          flex-grow: 1
        }
      }

      .pop-card-body {
        padding: 10px;
      }
    }
  }

  .theme-box {
    width: 100px;
    align-items: center;
    flex-direction: column;
    padding: 10px 0;

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

  .save-box {
    input {
      padding: 8px;
    }

    button {
      margin-top: 10px;
      width: 100%;
      background-color: #00BCD4;
      color: #FFF;
      border: none;
      padding: 5px;
      cursor: pointer;
    }
  }

  .history-box {
    width: 170px;
    .history-item {
      padding: 10px;
      display: flex;
      align-items: center;
      border-top: #e4eaf5 1px solid;
      
      &:nth-child(1) {
        border-top: 0;
      }
      .history-name {
        flex-grow: 1;
        display: block;
        word-break: keep-all;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-decoration: none;
      }
      .trash-btn {
        line-height: 0;
        flex-shrink: 0;
        padding-left: 5px;
        display: none
      }

      &:hover {
        .trash-btn {
          display: block;
        }
      }
    }
  }

  .share-box {
    width: 200px;
  }
</style>