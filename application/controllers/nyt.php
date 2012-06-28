<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

//error_reporting(E_ALL); 
//ini_set( 'display_errors','1');

class Nyt extends MY_Controller {

    public function _output($output) {
        echo $output;
    }

	public function index() {
		$this->load->view('nyt');
	}

    public function popular($category) {
        $this->load->spark('curl/1.2.1');
        include $this->config->item("values_include_path") . "api_keys.php";

        // params that shouldn't be passed along in request
        $params_to_exclude = array("charles", "host", "port", "category", "provider", "service");
        $request_method = $_SERVER['REQUEST_METHOD'];

        if ($request_method == "GET") {
            $get = $this->input->get();
            $host = $this->input->get("host");
            $port = $this->input->get("port");
            $url = $host . ":" . $port . "/svc/mostpopular/v2/" . $category . "/all-sections/1";

            $provider = $this->input->get("provider");
            $service = $this->input->get("service");

            if ($host && $port && $category && $provider && $service) {
                $query_string = array();
                while ($element = current($get)) {
                    if (in_array(key($get), $params_to_exclude) == false) {
                        $query_string[key($get)] = $element;
                    }
                    next($get);
                }
                $query_string[$keys[$get["provider"]][$get["service"]]["key"]] = $keys[$get["provider"]][$get["service"]]["value"];
                $url .= "?" . http_build_query($query_string);

                $this->curl->create($url);
                $this->curl->options(array(
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_MAXREDIRS => 2,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_FAILONERROR => true
                ));
                //header("Content-Type: application/json");
                echo $this->curl->execute();
            }

        }
    }

    public function favorites($id = 'all') {
        include $this->config->item('values_include_path') . "databases.php";

        // connect to db on mongolab.com
        $mongo_connect_string = "mongodb://" . $databases["parsnip"]["username"] . ":" . $databases["parsnip"]["password"] . "@" . $databases["parsnip"]["host"] . ":" . $databases["parsnip"]["port"] . "/parsnip";
        try {
            // print every log message possible
            MongoLog::setLevel(MongoLog::ALL); // all log levels
            MongoLog::setModule(MongoLog::ALL); // all parts of the driver
           
            $mongo_connection = new Mongo($mongo_connect_string, array("connect" => true, "timeout" => 100000));
            $parsnip_db = $mongo_connection->parsnip;

            // select nyt_favorites collection
            $nyt_favorites = $parsnip_db->nyt_favorites; // collection
            $request_method = $_SERVER['REQUEST_METHOD'];
            if ($id == 'all') {

                if ($request_method == "POST") { // POST 'all' -- create all
                    $data_string = file_get_contents("php://input");
                    $data_array = json_decode($data_string, true);

                    // insert data
                    try {
                        $nyt_favorites->insert($data_array, array("safe" => true));
                    } catch (MongoCursorException $e) {
                        echo "error message: " . $e->getMessage() . "\n";
                        echo "error code: " . $e->getCode();
                    }

                } else if ($request_method == "GET") { // GET 'all' -- read all
                    //echo "get all";
                    $nyt_favorites_cursor = $nyt_favorites->find();
                    $return = array();
                    foreach ($nyt_favorites_cursor as $object) {
                        array_push($return, $object);
                    }
                    echo json_encode($return);
                }

            } else {

                if ($request_method == "GET") { // GET [id] -- read [id]
                    echo "get " . $id;
                } else if ($request_method == "PUT") { // PUT [id] -- update [id]
                    echo "put " . $id;
                } else if ($request_method == "DELETE") { // DELETE [id] -- delete [id]
                    echo "delete " . $id;
                }

            }
        } catch(MongoConnectionException $e) {
            die ($e->getMessage());
        }

    }
}

/* End of file nyt.php */
/* Location: ./application/controllers/nyt.php */
