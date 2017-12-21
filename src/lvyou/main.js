// 引入css
import './css/style.css'
import 'swiper/dist/css/swiper.css'

import 'Utils/flexible'
import Swiper from 'swiper'
import axios from 'axios'
// 引入lib
import browser from 'Utils/browser'

new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  loop: true,
  centeredSlides: true,
  autoplay: 2000,
  spaceBetween: 10
})

console.log(axios, 'axios')

console.log(browser)
