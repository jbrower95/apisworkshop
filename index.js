/* Examples with the flickr API */

/**
 * Given a source URL, puts a new image on the web page dynamically.
 *
 * @param source - A url of an image to insert 
 *			ex: "http://images.google.com/dog.jpg"
 */
function insertImage(source) {
	var img = document.createElement("img");
	img.class = "puppy";
	img.src = source;
	$("#imageContainer").append(img);
}


$(document).ready(function() {

	// Exapmle flickr API request. (from https://www.flickr.com/services/api/request.rest.html)
	/* https://api.flickr.com/services/rest/?method=flickr.test.echo&name=value */
	searchForImages("dog", 10);
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

	/* Indicates that we're making a REST request. */
	url = "http://api.flickr.com/services/rest/";

	/* Indicates the method we're choosing */
	url += "?method=" + flickrAPI.METHOD_SEARCH;

	/* Indicates the API key for this client. */
	url += "&api_key=" + flickrAPI.API_KEY;

	/* Indicates that we're requesting images tagged as 'key' */
	url += "&tags=" + key;

	/* Number of results to show on the page returned -- this is our count. */
	url += "&per_page=" + count;

	$.get(url).then(function(data) {
		console.log(data);
	});
}


