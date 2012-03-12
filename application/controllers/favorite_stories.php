<?

// connect
$parsnip = new Mongo();

// select stories database
$stories_db = $parsnip->stories_db;

// request method
switch ($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        break;
    case "GET":
        // select favorite stories collection
        $favorite_stories_coll = $stories_db->favorite_stories_coll;
        $favorite_stories_cursor = $favorite_stories_coll.find();
        echo json_encode($favorite_stories_cursor);
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}

?>
