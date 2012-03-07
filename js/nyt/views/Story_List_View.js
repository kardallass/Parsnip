par.nyt.Story_List_View =  Backbone.View.extend({
    tab_template: "<li><a href=\"#{{name}}\" data-toggle=\"tab\">{{title}}</a></li>",
    content_template: "<div class=\"tab-pane\" id=\"{{name}}\"></div>",
    $tab: null,
    $content: null,

    initialize: function() {
        this.$tab = $(Mustache.render(this.tab_template, this.collection));
        this.$content = $(Mustache.render(this.content_template, this.collection));

        this.$tab.appendTo("#" + this.options.tab_container_id);
        this.$content.appendTo("#" + this.options.content_container_id);
        _.bindAll(this, "add_story_view");
        this.collection.bind("add", this.add_story_view);
    },

    add_story_view: function(story) {
        var story_view = new par.nyt.Story_View({
            model: story
        });
        this.$content.append(story_view.render().el);
    }
});


