par.nyt.Story_View = Backbone.View.extend({
    tagName: "article",
    template: "<a href=\"{{url}}\" target=\"_blank\">{{title}}</a>",

    render: function() {
        $(this.el).html(Mustache.render(this.template, this.model.toJSON()));
        return this;
    }
});


