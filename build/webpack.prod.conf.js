'use strict'
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const webpackConfig = merge(baseWebpackConfig, {})

module.exports = webpackConfig
