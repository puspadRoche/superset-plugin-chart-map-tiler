import { ChartPlugin, ChartMetadata, t } from '@superset-ui/core';
import controlPanel from './controlPanel';
import buildQuery from './buildQuery';
import transformProps from './transformProps';
import ReactComponent from './MapTilerChart';

const metadata = new ChartMetadata({
  name: t('MapTiler Map'),
  thumbnail: '',
  description: t('Render a MapLibre map using a MapTiler style and point features'),
  behaviors: [],
  tags: ['Map', 'MapLibre', 'MapTiler'],
});

export default class MapTilerPlugin extends ChartPlugin {
  constructor() {
    super({
      loadChart: () => Promise.resolve(ReactComponent),
      metadata,
      controlPanel,
      buildQuery,
      transformProps,
    });
  }
}
