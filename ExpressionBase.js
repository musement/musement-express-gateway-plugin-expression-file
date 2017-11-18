'use strict';

/**
 * La classe base che permette di interagire con il middleware della policy
 * Responsible for:
 * 1. istanziare req, res, next, pluginContext, actionParams => OK
 * 2. fornire un metodo log() che usa un logger custom => TBD
 */
class ExpressionBase {
    constructor(req, res, next, pluginContext, actionParams) {
        this.req = req
        this.res = res
        this.next = next
        this.pluginContext = pluginContext
        this.actionParams = actionParams
        // i responsi in un array per avere un log sequenziale di come viene lavorato il responso
        this.res.locals.customResponse = res.locals.customResponse || []
    }

    run() {
        throw new Error('You have to implement the method run()');
    }

    setParam(param, value) {
        this.res.locals[param] = value
    }

    getParam(param) {
        return this.res.locals[param]
    }

    /**
     * questo torna un oggetto chiave valore con i parametri richiesti in paramArray
     */
    getParams(paramArray = []) {
        let params = {}
        paramArray.forEach(paramName => {
            params[paramName] = this.getParam(paramName)
        })
        return params
    }

    getResponse(index) {
        const length = this.res.locals.customResponse.length - 1
        return (index <= length)
            ? this.res.locals.customResponse[index]
            : this.res.locals.customResponse[length]
    }

    setResponse(payload) {
        this.res.locals.customResponse.push(payload)
    }

    getAllResponse() {
        return this.res.locals.customResponse
    }
}

module.exports = ExpressionBase
