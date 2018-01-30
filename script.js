window.addEventListener('load', ()=>{
	let currentSite = 1;
	
	sendRequest = (currentSite) =>{
		let url = 'http://jbzdy.pl/strona/' + currentSite;
		let req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.addEventListener("load", () => {
			if(req.status == 200 && req.readyState == 4){
				convert(req.responseText);
			}
			else{
				console.log("errr");
			}
		});
		req.send(null);
	}
	
	convert = (site) =>{
			let arr = [];
			site = site.slice(site.indexOf('<div class="image rolled">'), site.length);
			site = site.slice(0,site.indexOf('<!-- Billboard__SG_bottom -->'));
			for(let i=0;i<8;i++){
				let x = site.slice(site.indexOf("<img src="),site.indexOf(" />"));
				x = x.slice(x.indexOf("https://"),x.indexOf(".jpg")+4);
				arr[i]=x;
				site = site.slice(site.indexOf('<div class="media">'),site.length);
				site = site.slice(site.indexOf('<div class="image rolled">'),site.length);
			}
			let allImages = '';
			for(let i=0;i<8;i++){
				allImages = allImages + '<img src="' + arr[i] + '"/>';
			}
			let imagesElement = document.querySelector(".images");
			imagesElement.innerHTML = allImages;
	}
	sendRequest(currentSite);
	prevRequest = () =>{
		if(currentSite!==1) currentSite-=1;
		sendRequest(currentSite);
		window.scrollTo(0,0);
	}
	nextRequest = () =>{
		currentSite+=1;
		sendRequest(currentSite);
		window.scrollTo(0,0);
	}
	let btn = document.getElementsByClassName("next-btn")[0];
	let pbtn = document.getElementsByClassName("prev-btn")[0];
	btn.addEventListener('click',nextRequest,false);
	pbtn.addEventListener('click',prevRequest,false);
})
