const zoom = 14;
const earthRadius = 6371008.8; // copied from maplibre-gl src/geo/lng_lat.ts
export const earthCircumfrence = 2 * Math.PI * earthRadius; // meters
export const extent = 4096;
export const featureScale = earthCircumfrence / (extent * Math.pow(2, zoom));
export const zoomScale = Math.pow(2, zoom);
