# Artfocus LazyImage

Simple script making images lazy loaded.


## Usage

* Create normal `<img>` except `src` and/or `srcset` attributes - prefix them with `data-`:

	```
	<img data-src="/assets/images/small.jpg"
		 data-srcset="/assets/images/small.jpg 768w, /assets/images/large.jpg 1920w"
		 class="whatever you-want">
	```
	
	All of your attributes will be preserved.

* Link the scripts to your HTML file:

	```
	<script src="/path/to/jquery/jquery.js"></script>
	<script src="/path/to/lazyImage/lazyImage.js"></script>
	```

* Run the script:

	```
	<script>
		new LazyImage.LazyImage('[data-src], [data-srcset]');
	</script>
	```


## Any issues, proposals?

You can help us improve this library - please use Issues or Pull requests.


## License

This library is under [MIT License](LICENSE).
