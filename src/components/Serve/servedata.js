// servedata.js
// All content and map data for the "Where we serve" section.
// Edit this file to add or change locations; serve.js needs no changes.

export const SERVE_CONTENT = {
  title: "Where we serve",
  lead:
    "A head office in Delhi and branches at mining and power hubs across Odisha, Uttar Pradesh, Madhya Pradesh, Jharkhand, Andhra Pradesh and Telangana, so parts, fuel and transport reach your site faster.",
  mapLabel: "Map of Samarveer branch locations across India",
};

// Equirectangular projection onto a 600 x 600 canvas.
export const MAP = { width: 600, height: 600, lonMin: 68, latMax: 37.5, scale: 20 };

export const project = (lon, lat) => ({
  x: (lon - MAP.lonMin) * MAP.scale,
  y: (MAP.latMax - lat) * MAP.scale,
});

// Simplified outline of India as [longitude, latitude] points (stylised, not survey-accurate).
export const INDIA_OUTLINE = [
  [74, 37], [77, 35.5], [79, 34], [80, 30.5], [84, 28.5], [88, 27.8], [92, 27.8],
  [95, 29], [97, 28], [96, 27], [94, 24], [93, 22], [92, 24], [91, 25.5], [89, 26],
  [88.5, 24], [89, 22], [87, 21.5], [86.5, 20], [84.5, 19], [82, 16.5], [80.3, 15.5],
  [80, 13], [79.8, 11], [78, 8.3], [77, 8.1], [76.3, 9.5], [75, 12.5], [73.5, 16],
  [72.8, 19], [72.5, 21], [70, 20.8], [69, 22.5], [70.5, 23.2], [68.5, 23.8], [71, 25],
  [70, 27], [72, 29.5], [74, 31], [74.5, 32.5], [74, 34],
];

// label: where the city name sits next to its pin (anchor: start | middle | end).
// pin: if set, this city shares the map pin of another city (listed only, no own pin).
export const CITIES = [
  { id: "delhi", name: "Delhi", state: "Delhi", role: "Head office", isHq: true,
    lon: 77.21, lat: 28.61, label: { anchor: "end", dx: -12, dy: 4 } },
  { id: "barbil", name: "Barbil", state: "Odisha", role: "Branch",
    lon: 85.38, lat: 22.1, label: { anchor: "start", dx: 12, dy: 4 } },
  { id: "singrauli", name: "Singrauli", state: "Madhya Pradesh", role: "Branch",
    lon: 82.7, lat: 24.2, mapLabel: "Singrauli / Anpara", label: { anchor: "middle", dx: 0, dy: -14 } },
  { id: "anpara", name: "Anpara", state: "Uttar Pradesh", role: "Branch",
    lon: 82.7, lat: 24.2, pin: "singrauli" },
  { id: "satna", name: "Satna", state: "Madhya Pradesh", role: "Branch",
    lon: 80.83, lat: 24.58, label: { anchor: "end", dx: -12, dy: 4 } },
  { id: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", role: "Branch",
    lon: 83.22, lat: 17.69, label: { anchor: "start", dx: 12, dy: 4 } },
  { id: "hazaribagh", name: "Hazaribagh", state: "Jharkhand", role: "Branch",
    lon: 85.36, lat: 23.99, label: { anchor: "start", dx: 12, dy: 4 } },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", role: "Branch",
    lon: 78.48, lat: 17.38, label: { anchor: "end", dx: -12, dy: 4 } },
];