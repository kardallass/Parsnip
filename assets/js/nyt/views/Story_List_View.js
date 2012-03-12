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
    rendered_story_cids: null,

    initialize: function(options) {
        _.extend(this, options);

        this.$tab = $(Mustache.render(this.tab_template, this.template_values));
        this.$content = $(Mustache.render(this.content_template, this.template_values));

        this.$tab.appendTo("#" + this.tab_container_id);
        this.$content.appendTo("#" + this.content_container_id);

        this.rendered_story_cids = [];

        // listen for story model categories update
        _.bindAll(this, "add_story_view");
        this.collection.bind("change:story:categories", this.add_story_view);
    },

    add_story_view: function(story) {
        // only render in this view if assoc. w/ this category & not already rendered
        if (_.indexOf(story.get("categories"), this.category) > -1 && _.indexOf(this.rendered_story_cids, story.cid) === -1) {
            var story_view = new par.nyt.Story_View({
                model: story
            });
            this.$content.append(story_view.render().el);
            // add cid to rendered story cids
            this.rendered_story_cids.push(story.cid);
        }
    },

    remove_story_view: function(story) {
        // remove cid from rendered story cids
        this.rendered_story_cids = _.without(this.rendered_story_cids, story.cid);
    }
});


