export interface MediaFormat {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: string;
	size: number;
	width: number;
	height: number;
}

export interface Formats {
	large: MediaFormat;
	medium: MediaFormat;
	small: MediaFormat;
	thumbnail: MediaFormat;
}

export interface Media {
	id: string;
	src: string;
	alt: string;
	formats: Formats;
}

export type MediaCarousel = Array<Media>;
