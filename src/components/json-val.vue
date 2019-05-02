<template>
  <div class="keyval">

    <span class="line-number">{{line}}</span>
    
    <!--值为值类型时-->
    <template v-if="!isObjectArr(val)">
      <span class="key" v-show="field" :style="{color: theme.key}">"{{field}}": </span>
      <span :class="'val val-' + getTyp(val)" :style="{color: theme[getTyp(val)]}">
        <a v-if="isaLink(val)" :href="val" target="_blank" class="json-link" :style="{color: theme['link-link']}">{{formatVal(val)}}</a>
        <span v-else>{{formatVal(val)}}</span>
        <span v-if="!isend">,</span>
      </span>
    </template>

    <!--值为对象时-->
    <template v-if="getTyp(val) == 'Object'">
      <span class="key" :style="{color: theme.key}" v-show="field">"{{field}}": </span>
      <a href="javascript: void(0)" @click="childExpand = !childExpand" style="margin-right: 5px">
        <v-icon :name="childExpand ? 'minus-square' : 'plus-square'" size="12" />
      </a>
    
      <span class="expand-view"  v-show="childExpand">
        <span>{</span>
        <json-item :jsondata="val" :line="line + 1"/>
        <div class="brace-end">}<span v-if="!isend">,</span>
          <span class="line-number">{{line}}</span>
        </div>
      </span>  

      <span class="fold-view" v-show="!childExpand">
        <span>{{getTyp(val)}}</span>
        {<label class="ex-alia" @click="childExpand = !childExpand">{{objLength(val)}}</label>}
        <span v-if="!isend">,</span>
      </span>
    </template>


    <!--值为数组时-->
    <template v-if="getTyp(val) == 'Array'">
      <span class="key" :style="{color: theme.key}" v-show="field">"{{field}}": </span>
      <a href="javascript: void(0)" @click="childExpand = !childExpand" style="margin-right: 5px">
        <v-icon :name="childExpand ? 'minus-square' : 'plus-square'" size="12" />
      </a>
      
      <span v-show="childExpand">
        <span>[</span>
        <json-item :jsondata="val" :line="line + 1"/>
        <div class="brace-end">]<span v-if="!isend">,</span>
          <span class="line-number">{{line}}</span>
        </div>
      </span>

      <span v-show="!childExpand">
        <span>{{getTyp(val)}}</span>
        [<label class="arrlen ex-alia" @click="childExpand = !childExpand">{{val.length}}</label>]
        <span v-if="!isend">,</span>
      </span>

    </template>
  </div>
</template>

<style lang="scss">
.ex-alia {
  cursor: pointer;
  display: inline-block;
  color: #25aae2;
  padding: 0 2px;
}

.line-number {
  position: absolute;
  left: 10px;
  color: #b0b3b6
}
</style>

<script>
import JsonItem from './json-item'
export default {
  name: 'json-val',
  props: ['field', 'val', 'isend', 'line'],
  data () {
    return {
      childExpand: true
    }
  },
  computed: {
    theme: function () {
      return this.$store.state.theme.obj
    }
  },
  components: {
    JsonItem
  },
  watch: {
    '$store.state.expandState': function (val) {
      this.childExpand = val[0] === 'e'
    }
  },
  methods: {
    // 判断数据类型
    getTyp: function (val) {
      return toString.call(val).split(']')[0].split(' ')[1]
    },

    // 判断是否是对象或者数组，以对下级进行渲染
    isObjectArr: function (val) {
      return ['Object', 'Array'].indexOf(this.getTyp(val)) > -1
    },

    // 判断值是否是链接
    isaLink: function (val) {
      return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(val)
    },

    // 计算对象的长度
    objLength: function (obj) { 
      return Object.keys(obj).length
    },

    // 格式化值
    formatVal: function (val) {
      let _type = this.getTyp(val)
      if (_type === 'String') {
        return '"' + val + '"'
      }
      if (_type === 'Null') {
        return 'null'
      }
      return val
    },

    // 折叠展开
    foldExpand: function () {
    }
  }
}
</script>


