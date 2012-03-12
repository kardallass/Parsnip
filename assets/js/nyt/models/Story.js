par.nyt.Story = Backbone.Model.extend({
    defaults: {
        is_favorite: false,
        categories: null
    },

    initialize: function() {
        this.set({
            categories: [],
            silent: true
        });
    }
});


