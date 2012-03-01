par.nyt.Story_List = Backbone.Collection.extend({
    url: "/proxy/proxy.php",
    localStorage: null,
    provider: "",
    service: "",

    initialize: function(models, options) {
        _.extend(this, options);
        //this.localStorage = new Store(this.provider + "_" + this.service + "_story_list");
    },
    init_stories: function(more_data) {
        var get_path = function() {
            if ("path_vars" in self) {
                return Mustache.render(api_values.path, self.path_vars);
            } else {
                return api_values.path;
            }
        };

        var self = this,
            api_values = par.apis[this.provider][this.service],
            path = get_path(),
            data = {
                "host": api_values.host,
                "port": api_values.port,
                "path": path,
                "provider": this.provider,
                "service": this.service,
                "charles": par.use_charles
            };

        if (more_data) {
            _.extend(data, more_data);
        }
        $.ajax(this.url, {
            data: data,
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            },
            success: function(data, textStatus, jqXHR) {
                var stories = data.results,
                    stories_length = stories.length,
                    story;
                for (var i = 0; i < stories_length; i += 1) {
                    story = new par.nyt.Story(stories[i]);
                    self.add(story);
                }
            }
        });
    }
});


