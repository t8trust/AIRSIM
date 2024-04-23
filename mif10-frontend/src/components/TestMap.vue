<template>
  <div ref="map-root" style="width: 100%; height: 86vh"></div>
</template>

<script>
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { fromLonLat } from 'ol/proj.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Icon, Style } from 'ol/style.js';
import { LineString } from 'ol/geom.js';
import { Stroke} from 'ol/style.js';
import arc from 'arc';

export default {
  name: 'MapContainer',
  data() {
    return {
      airports: [
        { name: 'Dakar', lon: -17.4479, lat: 14.6928 },
        { name: 'Londres', lon: -0.1276, lat: 51.5074 }
      ]
    };
  },
  mounted() {
    const airportSource = new VectorSource();
    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: './marker_icon.png',
        width: 18,
        eight: 18
      }),
    });
    const airportLayer = new VectorLayer({
      source: airportSource,
      style: markerStyle,
    });

    const map = new Map({
      target: this.$refs['map-root'],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        airportLayer,
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });
 
    this.airports.forEach(airport => {
      this.addAirportMarker(map, airportSource, airport.lon, airport.lat, airport.name);
    });

    const lineStyle = new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 2,
      }),
    });

    const arcFeatures = this.generateArcLine(
      [this.airports[0].lon, this.airports[0].lat],
      [this.airports[1].lon, this.airports[1].lat]
    );

    console.log(arcFeatures)

    const arcLayer = new VectorLayer({
      source: new VectorSource({
        features: arcFeatures,
      }),
      style: lineStyle,
    });


    map.addLayer(arcLayer);

  },
  methods: {
    addAirportMarker(map, source, lon, lat, name) {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
        name: name,
      });
      source.addFeature(iconFeature);
    },

    generateArcLine(from, to) {
      const arcGenerator = new arc.GreatCircle(
        { x: from[0], y: from[1] },
        { x: to[0], y: to[1] }
      );

      const arcLine = arcGenerator.Arc(100, { offset: 10 });
      
      const features = [];
      console.log(arcLine.geometries)
      arcLine.geometries.forEach(geometry => {
        const line = new LineString(geometry.coords);
        line.transform('EPSG:4326', 'EPSG:3857');

        features.push(
          new Feature({
            geometry: line,
            finished: true,
          }),
        );

      });

      return features;
    }
  },
  
};
</script>
