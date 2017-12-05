var baseUrl = 'http://test.jcyapi.easybao.com/api/shop/moon/cake/convert' // 测试
// const baseUrl = 'http://pre.jcyapi.easybao.com/api/shop/moon/cake/convert' // 预发

if (env === 'PRE') {
  baseUrl = 'http://pre.jcyapi.easybao.com/api/shop/moon/cake/convert' // 预发
} else if (env === 'PROD') {
  baseUrl = 'https://jcyapi.easybao.com/api/shop/moon/cake/convert' // 生产
}
console.log('** running env:', env)
Vue.component('modal', {
  template: '#modal-template'
})

new Vue({
    el:'#app',
    data(){
        return{
            couponNo:'',
            couponCode:'',
            name:'',
            mobile:'',
            address:'',
            memo:'',
            showAlert:false,
            showStatus: null,
            showModal: false,
            tips:'',
            goodsName:'',
            netError:''
        }
    },
    methods:{
      submitFromData(){
          if (this.couponNo == "" ||
              this.couponCode == "" ||
              this.name == "" ||
              this.mobile == ""||
              this.address == "") {
              this.tips = '请将信息输入完整'
              this.showModal = true
              return ;
          }
          if (!/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.mobile)) {
              this.tips = '您输入的手机号有误'
              this.showModal = true
              this.mobile = "";
              return ;
          }
          let ticketInfo = {
              'couponNo':this.couponNo,
              'couponCode':this.couponCode,
              'name':this.name,
              'mobile':this.mobile,
              'address':this.address,
              'memo':this.memo
          }
          axios.post(baseUrl, ticketInfo)
            .then((res)=> {
              this.showAlert = true;
              this.showStatus = res.data.code;
              this.goodsName = res.data.data;
            }).catch((error) =>{
              this.netError ='网络错误,请稍后重试！'
              this.showModal = true
            })
      },
      closeDialog(showStatus) {
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
})

