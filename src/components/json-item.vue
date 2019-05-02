<template>
<ul class="json-item">
  <!-- 凡是遇到数组或者是对象就从这里开始 -->
  <div v-if="getTyp(jsondata) === 'Object'">
    <json-val :line="line + index" :field="key"  :theme="theme" :val="val" :isend="index == objLength(jsondata) - 1" v-for="(val, key, index) in jsondata"></json-val>
  </div>
  
  <div  v-if="getTyp(jsondata) === 'Array'">
    <json-val :line="line + index" :theme="theme"  :val="val" :isend="index == objLength(jsondata) - 1" v-for="(val, index) in jsondata"></json-val>
  </div>
</ul>
</template>

<script>
export default {
  name: 'json-item',
  props: ['jsondata', 'line'],
  data () {
    return {
    }
  },
  components: {
    JsonVal: () => import('./json-val.vue')
  },
   computed: {
    theme: function () {
      return this.$store.state.theme.obj
    }
  },
  methods: {
    // 计算对象的长度
    objLength: function (obj) { 
      return Object.keys(obj).length
    },
    // 判断数据类型
    getTyp: function (val) {
      return toString.call(val).split(']')[0].split(' ')[1]
    },
    // 判断是否是对象或者数组，以对下级进行渲染
    isObjectArr: function (val) {
      return ['Object', 'Array'].indexOf(this.getTyp(val)) > -1
    }
  },
  created () {
  }
}
</script>