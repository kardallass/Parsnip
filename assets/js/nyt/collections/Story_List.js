par.nyt.Story_List = Backbone.Collection.extend({
    url: par.constants.base_url + "nyt/favorites/",

    initialize: function(models, options) {
        _.extend(this, options);
    }
});

