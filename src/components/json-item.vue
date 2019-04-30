<template>
<ul class="json-item">
  <json-val :field="key" :theme="theme" :val="val" :isend="index == objLength(jsondata) - 1" v-for="(val, key, index) in jsondata"></json-val>
</ul>
</template>

<script>
export default {
  name: 'json-item',
  props: ['theme', 'jsondata'],
  components: {
    JsonVal: () => import('./json-val.vue')
  },
  methods: {
    // 计算对象的长度
    objLength: function (obj) { 
      return Object.keys(obj).length
    }
  },
  created () {
    console.log(this.jsondata, typeof this.jsondata)
  }
}
</script>