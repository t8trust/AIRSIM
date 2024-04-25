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
import { transform, transformExtent } from "ol/proj"
import { fromLonLat } from 'ol/proj.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Icon, Style } from 'ol/style.js';
import { LineString } from 'ol/geom.js';
import { Stroke} from 'ol/style.js';
import arc from 'arc';


const CoordinateSystem = {
  map: 'EPSG:3857',
  lonlat: 'EPSG:4326'
}

/**
 * @param {MapLocation[]} array
 * @returns {Extent}
 */
function getExtentsForLocations(array){
  // Assert array has at least one element 
  if (array.length == 0)
    throw "getExtentsForArray needs at least one element inside the array";

  let initLoc = transform([array[0].longitude, array[0].latitude], CoordinateSystem.lonlat, CoordinateSystem.map);
  let minlon = initLoc[0]
  let maxlon = initLoc[0]
  let minlat = initLoc[1]
  let maxlat = initLoc[1]

  array.forEach(location => {
    location = transform([location.longitude, location.latitude], CoordinateSystem.lonlat, CoordinateSystem.map)
    if (location[0] < minlon) minlon = location[0]
    if (location[0] > maxlon) maxlon = location[0]
    if (location[1] < minlat) minlat = location[1]
    if (location[1] > maxlat) maxlat = location[1]
  })

  // Transform their extents into map coords (instead of lon, lat)
  return [minlon, minlat, maxlon, maxlat]
}

/**
 * @param {Extent} extent 
 * @returns {[x: number, y: number]}
 */
function getExtentsCenter(extent){
  return [(extent[2] + extent[0]) / 2, (extent[3] + extent[1]) / 2 ]
}

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
    /** @param { Airport } airport */
    addAirportMarker(airport) {
      this.airportSource.addFeature(new Feature({
        geometry: new Point(fromLonLat([airport.longitude, airport.latitude])),
        name: airport.nom,
      }));
    },

    _generateArcLine(from, to) {
      const arcGenerator = new arc.GreatCircle(
        { x: from[0], y: from[1] },
        { x: to[0], y: to[1] }
      );

      const arcLine = arcGenerator.Arc(100, { offset: 10 });
      
      const features = [];
      console.log(arcLine.geometries)
      arcLine.geometries.forEach(geometry => {
        const line = new LineString(geometry.coords);
        line.transform(CoordinateSystem.lonlat, CoordinateSystem.map);

        features.push(
          new Feature({
            geometry: line,
            finished: true,
          }),
        );

      });

      return features;
    },
    
    /**
     * @param {MapLocation[]} locations An array of locations, if multiple values, the map will zoom to fit all locations 
     */
    move(locations) {
      const view = this.map.getView();
      const duration = 1000;   

      let center = [locations[0].longitude, locations[0].latitude]   
      let zoom = view.getZoom()

      if (locations.length > 1){
        const extents = getExtentsForLocations(locations)
        const resolution = view.getResolutionForExtent(extents, this.map.getSize());
        center = getExtentsCenter(extents)
        zoom = view.getZoomForResolution(resolution);
        zoom -= zoom * 0.1
      }

      view.animate({center, duration});
      view.animate({zoom, duration});
    },

    getExtents(){
      const extent = this.map.getView().calculateExtent(this.map.getSize());
      return transformExtent(extent, CoordinateSystem.map, CoordinateSystem.lonlat)
    },

    /**
     * @param {Airport} from 
     * @param {Airport} to 
     * */
    traceArc(from, to) {
      this.arcSource.addFeatures(
        this._generateArcLine([from.longitude, from.latitude], [to.longitude, to.latitude])
      )
    },

    clearArcs(){
      this.arcSource.clear();
    },
    
    clearMarkers(){
      this.airportSource.clear();
    },
  },
  
};
</script>
