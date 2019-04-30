<template>
  <div class="keyval">
    <!--值为值类型时-->
    <template v-if="!isObjectArr(val)">
      <span class="key" v-show="field" :style="{color: theme.key}">"{{field}}": </span>
      <span :class="'val val-' + getTyp(val)" :style="{color: theme[getTyp(val)]}">
        <a v-if="isaLink(val)" :href="val" target="_blank" class="json-link" :style="{color: theme['link-link']}">{{formatVal(val)}}</a>
        <span v-else>{{formatVal(val)}}</span>
        <span v-if="!isend">,</span>
      </span>
    </template>


    <!--值为引用类型时 key + 展开折叠ICON-->
    <template v-else>
      <!--展开的时候-->
      <div v-show="childExpand">
        <span class="key" :style="{color: theme.key}" v-show="field">"{{field}}": </span>
        <a href="javascript: void(0)" @click="childExpand = !childExpand" style="margin-right: 5px">
          <v-icon name="minus-square" size="12" />
        </a>
        <span>{</span>
        <json-item :jsondata="val" :theme="theme" />
        <div class="brace-end">
          }<span v-if="!isend">,</span>
        </div>
      </div>
      <!--折叠的时候-->
      <div v-show="!childExpand">
        <span class="key" :style="{color: theme.key}" v-show="field">"{{field}}": </span>
        <a href="javascript: void(0)" @click="childExpand = !childExpand" style="margin-right: 5px">
          <v-icon name="plus-square" size="12" />
        </a>
        <span>{{getTyp(val)}}</span>
        {<label class="ex-alia" @click="childExpand = !childExpand">{{objLength(val)}}</label>}
        <span v-if="!isend">,</span>
      </span>
      </div>
    </template>


    <!--值为对象时-->
    <!--<template v-if="getTyp(val) == 'Object'">
      <span class="expand-view"  v-show="childExpand">
        <json-item :jsondata="val" :theme="theme" />
        <div class="brace-end">
          }<span v-if="!isend">,</span>
        </div>
      </span>  

      <span class="fold-view" v-show="!childExpand">
        {{getTyp(val)}}
        {<label class="ex-alia" @click="childExpand = !childExpand">{{objLength(val)}}</label>
        }<span v-if="!isend">,</span>
      </span>
    </template>-->


    <!--值为数组时-->
    <!--<template v-if="getTyp(val) == 'Array'">
      <span class="expand-view">
        <span>[</span>
        <span class="val">
          <json-outer :jsondata="sub" v-for="(sub, index) in val" :isend="index == val.length - 1" :theme="theme"></json-outer>
        </span> 
        <div class="brace-end">]<span v-if="!isend">,</span></div>
      </span>  

      <span class="fold-view">{{getTyp(val)}}[<label class="arrlen ex-alia" @click="expand($event)">{{val.length}}</label>]<span v-if="!isend">,</span></span>

    </template>-->
  </div>
</template>


<style lang="scss">
.ex-alia {
  cursor: pointer;
  display: inline-block;
  color: #25aae2;
  padding: 0 2px;
}
</style>

<script>
import JsonItem from './json-item'
export default {
  name: 'json-val',
  props: ['field', 'val', 'theme', 'isend'],
  data () {
    return {
      childExpand: true
    }
  },
  components: {
    JsonItem
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


