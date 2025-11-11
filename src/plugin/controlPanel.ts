import { t, validateNumber } from '@superset-ui/core';
import { sections } from '@superset-ui/chart-controls';

export default {
  controlPanelSections: [
    {
      label: t('Map'),
      expanded: true,
      controlSetRows: [
        [{
          name: 'mapStyleUrl',
          config: {
            type: 'TextControl',
            label: t('Map Style URL'),
            description: t('MapTiler style.json URL'),
            default: 'https://api.maptiler.com/maps/streets/style.json?key=YOUR_MAPTILER_KEY',
          },
        }],
        [{
          name: 'initialCenter',
          config: {
            type: 'TextControl',
            label: t('Initial Center [lng,lat]'),
            description: t('E.g. 0,20'),
            default: '0,20',
            renderTrigger: true,
          },
        }],
        [{
          name: 'initialZoom',
          config: {
            type: 'TextControl',
            label: t('Initial Zoom'),
            default: '2',
            renderTrigger: true,
            validators: [validateNumber],
          },
        }],
      ],
    },
    {
      label: t('Data'),
      expanded: true,
      controlSetRows: [
        [{ name: 'groupby', config: { type: 'MetricsControl', label: t('Unused') } }],
        [{ name: 'latColumn',  config: { type: 'SelectControl', freeForm: true, label: t('Latitude Column'),  default: 'lat' } }],
        [{ name: 'lonColumn',  config: { type: 'SelectControl', freeForm: true, label: t('Longitude Column'), default: 'lon' } }],
        [{ name: 'labelColumn',config: { type: 'SelectControl', freeForm: true, label: t('Label Column'),     default: 'name' } }],
      ],
    },
    sections.annotationsAndLayersSection,
  ],
};
