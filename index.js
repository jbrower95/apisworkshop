/* Examples with the flickr API */

/* Caption lists */
var captions_few = [
	"Dawwwww",
	"Yummy",
	"Awww, what a cute wittle puppy",
	"Excuse me, is this your dog?",
	"Doge."
];

var captions_several = [
	"Woah...haha, lots of dogs",
	"Hey there, try taking it easy on the dogs",
	"It's not that I don't like dogs...",
	"I mean, do you really need this many dogs?",
	"Alright, alright...it's your web page",
	"*laughs nervously*"
];

var captions_many = [
	"Stop. Too many dogs.",
	"How could you let this happen??",
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
	/* TODO: Construct the image tag */

	/* TODO: Append the image tag to imageContainer */
}

function doSearch() {
	var text = $("#searchBar").val();
	text = text.split(/[ ,]+/);
	searchForImages(text, 5, 1);
}

/**
 * Given a list of images returned from the ajax request, add each of them
 * to the document.
 *
 * @param data - raw data object from the flickr api
 *
 */
function insertImages(data) {
	/* Get the photos from the data returned by flickr */
	var images = data.getElementsByTagName('photo');

	/* TODO: Clear the current images */

	for(var i = 0; i < images.length; i++)
	{
		/* TODO: Create the image using insertImage */
		/* hint: you can get the url for the image by using the
		 * function getImageURL() */
	}

	/* Set the caption */
	setCaption(images.length);
}


$(document).ready(function() {
	/* Execute this when the page is loaded */
	searchForImages(["puppy"], 5, Math.floor(Math.random() * 10));
	$("#searchBar").val("puppy");
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
 * @param taglist - Array of tags to search for using the api
 * @param count - Number of results to return
 * @param page - The page number from which to return the results
 *
 */
function searchForImages(taglist, count, page) {
	/* Indicates that we're making a REST request.
	 * This is the base url from which we will construct the request. */
	var url = "https://api.flickr.com/services/rest/";

	/* TODO: Set the search method to the search method specified in
	 * the flickrAPI object above */

	/* TODO: Set the api key to the api key specified in the flickrAPI
	 * object above */

	/* TODO: Set the tags to a comma separated list of the values in
	 * taglist */

	/* TODO: Set the number of results to display */

	/* TODO: Set the page offset to page */

	/* TODO: Set the callback
	 * hint: See which of the other methods might be a good fit... */
	$.get(url).then();
}

/**
 * Given an xml image object from flickr, construct the corresponding
 * image url, using the format:
 *	https://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpg
 *
 * @param image - xml image object from flickr
 *
 */
function getImageURL(image)
{
	var url = "https://farm";
	url += image.getAttribute('farm');
	url += ".staticflickr.com/";
	url += image.getAttribute('server');
	url += "/";
	url += image.getAttribute('id');
	url += "_";
	url += image.getAttribute('secret');
	url += ".jpg";
	return url;
}

/* Caption lists */
var captions_few = [
	"Dawwwww",
	"Yummy",
	"Awww, what a cute wittle puppy",
	"Excuse me, is this your dog?",
	"Doge."
];

var captions_several = [
	"Woah...haha, lots of dogs",
	"Hey there, try taking it easy on the dogs",
	"It's not that I don't like dogs...",
	"I mean, do you really need this many dogs?",
	"Alright, alright...it's your web page",
	"*laughs nervously*"
];

var captions_many = [
	"Stop. Too many dogs.",
	"How could you let this happen??",
	"I...I have to leave",
	"You made this what it is, now you have to face the consequences",
	"*prays*",
	"*sobs*",
	"*begs*"
];

/**
 * Set the caption based on the number of images
 *
 * @param count - the number of images
 *
 */
function setCaption(count)
{
	if($("#searchBar").val() == "puppy")
	{
		var captions = (count > 4) ? captions_several : captions_few;
		captions = (count > 8) ? captions_many : captions;
		var randCaption = captions[Math.floor(Math.random() * captions.length)];
		$(".caption").text(randCaption);
	}
	else
	{
		$(".caption").empty();
	}
}
















