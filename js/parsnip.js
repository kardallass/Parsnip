var par = par || {};

par.use_charles = (window.location.search.indexOf("charles=true") > -1)
    ? true
    : false;

// Apigee JS example:
// https://github.com/apigee/Apigee-Source-for-JavaScript/blob/gh-pages/examples/twitter/home_timeline.html

par.api = par.api || {};

par.api.nytimes_newswire = {
    base_url: "http://api.nytimes.com/svc/news/v3/content",
    provider: "nyt",
    service: "newswire"
};

// NYT

par.nyt = par.nyt || {};

// NYT: Models

par.nyt.Story = Backbone.Model.extend({});

par.nyt.Story_List = Backbone.Collection.extend({
    url: "/proxy/proxy.php",
    localStorage: null,

    initialize: function() {
        this.localStorage = new Store("nytimes_newswire_story_list");
    },
    init_stories: function() {
        var self = this;
        $.ajax(this.url, {
            data: {
                "url": par.api.nytimes_newswire.base_url + "/nyt/all/",
                "provider": par.api.nytimes_newswire.provider,
                "service": par.api.nytimes_newswire.service,
                "limit": "20",
                "charles": par.use_charles
            },
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

// NYT: Views

par.nyt.Story_View = Backbone.View.extend({
    tagName: "article",
    template: "<a href=\"{{url}}\" target=\"_blank\">{{title}}</a>",

    render: function() {
        $(this.el).html(Mustache.render(this.template, this.model.toJSON()));
        return this;
    }
});

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

// App

par.App = Backbone.View.extend({
    initialize: function() {
        this.story_list = new par.nyt.Story_List();
        this.story_list_view = new par.nyt.Story_List_View({
            collection: this.story_list
        });
        this.story_list.init_stories();
    }
});

$(document).ready(function() {
    par.app = new par.App();
});
//Backbone.history.start();
