par.App = Backbone.View.extend({
    initialize: function() {
        this.nyt = this.nyt || {};
        this.nyt.all_stories_collection = new par.nyt.Story_List(); // collection

        var self = this,
            categories = ["mostemailed", "mostshared", "mostviewed", "favorites"],
            //categories = ["mostemailed", "mostshared", "mostviewed"],
            //categories = ["favorites"],
            category,
            category_views = [],
            name = "",
            provider = "",
            service = "",
            api_values = null,
            ajax_url = "",
            ajax_data = null,
            title = "";

        var bind_favorites_event_handler = function() {
            var favorites_collection_view = self.nyt.favorites_collection_view;

            favorites_collection_view.collection.on("categories:update", function(story) {
                if (story.get("is_favorite") && _.indexOf(favorites_collection_view.story_view_model_ids, story.cid) === -1) {
                    var story_view = new par.nyt.Story_View({
                        model: story
                    });
                    favorites_collection_view.$content.append(story_view.render().el);
                    // add story model id to array of displayed story views
                    favorites_collection_view.story_view_model_ids.splice(0, 0, story.cid);
                }
            });
        };

        var create_list_view = function(data, _category) {
            // create story models and add them to this collection
            var icon_class = (_category !== "favorites") ? "icon-list-alt" : "icon-heart",
                title = (_category !== "favorites") ? "Most Popular - " + _category : "My Favorites",
                category_view_name = _category + "_collection_view";

            // create category's story list view
            self.nyt[category_view_name] = new par.nyt.Story_List_View({
                category: _category,
                template_values: {
                    category: _category,
                    icon_class: icon_class,
                    title: title
                },
                tab_container_id: "popular_tabs",
                content_container_id: "popular_content",
                collection: self.nyt.all_stories_collection
            });

            // add favorites
            if (_category === "favorites") {
                bind_favorites_event_handler();
            }

            // add favorite stories list view to end & select first tab 
            if (_category === categories[categories.length - 1]) {
                $("#popular_tabs").find("a:first").tab("show");
            }
        };

        var get_story_models = function(data, _category) {
            var stories = (_category !== "favorites") ? data.results : data,
                story,
                story_model,
                story_categories;

            try {
                for (var j = 0, stories_length = stories.length; j < stories_length; j += 1) {
                    story = stories[j];

                    // use existing story models for items w/same URLs
                    story_model = self.nyt.all_stories_collection.find(function(_story) {
                        return _story.get("url") === story.url;
                    });
                    if (!story_model) {
                        story_model = new par.nyt.Story(story);
                        self.nyt.all_stories_collection.add(story_model);
                    }

                    // set as favorite or add category
                    if (_category === "favorites") {
                        story_model.set("is_favorite", true);
                    } else {
                        story_categories = story_model.get("categories");
                        story_categories.splice(0, 0, _category);
                        story_model.set("categories", story_categories);
                    }
                    self.nyt.all_stories_collection.trigger("categories:update", story_model);
                }
            } catch(e) {
                console.log(e);
            }
        };

        // create popular stories collections & collection views
        for (var i = 0; i < categories.length; i += 1) {
            category = categories[i];

            // make the ajax call, passing current category
            if (category !== "favorites") {
                provider = "nyt";
                service = "popular";
                api_values = par[provider].apis[service];
                ajax_url = "nyt/popular/" + category + "?host=" + api_values.host;
                ajax_data = {
                    // "host": api_values.host,
                    "port": api_values.port,
                    "provider": provider,
                    "service": service,
                    "charles": par.use_charles
                };
            } else {
                ajax_url = "nyt/favorites";
                ajax_data = {
                    "charles": par.use_charles
                };
            }

            (function(cat) {
                $.ajax(ajax_url, {
                    contentType: "application/json; charset=utf-8",
                    data: ajax_data,
                    dataType: "json",
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        console.log(textStatus);
                    },
                    success: function(data) {
                        create_list_view(data, cat);
                        get_story_models(data, cat);
                    }
                });
            })(category);
        }
    }
});


