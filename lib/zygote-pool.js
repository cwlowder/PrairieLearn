const zyspawn = require('zyspawn');
const logger = require('./logger');

const DEFAULT_ZYGOTE_NUM = 20;

module.exports = new zyspawn.ZygotePool(DEFAULT_ZYGOTE_NUM);