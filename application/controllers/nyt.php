<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Nyt extends MY_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/nyt
	 *	- or -  
	 * 		http://example.com/index.php/nyt/index
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index() {
		$this->load->view('nyt');
	}
}

/* End of file nyt.php */
/* Location: ./application/controllers/nyt.php */
