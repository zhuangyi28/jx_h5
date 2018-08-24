'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',//测试环境
  //API_ROOT: '"http://jxtest.99payroll.cn/jx-user"'
  API_ROOT: '/api/'
})
