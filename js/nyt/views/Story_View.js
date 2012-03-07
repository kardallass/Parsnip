par.nyt.Story_View = Backbone.View.extend({
    tagName: "article",
    template: "<a href=\"#\" class=\"favorite\"></a> <a href=\"{{url}}\" target=\"_blank\">{{title}}</a>",

    initialize: function() {
        _.bindAll(this, "change_view_fav");
        this.model.bind("change:is_favorite", this.change_view_fav);
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, this.model.toJSON()));
        this.change_view_fav();
        return this;
    },

    events: {
        "click .favorite": "change_model_fav"
    },

    // change the "Fav"/"Unfav" link
    change_view_fav: function() {
        if (this.model.get("is_favorite")) {
            this.$el.find(".favorite").addClass("selected").text("Unfav");
        } else {
            this.$el.find(".favorite").removeClass("selected").text("Fav");
        }
    },

    // change the model's is_favorite value
    change_model_fav: function() {
        if (this.model.get("is_favorite")) {
            this.model.set("is_favorite", false);
        } else {
            this.model.set("is_favorite", true);
        }
    }
});


