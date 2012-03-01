par.nyt.Story_List_View =  Backbone.View.extend({
    id: "story_list",
    tagName: "section",

    initialize: function() {
        _.bindAll(this, "add_story_view");
        $(this.el).insertAfter("#wrapper .page-header");
        this.collection.bind("add", this.add_story_view);
    },
    add_story_view: function(story) {
        var story_view = new par.nyt.Story_View({
            model: story
        });
        $(this.el).append(story_view.render().el);
    }
});


