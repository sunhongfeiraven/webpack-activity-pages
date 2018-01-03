/* eslint-disable */

/*
let baseUrl = 'http://test.jcyapi.easybao.com/api/headline/client/detail' // 测试

if (env === 'PRE') {
  baseUrl = 'http://pre.jcyapi.easybao.com/api/headline/client/detail' // 预发
} else if (env === 'PROD') {
  baseUrl = 'https://jcyapi.easybao.com/api/headline/client/detail' // 生产
}
*/

let basePrefix = 'http://test.jcywap.easybao.com/activities/headline/' // 测试

if (env === 'PRE') {
  basePrefix = 'http://pre.jcywap.easybao.com/activities/headline/' // 预发
} else if (env === 'PROD') {
  basePrefix = 'https://jcywap.easybao.com/activities/headline/' // 生产
}

export {
  // baseUrl,
  basePrefix
}
