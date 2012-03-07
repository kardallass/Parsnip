<?

// connect
$parsnip = new Mongo();

// select stories database
$stories_db = $parsnip->stories_db;

// post or get
$is_post = false;
$is_get = false;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $is_post = true;
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $is_get = true;
}

// create → POST   /collection
if ($is_post) {

}

// read → GET   /collection[/id]
if ($is_get) {
    // select favorite stories collection
    $favorite_stories_coll = $stories_db->favorite_stories_coll;
    $favorite_stories_cursor = $favorite_stories_coll.find();
    echo json_encode($favorite_stories_cursor);
}

// update → PUT   /collection/id

// delete → DELETE   /collection/id

?>
