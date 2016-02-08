var _seoM = function() {
    try {
        top.document;
        return top
    } catch (i) {
        return window
    }
};
_seoS = _seoM();
_seoLoc = _seoS.location;
_seoPathName = _seoLoc.pathname;
u = _seoLoc.href.indexOf("#");
_seoO = (u != -1);
_hsd = _seoO;
if(!_seoO)
{
    rewriteBase  = _seoBase;
    _seoUrl = _seoPathName.replace(rewriteBase+"/",'');
    if(_seoUrl != ""){
        _seoUrl = rewriteBase+"/#" + _seoUrl;
        top.location = _seoUrl; // redirect to hash
    }else{
        _hsd = true;
    }
}else{
    //
}

 function __cs() {
    var _seoDiv = document.getElementById("seoview");
    var _seoMenu = document.getElementById("seoMenu");
    if(_hsd){
        _seoDiv.style.display = "none";
    }else{
        _seoMenu.style.color = "#E3E7D3";
        _seoDiv.style.opacity = .9;
        document.body.style.overflow = "visible";
    }
    
    
}