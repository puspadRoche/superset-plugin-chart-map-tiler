export type MapTilerFormData = {
  mapStyleUrl: string;             // https://api.maptiler.com/.../style.json?key=YOUR_MAPTILER_KEY
  initialZoom: number;             // e.g., 2
  initialCenter: [number, number]; // [lng, lat]
  latColumn?: string;
  lonColumn?: string;
  labelColumn?: string;
};

export type MapPoint = { lon: number; lat: number; label?: string };

export type MapTilerProps = {
  width: number;
  height: number;
  formData: MapTilerFormData;
  data: MapPoint[];
};
