/* Examples with the flickr API */

// Caption list
var captions_few = [
	"Dawwwww",
	"Yummy",
	"Awww, what a cute wittle puppy",
	"Excuse me, is this your dog?"
];

var captions_many = [
	"Woah...haha, lots of dogs",
	"Hey there, try taking it easy on the dogs",
	"It's not that I don't like dogs...",
	"I mean, do you really need this many dogs?",
	"Alright, alright...it's your web page.",
];

/**
 * Given a source URL, puts a new image on the web page dynamically.
 *
 * @param source - A url of an image to insert 
 *			ex: "http://images.google.com/dog.jpg"
 */
function insertImage(source, container) {
	var img = document.createElement("img");
	img.className = "puppy";
	img.src = source;
	container.append(img);
}

/**
 * Given a list of images returned from the ajax request, add each of them
 * to the document.
 *
 * @param images - image objects in xml form from the flickr api
 *			ex: "http://images.google.com/dog.jpg"
 */
function insertImages(images) {
	var container = $("#imageContainer");
	var baseURL = "https://farm";
	var url;
	var i;

	container.empty();
	console.log(images[0].getAttribute('farm'));

	for(i = 0; i < images.length; i++)
	{
		url = baseURL;
		url += images[i].getAttribute('farm');
		url += ".staticflickr.com/";
		url += images[i].getAttribute('server');
		url += "/";
		url += images[i].getAttribute('id');
		url += "_";
		url += images[i].getAttribute('secret');
		url += ".jpg";

		insertImage(url, container);
	}

	/** IGNORE **/
	var captions = (images.length > 4) ? captions_many : captions_few;
	var randCaption = captions[Math.floor(Math.random() * captions.length)];
	$(".caption").text(randCaption);
	/** IGNORE **/
}


$(document).ready(function() {
	// Exapmle flickr API request. (from https://www.flickr.com/services/api/request.rest.html)
	/* https://api.flickr.com/services/rest/?method=flickr.test.echo&name=value */

	searchForImages("puppy", 3);
});


flickrAPI = {
	METHOD_SEARCH: "flickr.photos.search",
	PARAM_TAGS: "tags",
	API_KEY: "d557e9b6d52263fc3df09c1bd09f03fd"
};


/**
 * Instigates a Flickr search for images tagged as "key". Returns "count" number of images.
 *   e.x: searchForImages("dog", 10) returns 10 pictures of dogs.
 *
 * Returns:
 *	A promise to load these images.
 */
function searchForImages(key, count) {
	/** FORMAT REQUEST **/

	/* Indicates that we're making a REST request. */
	var url = "https://api.flickr.com/services/rest/";

	/* Indicates the method we're choosing */
	url += "?method=" + flickrAPI.METHOD_SEARCH;

	/* Indicates the API key for this client. */
	url += "&api_key=" + flickrAPI.API_KEY;

	/* Indicates that we're requesting images tagged as 'key' */
	url += "&tags=" + key;

	/* Number of results to show on the page returned -- this is our count. */
	url += "&per_page=" + count;

	/* Send the request to flickr, and call the callback once the response
	 * is received */

	/** SEND REQUEST AND CALLBACK **/
	$.get(url).then(function(data) {
		insertImages(data.getElementsByTagName('photo'));
	});
}


var RattyAPI = {
	CLIENT_ID: "workshop"
};

/**
  * Downloads the current meal from the Ratty.
  * 
  * 
  */
function getRattyMenu() {
	var url = "https://api.students.brown.edu";

	// Use the /dining/menu endpoint
	url += "/dining/menu";

	// Apply our client id
	url +="?client_Id=" + RattyAPI.CLIENT_ID;

	// Ask for the ratty.
	url += "&eatery=ratty";

	// Send this request
	$.get(url).then(function(data) {
		processRattyData(data);
	});
}





