// 引入css
import './css/style.css'
import 'swiper/dist/css/swiper.css'

import 'Lib/flexible'
import Swiper from 'swiper'
import axios from 'axios'
// 引入lib
import browser from 'Lib/browser'

new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  loop: true,
  centeredSlides: true,
  autoplay: 2000,
  spaceBetween: 10
})

console.log(axios, 'axios')

console.log(browser)
