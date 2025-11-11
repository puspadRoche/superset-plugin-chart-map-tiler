# superset-plugin-chart-map-tiler

A custom visualization plugin for **Apache Superset 3.1.0** that renders a **MapLibre GL** map using a **MapTiler** style.  
Includes a **fake-data fallback** so charts render even when the query is empty.

## Features
- MapLibre GL + MapTiler `style.json`
- Configurable center / zoom
- Lat/Lon/Label controls
- Fake demo data fallback
- Built for Superset 3.1.0

## Quickstart
```bash
# inside Superset frontend (3.1.0)
npm install superset-plugin-chart-map-tiler
# or link locally

## Documentation
Full step-by-step guide → [docs/getting-started.md](./docs/getting-started.md)

## Screenshot
<p align="left">
  <img src="./docs/screenshots/chart.png" alt="MapTiler map in Superset plugin" width="650"/>
</p>
