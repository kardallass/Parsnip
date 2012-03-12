par.nyt.Story = Backbone.Model.extend({
    defaults: {
        categories: null
    },

    initialize: function() {
        this.set({
            categories: [],
            silent: true
        });
    }
});


