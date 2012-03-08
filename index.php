<!doctype html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="css/parsnip.css">
    </head>
    <body>
        <div id="wrapper" class="container">
            <div class="page-header">
                <h1>Parsnip</h1>
            </div>
            <ul id="popular_tabs" class="nav nav-tabs"></ul>
            <div id="popular_content" class="tab-content"></div>
            <hr>
            <div id="uses">
                <a href="http://twitter.github.com/bootstrap/" class="btn">Bootstrap</a>
                <a href="http://www.jquery.com/" class="btn">jQuery</a>
                <a href="http://backbonejs.org" class="btn">Backbone.js</a>
                <a href="https://github.com/janl/mustache.js" class="btn">Mustache.js</a>
            </div>
            <div>&copy; Tara Marchand</div>
        </div>
        <script src="js/libraries/jquery-1.7.1.min.js"></script>
        <script src="js/libraries/base64_min.js"></script>
        <script src="js/libraries/underscore-min.js"></script>
        <script src="js/libraries/backbone.js"></script>
        <script src="js/libraries/mustache.js"></script>
        <script src="js/libraries/bootstrap-tab.js"></script>

        <script src="js/par.js"></script>
        <script src="js/nyt.js"></script>
        <script src="js/nyt/apis.js"></script>
        <script src="js/nyt/models/Story.js"></script>
        <script src="js/nyt/collections/Story_List.js"></script>
        <script src="js/nyt/views/Story_View.js"></script>
        <script src="js/nyt/views/Story_List_View.js"></script>
        <script src="js/App.js"></script>
        <script src="js/init.js"></script>
    </body>
</html>

