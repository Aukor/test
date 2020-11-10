function Company(result) {
	if (typeof result == "undefined") {
		return;
	}
	this.address = result.find('#MainContent_lblCorrespondenceAddress')[0].textContent;
	this.email = result.find('#MainContent_lblEmail')[0].textContent;
	this.webSite = result.find('#MainContent_lblWebstite')[0].textContent;
	this.status = result.find('#MainContent_lblStatus')[0].textContent;
}

function run() {
	appendMaskToDocument();
	var companyList = $('#MainContent_DataListEntities .searchITDiv2');
	if (companyList.length >= 1) {
		sendRequest(companyList);
	} else {
		alert("Lista firm jest pusta.\r\nProszę wyszukać co najmniej jedną firmę.")
	}
}

function sendRequest(list) {
	list.each(function(index, element) {
		if ($(element).find('.additionalInformation').length > 0) return;
		if ($('.lmask:visible'.length == 0)) $('.lmask').show();

	    var url = $(element).find('#MainContent_DataListEntities_divDetails_' + index + ' a')[0].href;
	    var contentElement = $(element).find('#MainContent_DataListEntities_content_' + index);
	    $.ajax({
		    url: url,
		    type: 'GET',
		    dataType: 'html',
	        success: function(result) {
	            successRequest($(element), $(contentElement), $(result));
	        }
	    });
	});
}

function successRequest(element, contentElement, result) {
    var company = new Company(result);
    putInfoToRow(element, contentElement, company);
}

function putInfoToRow(element, contentElement, company) {
	var info = 		"<br>";
		info +=		"<div class='additionalInformation'>";
		info +=			"<span class='address'>";
		info +=				"<font class='searchITFont'>Adres: </font>";
		info +=				"<span class='data'>" + company.address + "</span>";
		info +=			"</span>";
		info += 		"<br>";
		info +=			"<span class='email'>";
		info +=				"<font class='searchITFont'>E-mail: </font>";
		info +=				"<span class='data'>" + company.email + "</span>";
		info +=			"</span>";		
		info += 		"<br>";
		info +=			"<span class='webSite'>";
		info +=				"<font class='searchITFont'>Strona internetowa: </font>";
		info +=				"<a href='http://" + company.webSite + "' target='_blank'>" + company.webSite + "</a>";
		info +=			"</span>";
		info += 		"<br>";
		info +=			"<span class='status'>";
		info +=				"<font class='searchITFont'>Status: </font>";
		info +=				"<span class='status " + addStatusClass(company.status) + "'>" + company.status + "</span>";
		info +=			"</span>";
		info +=		"</div>";
	contentElement.append(info);
	checkStatusAndEmail(element, company);
	checkStatus(contentElement, company);
}

function addStatusClass(status) {
	return status == "Aktywny" ? "activeStatus" : "inactiveStatus";
}

function checkStatusAndEmail(element, company) {
	var email = company.email;
	var status = company.status;
	if (email != "-" && status != "Nieaktywny" && status != "Zawieszony") {
		element.css('background-color', 'rgb(162 255 151)');
	}
}

function checkStatus(contentElement, company) {
	var status = company.status;
	if (status == "Nieaktywny" || status == "Zawieszony") {
		contentElement.css('filter', 'opacity(0.4)');
	}
}

function appendMaskToDocument() {
	if ($('.lmask').length < 1) {
		document.body.innerHTML += "<div class='lmask' style='display: none;'></div>";
	}
}

$(document).ajaxStop(function () {
	$('.lmask').hide();
});


const style = '.iconDownload{width:21px;position:relative;float:right;cursor:pointer;} .data{font-weight:bold;} .status{font-weight:800;} .status.activeStatus{color:green;} .status.inactiveStatus{color:red;} .additionalInformation{border:1px solid #484848;padding:5px;margin: 5px;} .lmask{position:fixed;height:100%;width:100%;background-color:#000;bottom:0;left:0;right:0;top:0;z-index:9999999999999;opacity:.8}.lmask.fixed{position:fixed}.lmask:before{content:"";background-color:rgba(0,0,0,0);border:5px solid rgba(0,183,229,0.9);opacity:.9;border-right:5px solid rgba(0,0,0,0);border-left:5px solid rgba(0,0,0,0);border-radius:50px;box-shadow:0 0 35px #2187e7;width:100px;height:100px;-moz-animation:spinPulse 1s infinite ease-in-out;-webkit-animation:spinPulse 1s infinite linear;margin:-25px 0 0 -25px;position:absolute;top:50%;left:50%}.lmask:after{content:"";background-color:rgba(0,0,0,0);border:5px solid rgba(0,183,229,0.9);opacity:.9;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-radius:50px;box-shadow:0 0 15px #2187e7;width:60px;height:60px;-moz-animation:spinoffPulse 1s infinite linear;-webkit-animation:spinoffPulse 1s infinite linear;margin: -5px 0 0 -5px;position:absolute;top:50%;left:50%}@-moz-keyframes spinPulse{0%{-moz-transform:rotate(160deg);opacity:0;box-shadow:0 0 1px #2187e7}50%{-moz-transform:rotate(145deg);opacity:1}100%{-moz-transform:rotate(-320deg);opacity:0}}@-moz-keyframes spinoffPulse{0%{-moz-transform:rotate(0deg)}100%{-moz-transform:rotate(360deg)}}@-webkit-keyframes spinPulse{0%{-webkit-transform:rotate(160deg);opacity:0;box-shadow:0 0 1px #2187e7}50%{-webkit-transform:rotate(145deg);opacity:1}100%{-webkit-transform:rotate(-320deg);opacity:0}}@-webkit-keyframes spinoffPulse{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}';
const icon = '<svg class="iconDownload" onClick="run()" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="53.334px" viewBox="0 0 53.334 53.334" xml:space="preserve"><g><g><path d="M36.209,29.461c-0.392-0.393-1.022-0.393-1.414,0l-7.127,7.125V1c0-0.553-0.447-1-1-1c-0.553,0-1,0.447-1,1v35.586l-7.126-7.125c-0.391-0.393-1.023-0.393-1.414,0c-0.391,0.389-0.391,1.021,0,1.413l8.833,8.832c0.092,0.093,0.203,0.165,0.324,0.216C26.408,39.973,26.537,40,26.668,40s0.26-0.027,0.383-0.078c0.121-0.051,0.232-0.123,0.324-0.216l8.834-8.832C36.599,30.482,36.599,29.85,36.209,29.461z"/><path d="M40.332,12.666h-3.019h-2.146h-1.979h-0.021v0.005c-0.541,0.011-0.979,0.45-0.979,0.995c0,0.545,0.438,0.984,0.979,0.996v0.004h0.021h1.979h2.146h3.019c2.573,0,4.67,2.095,4.67,4.67v27.328c0,2.575-2.097,4.67-4.67,4.67H13.004c-2.574,0-4.67-2.095-4.67-4.67V19.336c0-2.575,2.096-4.67,4.67-4.67h3.018h2.146h1.979h0.021v-0.004c0.542-0.012,0.979-0.451,0.979-0.996c0-0.544-0.437-0.982-0.979-0.995v-0.005h-0.021h-1.979h-2.147h-3.018c-3.678,0-6.67,2.992-6.67,6.67v27.328c0,3.678,2.992,6.67,6.67,6.67h27.328c3.678,0,6.67-2.992,6.67-6.67V19.336C47.002,15.658,44.009,12.666,40.332,12.666z"/></g></svg>';
var sheet = document.createElement('style');
sheet.innerHTML = style;
document.body.appendChild(sheet);
$('.componentHeader').append(icon);
