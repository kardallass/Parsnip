<!doctype html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="<?= $this->assets_url ?>css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="<?= $this->assets_url ?>css/font-awesome.css">
        <link rel="stylesheet" type="text/css" href="<?= $this->assets_url ?>css/parsnip.css">
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
                <a href="http://codeigniter.com/" class="btn">CodeIgniter</a>
                <a href="http://www.mongodb.org/" class="btn">MongoDB</a>
                <a href="http://twitter.github.com/bootstrap/" class="btn">Bootstrap</a>
                <a href="http://www.jquery.com/" class="btn">jQuery</a>
                <a href="http://underscorejs.org/" class="btn">Underscore.js</a>
                <a href="http://backbonejs.org/" class="btn">Backbone.js</a>
                <a href="https://github.com/janl/mustache.js" class="btn">Mustache.js</a>
                <a href="http://compass-style.org/" class="btn">Compass</a>

            </div>
            <div>&copy; Tara Marchand</div>
        </div>
        <script src="<?= $this->assets_url ?>js/libraries/jquery-1.7.2.min.js"></script>
        <script src="<?= $this->assets_url ?>js/libraries/base64_min.js"></script>
        <script src="<?= $this->assets_url ?>js/libraries/underscore-min.js"></script>
        <script src="<?= $this->assets_url ?>js/libraries/backbone.js"></script>
        <script src="<?= $this->assets_url ?>js/libraries/mustache.js"></script>
        <script src="<?= $this->assets_url ?>js/libraries/bootstrap-tab.js"></script>

        <script>
            var par = par || {};
            par.constants = {
                assets_url: "<?= $this->assets_url ?>",
                base_url: "<?= base_url() ?>"
            };
        </script>
        <script src="<?= $this->assets_url ?>js/par.js"></script>
        <script src="<?= $this->assets_url ?>js/nyt.js"></script>
        <script src="<?= $this->assets_url ?>js/nyt/apis.js"></script>
        <script src="<?= $this->assets_url ?>js/nyt/models/Story.js"></script>
        <script src="<?= $this->assets_url ?>js/nyt/collections/Story_List.js"></script>
        <script src="<?= $this->assets_url ?>js/nyt/views/Story_View.js"></script>
        <script src="<?= $this->assets_url ?>js/nyt/views/Story_List_View.js"></script>
        <script src="<?= $this->assets_url ?>js/App.js"></script>
        <script src="<?= $this->assets_url ?>js/init.js"></script>
    </body>
</html>

