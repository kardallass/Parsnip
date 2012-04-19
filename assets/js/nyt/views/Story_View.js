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
        return this.model.get("is_favorite");
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
        var is_favorite = this.get_is_favorite();

        if (!is_favorite) {
            change_to = true;
        } else {
            change_to = false;
        }

        this.model.save({
            is_favorite: change_to
        }, {
            url: par.constants.base_url + "nyt/favorites/"
        });
    },

    toggle_favorite: function() {
        this.toggle_favorite_in_model();
        this.toggle_favorite_in_view();
    }
});


