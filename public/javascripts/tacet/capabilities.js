tacet.capabilities = {
    fetch: function (onSuccess) {
        var self =  this;
        tacet.io.get(tacet.config.apiUri, function (data) {
            self.setup(spec);
            onSuccess();
        })
    },

    setup: function (spec) {
    }
};