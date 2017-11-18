module.exports = {
    version: '1.0.0',
    init: function (pluginContext) {
        pluginContext.registerPolicy(require('./policies/expression-file')(pluginContext));
    },
    policies: ['expression-file'], // this is for CLI to automatically add to "policies" whitelist in gateway.config
    options: {  // This is for CLI to ask about params 'eg plugin configure example'
        baseFolder: {
            title: 'Base folder',
            description: 'the base folder under project root where js files are stored',
            type: 'string',
            required: true
        }
    }
};