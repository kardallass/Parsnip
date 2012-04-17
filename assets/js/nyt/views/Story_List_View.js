par.nyt.Story_List_View =  Backbone.View.extend({
    tab_template: "<li><a href=\"#{{category}}\" data-toggle=\"tab\"><i class=\"{{icon_class}}\"></i>{{title}}</a></li>",
    tab_container_id: "",
    $tab: null,
    content_template: "<div class=\"tab-pane\" id=\"{{category}}\"></div>",
    content_container_id: "",
    $content: null,
    category: "",
    collection: null,
    template_values: {
        category: "",
        title: ""
    },

    initialize: function(options) {
        _.extend(this, options);

        this.$tab = $(Mustache.render(this.tab_template, this.template_values));
        this.$tab.appendTo("#" + this.tab_container_id);
        this.$content = $(Mustache.render(this.content_template, this.template_values));
        this.$content.appendTo("#" + this.content_container_id);
        this.story_view_model_ids = [];

        // listen for story model categories update
        _.bindAll(this, "add_story_view");
        this.collection.on("categories:update", this.add_story_view);
    },

    add_story_view: function(story) {
        var story_categories = story.get("categories");

        // this category is in story's categories array
        // this story's model cid isn't in displayed story models' cids array
        if (_.indexOf(story_categories, this.category) > -1 && _.indexOf(this.story_view_model_ids, story.cid) === -1) {
            var story_view = new par.nyt.Story_View({
                model: story
            });
            this.$content.append(story_view.render().el);
            // add story model id to array of displayed story views
            this.story_view_model_ids.splice(0, 0, story.cid);
        }
    },

    remove_story_view: function(story) {
    }
});


