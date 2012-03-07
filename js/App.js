par.App = Backbone.View.extend({
    initialize: function() {
        var popular_versions = ["mostemailed", "mostshared", "mostviewed"],
            version_name,
            story_list,
            story_list_view;

        // Ajax: most popular stories
        for (var i = 0; i < popular_versions.length; i += 1) {
            version_name = popular_versions[i];
            story_list = new par.nyt.Story_List([], {
                favorites_collection: favorite_story_list,
                path_vars: {
                    version: version_name
                },
                provider: "nyt",
                service: "popular",
                title: "Most Popular - " + version_name,
                name: version_name
            });
            story_list_view = new par.nyt.Story_List_View({
                tab_container_id: "popular_tabs",
                content_container_id: "popular_content",
                collection: story_list
            });
            story_list.init_stories();
        }

        // DB: favorite stories
        var favorite_story_list = new par.nyt.Story_List([], {
            title: "My Favorites",
            name: "favorites",
            url: "favorite_stories.php"
        });
        var favorite_story_list_view = new par.nyt.Story_List_View({
            tab_container_id: "popular_tabs",
            content_container_id: "popular_content",
            collection: favorite_story_list
        });

        // select first tab
        $("#popular_tabs").find("a:first").tab("show");
    }
});


