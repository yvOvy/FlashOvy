<?php

require_once(dirname(__FILE__).'/../sections/SeoSections.php'); 

class Structure {
	public $mainPageID;
	public $base;
	public $lang;
	public $structurePath;
	//
	public $jsonString;
	public $jsonData;

	public function __construct($mainPageID, $base, $lang, $structurePath) {
		$this->mainPageID = $mainPageID;
		$this->base = $base;
		$this->lang = $lang;
		$this->structurePath = $structurePath;
		//
		$jsonUrl = dirname(__FILE__).'/../../data/structure_'.$lang.'.json';
		// echo("oooooooooooooooooooooo");
		// echo($jsonUrl);
		$this->jsonString = file_get_contents($jsonUrl);
		$wholeData = json_decode($this->jsonString);
		

		foreach ($wholeData as $pageData) 
		{
			if($this->mainPageID == $pageData->id)
			{
				trace("got page data with ID: ".$this->mainPageID."<br>");
				$this->jsonData = $pageData->children;
				break;
			}
		}

		if( count($structurePath)){
			$this->contentData = $this->getContentByUrl($structurePath[0]);
		}else{
			$this->contentData = $this->getContentById("25");
		}
		// trace($this->contentData, true);		
	}

	public function getContentByUrl($url) {
		trace("getContentByUrl: ".$url);
		foreach ($this->jsonData as $pageData) {
			if($pageData->custom_fields->url == $url)
			{
				return $pageData;
			}
		}
		return null;
	}
	
	public function getContentById($id) {
		foreach ($this->jsonData as $pageData) {
			if($pageData->id == $id)
			{
				return $pageData;
			}
		}
		return null;
	}

	public function getSectionsView($sectionsData) {
		$html = '';
		if(count($sectionsData))
		{
			$s = new SeoSections($sectionsData);
			$html .= $s->getView();
		}
		return $html;
	}

	public function getView() {
		$html = '';
		$html .= $this->getMenuView();
		$html .= $this->getSectionsView($this->contentData->custom_fields->Sections);
		return $html;
		return "";
	}

	public function getMenuView() {
		$html = '<div><ul id="seoMenu">';
			foreach ($this->jsonData as $pageData) {
				if($pageData->custom_fields->isinseo){
					$html .= '<a href="/'.$this->lang.'/'.$pageData->custom_fields->url.'"><li>'.$pageData->title.'</li></a>';
				}
				
			}
		$html .= '</div></ul>';
		return $html;
	}

	public function getMetaKeywords() {
		// return $this->contentData->title;
		return $this->contentData->custom_fields->url;
	}
	public function getMetaDesc() {
		// return $this->contentData->title;
		return $this->contentData->custom_fields->url;
	}
	public function getTitle() {
		// return $this->contentData->title;
		return $this->contentData->custom_fields->url;
	}



}

?>