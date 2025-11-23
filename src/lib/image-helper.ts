import data from './placeholder-images.json';

type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

const imageMap = new Map<string, ImagePlaceholder>(
  data.placeholderImages.map((img) => [img.id, img])
);

export function findImage(id: string): ImagePlaceholder | undefined {
  return imageMap.get(id);
}
