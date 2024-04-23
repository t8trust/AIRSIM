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
import { transformExtent } from "ol/proj"
import { fromLonLat } from 'ol/proj.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Icon, Style } from 'ol/style.js';
import { LineString } from 'ol/geom.js';
import { Stroke} from 'ol/style.js';
import arc from 'arc';

export default {
  name: 'MapComponent',
  emits: ["moveEnd"],
  data() {
    return {
      /** @type {Map} */
      map: {},
      arcSource: new VectorSource(),
      airportSource: new VectorSource(),
      airports: []
    };
  },
  mounted() {
    this.map = new Map({
      target: this.$refs['map-root'],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: './marker_icon.png',
        width: 18,
        height: 18
      }),
    });

    const lineStyle = new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 2,
      }),
    });

    const airportLayer = new VectorLayer({
      source: this.airportSource,
      style: markerStyle,
    });

    const arcLayer = new VectorLayer({
      source: this.arcSource,
      style: lineStyle,
    });

    this.map.addLayer(airportLayer);
    this.map.addLayer(arcLayer);
    this.map.addEventListener("moveend", e => this.$emit("moveEnd", e))

  },
  methods: {
    addAirportMarker(airport) {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat([airport.lon, airport.lat])),
        name: airport.name,
      });
      this.airportSource.addFeature(iconFeature);
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
    },

    getExtents(){
      const extent = this.map.getView().calculateExtent(this.map.getSize());
      return transformExtent(extent, 'EPSG:3857', 'EPSG:4326')
    },

    /**
     * @param {Airport} from 
     * @param {Airport} to 
     * */
    traceArc(from, to) {
      this.arcSource.addFeatures(
        this.generateArcLine([from.longitude, from.latitude], [to.longitude, to.latitude])
      )
    },

    clearArcs(){
      this.arcSource.clear();
    },
  },
  
};
</script>
