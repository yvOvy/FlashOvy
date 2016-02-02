<?php

class SeoSections {
	public $data;

	public function __construct($data) {
		$this->data = $data;

	}

	public function getView(){
		$html = '';
		foreach ($this->data as $key => $sectionData) {
			trace($sectionData->acf_fc_layout);
			$sectionName = $sectionData->acf_fc_layout;
			switch ($sectionName) {
				case 'SectionTitleAndDescription':
					$html .= "<h2>".$sectionData->title."</h2>";
					$html .= "<p>".$sectionData->desc."</p>";
					break;
				case 'SectionPictureAndDesc':
					$html .= "<h2>".$sectionData->title."</h2>";
					$html .= "<p>".$sectionData->desc."</p>";
					$html .= $this->getImageThumbView($sectionData->image);
					break;
				case 'SectionBuildingSpace':
					$html .= "<h2>".$sectionData->title."</h2>";
					$html .= "<p>".$sectionData->desc."</p>";
					break;

				case 'SectionGalleryWithDesc':
					$html .= "<h2>".$sectionData->title."</h2>";
					for ($i=0; $i < count($sectionData->gallery); $i++) {
						$html .= "<p>".$sectionData->gallery[$i]->description."</p>";
						$html .= $this->getImageThumbView($sectionData->gallery[$i]);
					}
					break;
				case 'SectionNumbers':
					for ($i=0; $i < count($sectionData->numberElems); $i++) {
						$html .= $this->getUiImageView($sectionData->numberElems[$i]->icon);
						$html .= "<p>".$sectionData->numberElems[$i]->desc."</p>";
					}
					break;

				case 'SectionContact':
					$html .= "<h2>".$sectionData->title."</h2>";
					for ($i=0; $i < count($sectionData->subsection); $i++) {
						for ($n=0; $n < count($sectionData->subsection[$i]->contactGroup); $n++) { 
							$html .= "<h3>".$sectionData->subsection[$i]->contactGroup[$n]->groupName."</h3>";
							for ($c=0; $c < count($sectionData->subsection[$i]->contactGroup[$n]->contactData); $c++) { 
								$html .= "<p>".$sectionData->subsection[$i]->contactGroup[$n]->contactData[$c]->contactName."</p>";
								$html .= "<p>".$sectionData->subsection[$i]->contactGroup[$n]->contactData[$c]->details."</p>";
							}
						}
					}
					break;
				case 'SectionTextContent':
					$html .= '<p>'.$sectionData->contentText.'</p>';
					break;

				case 'SectionNextPage':
					$html .= '<a href="'.$sectionData->url.'"><h2>'.$sectionData->title."</h2></a>";
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