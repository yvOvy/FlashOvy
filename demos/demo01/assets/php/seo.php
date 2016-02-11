<?php

require_once(dirname(__FILE__).'/structure/Structure.php'); 

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
    
    $swfaddress_value = '/';
    $swfaddress_path = '/';
    $swfaddress_parameters = array();
    $swfaddress_content = '';
    
    function is_msie() {
        return strstr(strtoupper($_SERVER['HTTP_USER_AGENT']), 'MSIE');
    }
    
    function swfaddress() {
    
        global $swfaddress_value, $swfaddress_path, $swfaddress_parameters, $swfaddress_content, $structure;

        $base = swfaddress_base();
        // trace("base :: ".$base);
        echo('<script type="text/javascript">_seoBase = "'.$base.'" </script>');
    
        session_start();

        if ('application/x-swfaddress' == (isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : 
            (isset($_SERVER['HTTP_CONTENT_TYPE']) ? $_SERVER['HTTP_CONTENT_TYPE'] : ''))) {
            $swfaddress_value = preg_replace('/&hash=(.*)$/', '#$1', $_SERVER['QUERY_STRING']);
            $_SESSION['swfaddress'] = $swfaddress_value;
            echo('location.replace("' . $base . '/#' . $swfaddress_value . '")');
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
        $sss = explode('/', $_SERVER['SERVER_PROTOCOL']);
        // trace("swfaddress_path ".$swfaddress_path);
        // trace($_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']);
        // trace("swfaddress_value: ".$swfaddress_path. "   ||||     swfaddress_path: ".ltrim($swfaddress_path, '/'));
        //remove first slash;

        $structurePath = array();
        $lang = "pl";
        $langs = array("pl", "en");
        $p = explode("/", ltrim($swfaddress_path, '/'));
        if(count($p) > 0){
            if(in_array($p[0], $langs)){
                $lang = array_shift($p);
                echo("set lang: ".$lang);
                // trace("set lang: ".$lang);
            }else{
                // trace("default lang: ".$lang);
            }
            if(count($p) > 0)
            {
                if(strlen($p[0])){
                    // trace("got page: ".$p[0]);
                    $structurePath[] = $p[0];
                }else{
                    // trace("home page!");
                }
                
            }else{
                // trace("home page!");
            }
        }else{
            // trace("home page!");
        }
        //echo("set lang: ".$lang);
        
        // trace($p, true);
        
        if (is_msie()) {
        
            $if_modified_since = isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ? 
                preg_replace('/;.*$/', '', $_SERVER['HTTP_IF_MODIFIED_SINCE']) : '';
            
            $file_last_modified = filemtime($_SERVER['SCRIPT_FILENAME']);
            $gmdate_modified = gmdate('D, d M Y H:i:s', $file_last_modified) . ' GMT';
        
            if ($if_modified_since == $gmdate_modified) {
                if (php_sapi_name() == 'cgi') {
                    header('Status: 304 Not Modified');
                } else {
                    header('HTTP/1.1 304 Not Modified');
                }
                exit();
            }
        
            header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 86400) . ' GMT');
            header('Last-Modified: ' . $gmdate_modified);
            header('Cache-control: max-age=' . 86400);
        }
        trace("gott structure");
        $structure = new Structure(5, $base, $lang, $structurePath);
        return $structure;
     }

    function swfaddress_base() {
        return substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));
    }
         
    function swfaddress_title($title) {
        if (!is_msie()) {
            $names = swfaddress_path_names();
            for ($i = 0; $i < count($names); $i++) {
                $title .= ' / ' . strtoupper(substr($names[$i], 0, 1)) . substr($names[$i], 1);
            }
        }
        echo($title);
    }
    
    function swfaddress_resource($resource) {
        echo(swfaddress_base() . $resource);
    }
    
    function swfaddress_link($link) {
        echo(swfaddress_base() . $link);
    }
    
    function swfaddress_content() {
        global $swfaddress_content;
        echo($swfaddress_content);
    }
    
    function swfaddress_path() {
        global $swfaddress_path;
        return $swfaddress_path;
    }
    
    function swfaddress_path_names() {
        global $swfaddress_path;
        $names = explode('/', $swfaddress_path);
        if (substr($swfaddress_path, 0, 1) == '/')
            array_splice($names, 0, 1);
        if (substr($swfaddress_path, count($swfaddress_path) - 1, 1) == '/')
            array_splice($names, count($names) - 1, 1);
        return $names;
    }

    function getSeoJsPath($resource) {
        global $swfaddress_value;
        $base = swfaddress_base();

        echo($base . $resource . (strstr($resource, '?') ? '&amp;' : '?') . 'base=' . urlencode($base));        
    }

    function getTitle() {
        trace("getTitle |".$structure."|");
        // trace($structure);
        return "oooo";//$structure->getTitle();  
    }
    
    

    ?>