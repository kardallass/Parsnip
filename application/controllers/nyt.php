<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Nyt extends MY_Controller {

    public function _output($output) {
        echo $output;
    }

	public function index() {
		$this->load->view('nyt');
	}

    public function favorites($id = 'all') {
        // connect
        $parsnip = new Mongo();

        // select favorites database
        $nyt_stories = $parsnip->nyt_stories; // database
        $nyt_favorites = $nyt_stories->favorites; // collection
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
                echo "get all";
                //$nyt_favorites_cursor = $nyt_favorites.find();
                //echo json_encode($nyt_favorites_cursor);
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

    }
}

/* End of file nyt.php */
/* Location: ./application/controllers/nyt.php */
