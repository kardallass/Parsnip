par.App = Backbone.View.extend({
    initialize: function() {
        par.App.nyt = par.App.nyt || {};

        var categories = ["mostemailed", "mostshared", "mostviewed"],
        category,
        category_views = [],
        all_stories = new par.nyt.Story_List(),
        name = "",
        provider = "",
        service = "",
        api_values = null,
        ajax_url = "",
        title = "";

        var create_stories_and_list_views = function(data, category) {
            // create story models and add them to this collection
            var stories = data.results,
            stories_length = stories.length,
            new_story,
            new_story_model;

            // create category's story list view
            par.App.nyt[category + "_view"] = new par.nyt.Story_List_View({
                category: category,
                template_values: {
                    category: category,
                    icon_class: "icon-list-alt",
                    title: "Most Popular - " + category
                },
                tab_container_id: "popular_tabs",
                content_container_id: "popular_content",
                collection: all_stories
            });

            // add favorite stories list view to end & select first tab 
            if (category === categories[categories.length - 1]) {
                create_favorites_list_view();
                $("#popular_tabs").find("a:first").tab("show");
            }

            // go through all stories and determine which categories they're associated with
            for (var j = 0; j < stories_length; j += 1) {
                new_story = stories[j];
                // use existing story models for items w/same URLs
                if (!all_stories.any(function(story_model) { return story_model.get("url") === new_story.url })) {
                    new_story_model = new par.nyt.Story(new_story);
                    all_stories.add(new_story_model);
                } else {
                    new_story_model = all_stories.find(function(story_model) { return story_model.get("url") === new_story.url });
                }
                // update story model's associated categories
                var new_story_categories = new_story_model.get("categories");
                new_story_categories.push(category);
                new_story_model.set("categories", new_story_categories);
                // custom event triggered for adding story view to story list view
                all_stories.trigger("change:story:categories", new_story_model);
            }
        };

        var create_favorites_list_view = function() {
            par.App.nyt.favorites_view = new par.nyt.Story_List_View({
                category: "favorites",
                template_values: {
                    category: "favorites",
                    icon_class: "icon-heart",
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
            provider = "nyt";
            service = "popular";
            api_values = par[provider].apis[service];
            ajax_url = "nyt/popular/" + category;

            // make the ajax call, passing current category value
            (function(cat) {
                $.ajax(ajax_url, {
                    data: {
                        "host": api_values.host,
                        "port": api_values.port,
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
    }
});


