<?php

function trace($str, $dump=false, $r = null, $cssClass="trace")
{
	$ss = '';
	if($dump){
		$ss .= '<div class="'.$cssClass.'">'.print_r($str, true).'</div>';
	}else{
		$ss .= '<div class="'.$cssClass.'">'.$str.'</div>';
	}
	if($r){
		return $ss;
	}else{
		//echo $ss; 
	}
}

class StructureSeo {
	public function __construct() {

		trace("StructureSeo");
		$base = $this->swfaddress_base(); 
		session_start();
		$swfaddress_value;
        
		if ('application/x-swfaddress' == (isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : 
            (isset($_SERVER['HTTP_CONTENT_TYPE']) ? $_SERVER['HTTP_CONTENT_TYPE'] : ''))) {
            $swfaddress_value = preg_replace('/&hash=(.*)$/', '#$1', $_SERVER['QUERY_STRING']);
            $_SESSION['swfaddress'] = $swfaddress_value;
            trace('location.replace("' . $base . '/#' . $swfaddress_value . '")', false, null, "traceRed");
            exit();
        }

        if (isset($_SESSION['swfaddress'])) {
            $swfaddress_value = $_SESSION['swfaddress'];
            unset($_SESSION['swfaddress']);
        } else {
            $page = substr($_SERVER['PHP_SELF'], strrpos($_SERVER['PHP_SELF'], '/') + 1);
            $swfaddress_value = str_replace($base, '', (strpos($page, '.php') && $page != 'index.php') ? $_SERVER['REQUEST_URI'] : str_replace($page, '', $_SERVER['REQUEST_URI']));
        }
        $query_string = (strpos($swfaddress_value, '?')) ? substr($swfaddress_value, strpos($swfaddress_value, '?') + 1, strlen($swfaddress_value)) : '';
        trace("page: ".$page);
        trace("query_string: ".$query_string);

        if ($query_string != '') {
            $swfaddress_path = substr($swfaddress_value, 0, strpos($swfaddress_value, '?'));
            $params = explode('&', str_replace($swfaddress_path . '?', '', $swfaddress_value));
            for ($i = 0; $i < count($params); $i++) {
                $pair = explode('=', $params[$i]);
                $swfaddress_parameters[$pair[0]] = $pair[1];
            }
        } else {
            $swfaddress_path = $swfaddress_value;
        }

        // $url = strtolower(array_shift(explode('/', $_SERVER['SERVER_PROTOCOL']))) . '://';
        // $tmp = explode(explode('/', $_SERVER['SERVER_PROTOCOL']));
        // $url = strtolower(array_shift($tmp)) . '://';
        $url = explode('/', $_SERVER['SERVER_PROTOCOL']);
        $url = strtolower(array_shift($url));

        
// $file_extension = end($tmp);

        $url .= $_SERVER['SERVER_NAME'];
        $url .= $this->swfaddress_base() . '/datasource.php?swfaddress=' . $swfaddress_path;
        $url .= (strpos($swfaddress_value, '?')) ? '&' . substr($swfaddress_value, strpos($swfaddress_value, '?') + 1, strlen($swfaddress_value)) : '';
        trace("url: ".$url);

        trace("swfaddress_path: ".$swfaddress_path);


	}

	public function swfaddress_base() {
        return substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));

    }

	public function title() {
        return "ETHOS";

    }

}

?>