<?php

class SeoSections {
	public $data;

	public function __construct($data) {
		$this->data = $data;

	}

	public function getView(){
		$html = '';
		foreach ($this->data as $key => $sectionData) {
			$sectionName = $sectionData->acf_fc_layout;
			switch ($sectionName) {
				case 's':
					$html .= "<h2>".$sectionData->title."</h2>";
					$html .= "<p>".$sectionData->desc."</p>";
					break;
				default:
					//$html .= "<h2>Tere is no ".$sectionName." class</h2>";
					break;
			}
		}

		return $html;

	}

	public function getUiImageView($img){
		$imgUrl = '/assets/img-md/ui/'.$img;
		return '<img id="seopic" itemprop="image" src="'.$imgUrl.'">';
	}
	public function getImageThumbView($img){
		return '<a href="'.$img->url.'"><img id="seopic" itemprop="image" src="'.$img->sizes->thumbnail.'" title="'.$img->title.'" alt="'.$img->alt.'" width="'.$img->sizes->{"thumbnail-width"}.'" height="'.$img->sizes->{"thumbnail-height"}.'"></a>';
	}
	public function getImageView($img){
		return '<img id="seopic" itemprop="image" src="'.$img->url.'" title="'.$img->title.'" alt="'.$img->alt.'" width="'.$img->width.'" height="'.$img->height.'">';
	}

}

?>