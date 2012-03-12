par.nyt.Story_View = Backbone.View.extend({
    tagName: "article",
    template: "<a href=\"#\" class=\"favorite\"></a> <a href=\"{{url}}\" target=\"_blank\">{{title}}</a>",
    collection: null,

    render: function() {
        this.$el.html(Mustache.render(this.template, this.model.toJSON()));
        this.toggle_favorite_in_view();
        return this;
    },

    events: {
        "click .favorite": "toggle_favorite"
    },

    get_is_favorite: function() {
        var is_favorite = (_.indexOf(this.model.get("categories"), "favorites") > -1) ? true : false;
        return is_favorite;
    },

    // change the "Fav"/"Unfav" link
    toggle_favorite_in_view: function() {
        var is_favorite = this.get_is_favorite();

        if (is_favorite) {
            this.$el.find(".favorite").addClass("selected").text("Unfav");
        } else {
            this.$el.find(".favorite").removeClass("selected").text("Fav");
        }
    },

    // add "favorite" to or remove from story model's categories
    toggle_favorite_in_model: function() {
        var is_favorite = this.get_is_favorite(),
            story_categories = this.model.get("categories");

        if (!is_favorite) {
            story_categories.push("favorites");
            this.model.save();
        } else {
            story_categories = _.without(story_categories, "favorites");
            this.model.destroy();
        }

        this.model.set("categories", story_categories);
    },

    toggle_favorite: function() {
        this.toggle_favorite_in_model();
        this.toggle_favorite_in_view();
    }
});


