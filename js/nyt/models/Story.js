par.nyt.Story = Backbone.Model.extend({
    defaults: {
        is_favorite: false
    },

    initialize: function() {
        this.set("categories", []);
    }
});


