par.App = Backbone.View.extend({
    initialize: function() {
        this.story_list = new par.nyt.Story_List([], {
            path_vars: {
                version: "mostviewed"
            },
            provider: "nyt",
            service: "popular",
            title: "Most Popular - Viewed"
        });
        this.story_list_view = new par.nyt.Story_List_View({
            collection: this.story_list
        });
        this.story_list.init_stories();
    }
});


