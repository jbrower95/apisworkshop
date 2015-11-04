/* Examples with the flickr API */

/* Caption lists */
var captions_few = [
	"Dawwwww",
	"Yummy",
	"Awww, what a cute wittle puppy",
	"Excuse me, is this your dog?"
];

var captions_several = [
	"Woah...haha, lots of dogs",
	"Hey there, try taking it easy on the dogs",
	"It's not that I don't like dogs...",
	"I mean, do you really need this many dogs?",
	"Alright, alright...it's your web page",
	"*laughs nervously*",
];

var captions_many = [
	"Stop. Too many dogs.",
	"I thought there couldn't be enough, but now there are too many",
	"I...I have to leave",
	"You made this what it is, now you have to face the consequences",
	"*prays*",
	"*sobs*",
	"*begs*"
];

/**
 * Given a source URL, puts a new image on the web page dynamically.
 *
 * @param url - A url of an image to insert 
 *			ex: "http://images.google.com/dog.jpg"
 */
function insertImage(url) {
	var img = document.createElement("img");
	img.className = "puppy";
	img.src = url;
	$('#imageContainer').append(img);
}

/**
 * Given a list of images returned from the ajax request, add each of them
 * to the document.
 *
 * @param data - raw data object from the flickr api
 *
 */
function insertImages(data) {
	/* Clear the current images */
	$("#imageContainer").empty();

	/* Get the photos from the data returned by flickr */
	var images = data.getElementsByTagName('photo');

	/* Variables constructing the image url
	 *
	 * hint: We are using this template
	 * https://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpg
	 *
	 */
	var url;

	/* TODO: Set the base url */
	var baseURL = "https://farm";

	/* TODO: construct the url for each image, and add each image with
	 *	insertImage.
	 *
	 * hints:
	 *
	 * 1) Use image[i] to get the next image on each iteration of
	 *	the loop.
	 *
	 * 2) Use image[i].getAttribute("blabla") to get a specific
	 *	attribute, such as the id of the object
	 *
	 */
	for(var i = 0; i < images.length; i++)
	{
		/* TODO: reset the url */
		url = baseURL;

		/* TODO: add the farm */
		url += images[i].getAttribute('farm');

		/* Add the next part of the url */
		url += ".staticflickr.com/";

		/* TODO: add the server */
		url += images[i].getAttribute('server');

		/* Add the next part of the url */
		url += "/";

		/* TODO: add the id */
		url += images[i].getAttribute('id');

		/* Add the next part of the url */
		url += "_";

		/* TODO: add the secret */
		url += images[i].getAttribute('secret');

		/* Add the file suffix */
		url += ".jpg";

		/* TODO: insert the image */
		insertImage(url);
	}

	/* Comment this out to remove captions */
	var captions = (images.length > 4) ? captions_several : captions_few;
	captions = (images.length > 8) ? captions_many : captions;
	var randCaption = captions[Math.floor(Math.random() * captions.length)];

	$(".caption").text(randCaption);
	/* Comment this out to remove captions */
}


$(document).ready(function() {
	// Exapmle flickr API request. (from https://www.flickr.com/services/api/request.rest.html)
	/* https://api.flickr.com/services/rest/?method=flickr.test.echo&name=value */

	/* Execute this when the page is loaded */
	searchForImages(["puppy"], 5, 1);
});


/* Data structure, storing values associated with flickr API requests */
var flickrAPI = {
	METHOD_SEARCH: "flickr.photos.search",
	PARAM_TAGS: "tags",
	API_KEY: "d557e9b6d52263fc3df09c1bd09f03fd"
};


/**
 * Instigates a Flickr search for images tagged as "key". Returns "count" number of images.
 *   e.x: searchForImages("dog", 10) returns 10 pictures of dogs.
 *
 */
function searchForImages(taglist, count, page) {
	/* Indicates that we're making a REST request.
	 * This is the base url from which we will construct the request. */
	var url = "https://api.flickr.com/services/rest/";

	/* TODO: Set the search method to the search method specified in
	 * the flickrAPI object above */
	url += "?method=" + flickrAPI.METHOD_SEARCH;

	/* TODO: Set the api key to the api key specified in the flickrAPI
	 * object above */
	url += "&api_key=" + flickrAPI.API_KEY;

	/* TODO: Set the tags to a comma separated list of the values in
	 * taglist */
	url += "&tags=" + taglist.join();

	/* TODO: Set the number of results to display */
	url += "&per_page=" + count;

	/* TODO: Set the page offset to page */
	url += "&page=" + page;

	/* TODO: Set the callback
	 * hint: See which of the other methods might be a good fit... */
	$.get(url).then(insertImages);
}


