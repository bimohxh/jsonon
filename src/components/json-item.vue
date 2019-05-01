<template>
<ul class="json-item">
  <!-- 凡是遇到数组或者是对象就从这里开始 -->
  <json-val v-if="getTyp(jsondata) === 'Object'" :field="key"  :theme="theme" :val="val" :isend="index == objLength(jsondata) - 1" v-for="(val, key, index) in jsondata"></json-val>
  <json-val v-if="getTyp(jsondata) === 'Array'" :theme="theme"  :val="val" :isend="index == objLength(jsondata) - 1" v-for="(val, index) in jsondata"></json-val>
</ul>
</template>

<script>
export default {
  name: 'json-item',
  props: ['theme', 'jsondata', 'expandAction'],
  components: {
    JsonVal: () => import('./json-val.vue')
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