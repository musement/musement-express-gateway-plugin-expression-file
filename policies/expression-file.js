'use strict';

var path = require('path')
var fs = require('fs')

var ExpressionBase = require('../ExpressionBase')

module.exports = pluginContext => {
    return {
        name: 'expression-file',
        policy: actionParams => {
            var filePath = path.resolve(__dirname, `../../../${pluginContext.settings.baseFolder}/${actionParams.jsfile}`)
            return (req, res, next) => {
                var ExpressionClass = require(filePath)
                if (!ExpressionClass.prototype instanceof ExpressionBase) {
                    throw new Error(`${ExpressionClass.name} must extend ExpressionBase`)
                }
                var expressionFile = new ExpressionClass(req, res, next, pluginContext, actionParams)
                // TODO inject custom logger when needed (from pluginContext option)
                return expressionFile.run()
            }
        }
    }
}