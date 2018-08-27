/*json转form数据*/
exports.install = function (Vue, options) {

  Vue.prototype.json2Form = function (json){

    var str = [];

    for(var p in json){

      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }


    return str.join("&");

  };


}
