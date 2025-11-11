import { ChartProps } from '@superset-ui/core';
import { MapPoint, MapTilerFormData, MapTilerProps } from './types';

export default function transformProps(chartProps: ChartProps): MapTilerProps {
  const { width, height, formData, queriesData } = chartProps;
  const fd = formData as unknown as MapTilerFormData;

  const center: [number, number] = (() => {
    try {
      const [lng, lat] = String(fd.initialCenter || '0,0').split(',').map(Number);
      return [lng, lat];
    } catch { return [0, 0]; }
  })();

  const rows = (queriesData?.[0]?.data || []) as Record<string, any>[];

  const data: MapPoint[] =
    rows.length > 0
      ? rows.map(r => ({
          lon: Number(r[fd.lonColumn || 'lon']),
          lat: Number(r[fd.latColumn || 'lat']),
          label: r[fd.labelColumn || 'name'],
        })).filter(p => Number.isFinite(p.lon) && Number.isFinite(p.lat))
      : [
          { lon: 0,    lat: 20,   label: 'Demo A' },
          { lon: 12.5, lat: 41.9, label: 'Demo B' },
          { lon: 103.8,lat: 1.35, label: 'Demo C' },
        ];

  return {
    width,
    height,
    formData: {
      ...fd,
      initialCenter: center,
      initialZoom: Number((fd as any).initialZoom ?? 2),
      mapStyleUrl: (fd as any).mapStyleUrl || 'https://api.maptiler.com/maps/streets/style.json?key=YOUR_MAPTILER_KEY',
    },
    data,
  };
}
