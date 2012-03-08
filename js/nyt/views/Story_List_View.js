par.nyt.Story_List_View =  Backbone.View.extend({
    tab_template: "<li><a href=\"#{{category}}\" data-toggle=\"tab\">{{title}}</a></li>",
    content_template: "<div class=\"tab-pane\" id=\"{{category}}\"></div>",
    category: "",
    // passed in
    template_values: {
        category: "",
        title: ""
    },
    tab_container_id: "",
    content_container_id: "",
    collection: null,
    // calculated
    $tab: null,
    $content: null,

    initialize: function(options) {
        _.extend(this, options);

        this.$tab = $(Mustache.render(this.tab_template, this.template_values));
        this.$content = $(Mustache.render(this.content_template, this.template_values));

        this.$tab.appendTo("#" + this.options.tab_container_id);
        this.$content.appendTo("#" + this.options.content_container_id);

        //_.bindAll(this, "add_story_view");
        //this.collection.bind("add", this.add_story_view);
    },

    add_story_view: function(story) {
        if (_.find(story.get("categories"), function(cat) { return cat === this.category; })) {
            var story_view = new par.nyt.Story_View({
                model: story
            });
            this.$content.append(story_view.render().el);
        }
    }
});


