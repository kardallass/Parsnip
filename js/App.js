par.App = Backbone.View.extend({
    initialize: function() {
        par.App.nyt = par.App.nyt || {};

        var categories = ["mostemailed", "mostshared", "mostviewed"],
        category,
        category_views = [],
        all_stories = new par.nyt.Story_List(),
        name = "",
        path_vars = null,
        provider = "",
        service = "",
        title = "";

        var create_stories_and_list_views = function(data, category) {
            // create story models and add them to this collection
            var stories = data.results,
            stories_length = stories.length,
            new_story,
            new_story_model;

            par.App.nyt[category + "_view"] = new par.nyt.Story_List_View({
                category: category,
                template_values: {
                    category: category,
                    title: "Most Popular - " + category
                },
                tab_container_id: "popular_tabs",
                content_container_id: "popular_content",
                collection: all_stories
            });

            for (var j = 0; j < stories_length; j += 1) {
                new_story = stories[j];
                // don't create and add story models for items w/same URLs
                if (!all_stories.any(function(story_model) { return story_model.get("url") === new_story.url })) {
                    new_story_model = new par.nyt.Story(new_story);
                    all_stories.add(new_story_model);
                } else {
                    new_story_model = all_stories.find(function(story_model) { return story_model.get("url") === new_story.url });
                }
                var new_story_categories = new_story_model.get("categories");
                new_story_categories.push(category);
                new_story_model.set("categories", new_story_categories);
            }
        };

        var create_favorites_list_view = function() {
            par.App.nyt.favorites = new par.nyt.Story_List_View({
                category: category,
                template_values: {
                    category: "favorites",
                    title: "My Favorites"
                },
                tab_container_id: "popular_tabs",
                content_container_id: "popular_content",
                collection: all_stories
            });
        };

        // create popular stories collections & collection views
        for (var i = 0; i < categories.length; i += 1) {
            category = categories[i];
            path_vars = {
                category: category
            };
            provider = "nyt";
            service = "popular";
            api_values = par[provider].apis[service];

            // make the ajax call, passing current category value
            (function(cat) {
                $.ajax("/proxy/proxy.php", {
                    data: {
                        "host": api_values.host,
                        "port": api_values.port,
                        "path": Mustache.render(api_values.path, path_vars),
                        "provider": provider,
                        "service": service,
                        "charles": par.use_charles
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                    },
                    success: function(data) {
                        create_stories_and_list_views(data, cat);
                    }
                });
            })(category);
        }
        // TODO: Figure out how to place at end
        create_favorites_list_view();



        //console.dir(all_stories);
        // select first tab
        //$("#popular_tabs").find("a:first").tab("show");
    }
});


