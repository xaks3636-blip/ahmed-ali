import { StyleOption, FilterOption } from './types';

export const STYLES: StyleOption[] = [
  { id: 'realistic', labelEn: 'Photorealistic', labelAr: 'واقعية', promptSuffix: 'highly detailed, 8k resolution, photorealistic, cinematic lighting', image: 'https://picsum.photos/id/237/200/200' },
  { id: 'anime', labelEn: 'Anime', labelAr: 'أنمي', promptSuffix: 'anime style, vibrant colors, clean lines, high quality digital art', image: 'https://picsum.photos/id/101/200/200' },
  { id: 'fantasy', labelEn: 'Fantasy', labelAr: 'خيال', promptSuffix: 'epic fantasy art, ethereal lighting, intricate details, magical atmosphere', image: 'https://picsum.photos/id/249/200/200' },
  { id: 'oil', labelEn: 'Oil Painting', labelAr: 'رسم زيتي', promptSuffix: 'classical oil painting, visible brushstrokes, rich textures, museum quality', image: 'https://picsum.photos/id/102/200/200' },
  { id: 'cyberpunk', labelEn: 'Cyberpunk', labelAr: 'سايبر بانك', promptSuffix: 'cyberpunk aesthetic, neon lights, futuristic city, rainy night, synthwave', image: 'https://picsum.photos/id/103/200/200' }
];

export const FILTERS: FilterOption[] = [
  { id: 'upscale', labelEn: 'Upscale', labelAr: 'رفع الجودة', promptSuffix: 'Enhance the resolution and add fine realistic details to this image while maintaining its original composition.', icon: 'fa-up-right-and-down-left-from-center' },
  { id: 'denoise', labelEn: 'Denoise', labelAr: 'تنقية', promptSuffix: 'Remove digital noise and grain from this image, making it clear and smooth while preserving edges.', icon: 'fa-broom' },
  { id: 'vangogh', labelEn: 'Van Gogh', labelAr: 'فان جوخ', promptSuffix: 'Reimagine this image in the style of Vincent van Gogh, with thick expressive brushstrokes and swirling patterns.', icon: 'fa-palette' },
  { id: 'object-removal', labelEn: 'Smart Edit', labelAr: 'تعديل ذكي', promptSuffix: 'Carefully modify the image based on the following instruction while keeping everything else exactly the same:', icon: 'fa-wand-magic' },
  { id: 'sketch', labelEn: 'Pencil Sketch', labelAr: 'رسم يدوي', promptSuffix: 'Convert this image into a professional detailed pencil sketch on textured paper.', icon: 'fa-pencil' },
  { id: 'clear', labelEn: 'Remove BG', labelAr: 'إزالة الخلفية', promptSuffix: 'Keep the main subject exactly as is but replace the background with a clean, solid studio white backdrop.', icon: 'fa-user-slash' }
];