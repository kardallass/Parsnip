par.nyt.apis = par.nyt.apis || {};

par.nyt.apis.newswire = {
    host: "http://api.nytimes.com",
    port: "80",
    path: "/svc/news/v3/content"
};

par.nyt.apis.popular = {
    host: "http://api.nytimes.com",
    port: "80",
    path: "/svc/mostpopular/v2/{{version}}/all-sections/1" // {{version}} is "mostemailed", "mostshared", or "mostviewed"
};

