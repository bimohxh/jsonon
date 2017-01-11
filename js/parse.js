var Parse = {

  // 解析 JSON 对象生成一个格式化的 html 结构
  structHtml: function (jsonHtml) {
    var html = Parse.structBraceStart()
    for (var key in jsonHtml) {
      html += '<div class="keyval">\
        <span class="key">\"' + key + '\": </span>\
        ' + Parse.structVal(jsonHtml[key]) + '\
      </div>'
    }

    html += '<div class="brace-end">}</div>'
    return html
  },

  // 格式化左大括号
  structBraceStart: function (valhtml) {
    var icon = '<svg class="icon icon-square" @click="expand()">\
              <use xlink:href="svg/icon.svg#minus-square"></use>\
              </svg>'
    
    return '<div class="brace-start">' + icon + '{</div>'
  },

  // 格式化值
  structVal: function (valhtml) {
    var valtyp = typeof valhtml
    if(valtyp == 'string') {
      valhtml = '"' + valhtml + '"'
    } 
    return '<span class="val val-' + valtyp + '">' + valhtml + '</span>'
  }
}

