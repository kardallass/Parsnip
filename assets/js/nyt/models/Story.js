par.nyt.Story = Backbone.Model.extend({
    initialize: function() {
        this.set({
            "is_favorite": false,
            "categories": []
        });
    }
});


