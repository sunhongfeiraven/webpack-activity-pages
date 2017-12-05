(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var env = 'TEST';

var baseUrl = 'http://test.jcyapi.easybao.com/api/shop/moon/cake/convert'; // 测试
// const baseUrl = 'http://pre.jcyapi.easybao.com/api/shop/moon/cake/convert' // 预发

if (env === 'PRE') {
  baseUrl = 'http://pre.jcyapi.easybao.com/api/shop/moon/cake/convert'; // 预发
} else if (env === 'PROD') {
  baseUrl = 'https://jcyapi.easybao.com/api/shop/moon/cake/convert'; // 生产
}
console.log('** running env:', env);
Vue.component('modal', {
  template: '#modal-template'
});

new Vue({
  el: '#app',
  data: function data() {
    return {
      couponNo: '',
      couponCode: '',
      name: '',
      mobile: '',
      address: '',
      memo: '',
      showAlert: false,
      showStatus: null,
      showModal: false,
      tips: '',
      goodsName: '',
      netError: ''
    };
  },

  methods: {
    submitFromData: function submitFromData() {
      var _this = this;

      if (this.couponNo == "" || this.couponCode == "" || this.name == "" || this.mobile == "" || this.address == "") {
        this.tips = '请将信息输入完整';
        this.showModal = true;
        return;
      }
      if (!/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.mobile)) {
        this.tips = '您输入的手机号有误';
        this.showModal = true;
        this.mobile = "";
        return;
      }
      var ticketInfo = {
        'couponNo': this.couponNo,
        'couponCode': this.couponCode,
        'name': this.name,
        'mobile': this.mobile,
        'address': this.address,
        'memo': this.memo
      };
      axios.post(baseUrl, ticketInfo).then(function (res) {
        _this.showAlert = true;
        _this.showStatus = res.data.code;
        _this.goodsName = res.data.data;
      }).catch(function (error) {
        _this.netError = '网络错误,请稍后重试！';
        _this.showModal = true;
      });
    },
    closeDialog: function closeDialog(showStatus) {
      if (showStatus == 0) {
        this.couponNo = "";
        this.couponCode = "";
        this.name = "";
        this.mobile = "";
        this.address = "";
        this.memo = "";
      } else {
        this.couponNo = "";
        this.couponCode = "";
      }
      this.showAlert = false;
    }
  }
});

})));
