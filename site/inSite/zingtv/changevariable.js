Object.defineProperty(window, "flObject",
	{ value: {major: 0, minor: 0, release: 0}
	}
);
Object.freeze(window.flObject);

Object.defineProperty(window, "customVideo",
	{
		value: {
			jumpTo: "",
			timeout: "",
			poster: "",
			enV: "",
			isHasSrcThumbnaisBase: "",
			srcThumbnaisBase: "",
			nextVideoHint: ""
		}
	}
);
Object.seal(window.customVideo);
