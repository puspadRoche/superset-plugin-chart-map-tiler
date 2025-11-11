import React, { useEffect, useMemo, useRef } from 'react';
import maplibregl, { Map, GeoJSONSource } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapTilerProps } from './types';

const sourceId = 'points-source';
const layerId = 'points-layer';

const toGeoJSON = (pts: { lon: number; lat: number; label?: string }[]) => ({
  type: 'FeatureCollection',
  features: pts.map(p => ({
    type: 'Feature',
    properties: { label: p.label || '' },
    geometry: { type: 'Point', coordinates: [p.lon, p.lat] },
  })),
});

export default function MapTilerChart({ width, height, formData, data }: MapTilerProps) {
  const el = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const geojson = useMemo(() => toGeoJSON(data), [data]);

  useEffect(() => {
    if (!el.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: el.current,
      style: formData.mapStyleUrl,
      center: formData.initialCenter,
      zoom: formData.initialZoom,
      attributionControl: true,
    });

    mapRef.current.on('load', () => {
      const map = mapRef.current!;
      map.addSource(sourceId, { type: 'geojson', data: geojson as any });
      map.addLayer({
        id: layerId,
        type: 'circle',
        source: sourceId,
        paint: {
          'circle-radius': 6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#000',
          'circle-color': '#3bb2d0',
        },
      });

      map.on('click', layerId, e => {
        const f = e.features?.[0];
        const label = (f?.properties as any)?.['label'] || '';
        const coords =
          (f?.geometry as any)?.coordinates ||
          e.lngLat?.toArray?.(); // [lng, lat]

        if (coords) {
          new maplibregl.Popup()
            .setLngLat(coords)
            .setHTML(`<div>${label}</div>`)
            .addTo(map);
        }
      });


      map.on('mouseenter', layerId, () => map.getCanvas().style.cursor = 'pointer');
      map.on('mouseleave', layerId, () => map.getCanvas().style.cursor = '');
    });

    return () => { mapRef.current?.remove(); mapRef.current = null; };
  }, [formData.mapStyleUrl, formData.initialCenter, formData.initialZoom]);

  useEffect(() => {
    const src = mapRef.current?.getSource(sourceId) as GeoJSONSource | undefined;
    if (src) src.setData(geojson as any);
  }, [geojson]);

  return <div ref={el} style={{ width, height }} />;
}
