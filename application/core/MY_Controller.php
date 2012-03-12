<?php

class  MY_Controller  extends  CI_Controller  {
    public $assets_url;

    function __construct() {
        parent::__construct();
        $this->assets_url = base_url("assets") . "/";
    }
}


