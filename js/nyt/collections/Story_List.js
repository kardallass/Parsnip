par.nyt.Story_List = Backbone.Collection.extend({

    // default values for ajax call
    url: "/proxy/proxy.php",

    initialize: function(models, options) {
        _.extend(this, options);
    }
});

