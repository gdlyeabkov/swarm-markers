<template>
  <div class="root">
    <div class="aside">
      <div
        class="aside__item"
        draggable="true"
        style="background-image: url('https://optim.tildacdn.com/tild3765-3730-4238-a637-626237373238/-/resize/254x/-/format/webp/2.png')"
        @dragend="drop('https://optim.tildacdn.com/tild3765-3730-4238-a637-626237373238/-/resize/254x/-/format/webp/2.png')" />
      <div
        class="aside__item"
        draggable="true"
        style="background-image: url('https://optim.tildacdn.com/tild6230-6330-4139-b264-323335393336/-/resize/180x/-/format/webp/noroot.png')"
        @dragend="drop('https://optim.tildacdn.com/tild6230-6330-4139-b264-323335393336/-/resize/180x/-/format/webp/noroot.png')" />
      <div
        class="aside__item"
        draggable="true"
        style="background-image: url('https://optim.tildacdn.com/tild3763-3962-4331-b431-353965623639/-/resize/280x/-/format/webp/12.png')"
        @dragend="drop('https://optim.tildacdn.com/tild3763-3962-4331-b431-353965623639/-/resize/280x/-/format/webp/12.png')" />
      <div
        class="aside__item"
        draggable="true"
        style="background-image: url('https://optim.tildacdn.com/tild6434-3263-4333-b934-633765646364/-/resize/354x/-/format/webp/1_2.png')"
        @dragend="drop('https://optim.tildacdn.com/tild6434-3263-4333-b934-633765646364/-/resize/354x/-/format/webp/1_2.png')" />
      <div
        class="aside__item"
        draggable="true"
        style="background-image: url('https://optim.tildacdn.com/tild6137-6166-4237-b930-323963346363/-/resize/330x/-/format/webp/9.png')"
        @dragend="drop('https://optim.tildacdn.com/tild6137-6166-4237-b930-323963346363/-/resize/330x/-/format/webp/9.png')" />
      <div
        class="aside__item"
        draggable="true"
        style="background-image: url('https://optim.tildacdn.com/tild3066-6334-4362-b633-323435643436/-/resize/336x/-/format/webp/6.png')"
        @dragend="drop('https://optim.tildacdn.com/tild3066-6334-4362-b633-323435643436/-/resize/336x/-/format/webp/6.png')" />
      <div
        class="aside__item"
        draggable="true"
        style="background-image: url('https://optim.tildacdn.com/tild3338-3432-4532-a335-313438356635/-/resize/348x/-/format/webp/5.png')"
        @dragend="drop('https://optim.tildacdn.com/tild3338-3432-4532-a335-313438356635/-/resize/348x/-/format/webp/5.png')" />
      <div
        class="aside__item"
        draggable="true"
        style="background-image: url('https://optim.tildacdn.com/tild3730-6532-4131-b365-616536623163/-/resize/352x/-/format/webp/17cfc42ea0c99ff.jpg')"
        @dragend="drop('https://optim.tildacdn.com/tild3730-6532-4131-b365-616536623163/-/resize/352x/-/format/webp/17cfc42ea0c99ff.jpg')" />
      <div
        class="aside__item"
        draggable="true"
        style="background-image: url('https://optim.tildacdn.com/tild3538-6561-4639-b230-306563373031/-/resize/302x/-/format/webp/11.png')"
        @dragend="drop('https://optim.tildacdn.com/tild3538-6561-4639-b230-306563373031/-/resize/302x/-/format/webp/11.png')" />
    </div>
    <yandex-map
      :class="{ 'map-overlay': isShiftActive && isMarkerActive }"
      ref="map"
      v-model="mapModel"
      :settings="{
        location: {
          center: [37.617644, 55.755819],
          zoom: 9,
        },
      }"
      width="100%"
      height="100vh"
    >
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-listener :settings="{ onMouseDown: logMapClick, onMouseUp: () => {draggable = true; isMarkerActive = false}, onUpdate: scrollZoom }" />
      <yandex-map-marker v-for="(marker, i) in markers" :key="marker.iconSrc" :settings="{ coordinates: marker.coordinates, draggable: true, iconRotate: '64' }" position="top-center left-center" ref="marker">
        <div class="pin--wrap" @mousedown="rotate($event, marker, i)">
          <yandex-map-feature
            :style="`transform-origin: center; transform: rotate(${marker.rotate}deg)`"
            :settings="{
            id: marker.iconSrc,
            draggable: false,
            geometry: {
              type: 'Polygon',
              coordinates: [
                marker.featuresCoords,
              ],
            },
            style: {
              fill: '#ccc',
              stroke: [{ color: '#ccc', width: 0 }],
            },
          }"
          />
          <img
            class="pin"
            :src="marker.iconSrc"
            :style="`transform: rotate(${marker.rotate}deg); ${draggable ? 'cursor: crosshair' : 'cursor: nesw-resize'}`"
          />
        </div>
      </yandex-map-marker>
    </yandex-map>
  </div>
</template>

<script>
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapMarker, YandexMapFeature,
YandexMapListener,
} from 'vue-yandex-maps';
import arc from 'svg-arc';
import { initYmaps } from "vue-yandex-maps"
export default {
  name: 'App',
  data: () => ({
    isShiftActive: false,
    isMarkerActive: false,
    featuresCoords: [],
    featureModel: null,
    mapModel: null,
    draggable: true,
    activeMarker: null,
    activeFeature: 0,
    markers: [],
  }),
  mounted() {
    initYmaps().then(() => {
      // Yandex Maps API is now loaded and accessible
      // You can initialize your map here
      new window.ymaps3.YMapFeature({
        geometry: {
          type: 'Circle',
          coordinates: [87.5,56.0],
        },
        style: {stroke: [{color: '#006efc', width: 4, dash: [5, 10]}], fill: 'rgba(56, 56, 219, 0.5)'}
      });
    });
    window.addEventListener("keydown", (e) => {
      this.isShiftActive = e.shiftKey;
    });
    window.addEventListener("keyup", () => {
      this.isShiftActive = false;
    });
    window.addEventListener("mouseup", () => {
      if (this.activeMarker) this.activeMarker.draggable = true;
      this.activeMarker = null;
    });
    window.addEventListener("mousemove", (e) => {
      this.draggable = true;
      if (this.activeMarker && e.shiftKey)
        this.activeMarker.rotate += e.movementY;
      if (this.activeMarker) {
        this.activeMarker.draggable = false;
        this.draggable = !e.shiftKey;
        const map = this.mapModel;
        const mapChildren = map.children;
        const index = this.markers.findIndex(e => e === this.activeMarker);
        const marker = mapChildren[index + 4 + 1 * index];
        const lat = marker.coordinates[0];
        const lon = marker.coordinates[1];
        console.log(`index: ${index}, lat: ${lat}, lon: ${lon}`);
        // Координаты центра сектора
        var centerCoordinates = [lat, lon];
        const sectorPoints = this.updateCoords(centerCoordinates);
        this.activeMarker.featuresCoords = sectorPoints;
        // send payload to backend
      }
    });
  },
  methods: {
    scrollZoom() {
      // alert("scrollZoom");
    },
    logMapClick(e) {
      try {
        if (e.type === "marker") this.draggable = false;
        this.isMarkerActive = e.type === "marker";
      } catch (e) {
        // TODO
      }
      console.log(`this.isMarkerActive: ${this.isMarkerActive}`);
    },
    degrees_to_radians(degrees){
      // Store the value of pi.
      var pi = Math.PI;
      // Multiply degrees by pi divided by 180 to convert to radians.
      return degrees * (pi/180);
    },
    toLongitude(x) {
      return x * 180 / 500;
    },
    toLatitude(y) {
      return -y * 180 / 500 + 90;
    },
    radius(marker) {
      const sector = arc({
        x: 250,
        y: 250,
        r: 500,
        start: marker.angleStart,
        end: marker.angleEnd,
        // start: 0,
        // end: 45,
      });
      // alert(sector);
      /*
       * rotated corner radius
       */
      return `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500' transform='rotate(${marker.rotate})'%3E%3Cpath fill='rgba(225, 225, 225, 0.6)' stroke='rgba(225, 225, 225, 0.6)' d='${sector}' /%3E%3C/svg%3E")`;
      /*
       * unrotated corner radius
       */
      // return `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Cpath fill='rgba(225, 225, 225, 0.6)' stroke='rgba(225, 225, 225, 0.6)' d='${sector}' /%3E%3C/svg%3E")`;
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    rotate(event, marker, i) {
      this.activeMarker = marker;
      this.activeFeature = i;
      this.activeMarker.draggable = !event.shiftKey;
    },
    updateCoords(coords) {
      // Координаты центра сектора
      var centerCoordinates = coords;
      // Радиус сектора в метрах
      // var radius = 0.01;
      var radius = 0.5;
      // var radius = 0.14;
      // Углы начала и конца сектора в радианах
      const start = 0;
      const end = 90;
      let delta = 0;
      if (this.activeMarker) delta = this.activeMarker.rotate;
      var startAngle = this.degrees_to_radians(start - delta); // Начало сектора с угла 45 градусов
      var endAngle = this.degrees_to_radians(end - delta); // Конец сектора с угла 90 градусов
      var sectorPoints = [];
      if (end >= 360) {
        // Создание координат вершин
        for (var i = 0; i < 30; i++) {
          let angle = 2 * Math.PI * i / 30;
          let x = centerCoordinates[0] + radius * Math.cos(angle);
          let y = centerCoordinates[1] + radius * Math.sin(angle) / 1.78;
          sectorPoints.push([x, y]);
        }
      } else {
        // Создаем массив точек сектора
        sectorPoints.push(centerCoordinates); // Добавляем центр сектора
        for (let angle = startAngle; angle <= endAngle; angle += 0.001) {
            let x = centerCoordinates[0] + radius * Math.cos(angle);
            let y = centerCoordinates[1] + radius * Math.sin(angle) / 1.78;
            sectorPoints.push([x, y]);
        }
        sectorPoints.push(centerCoordinates); // Замыкаем сектор
      }

      // setTimeout(() => {
      //   const objs = document.querySelectorAll(`g`);
      //   const containers = [];
      //   objs.forEach((o) => o.id.length ? containers.push(o) : false);
      //   containers.map((container) => {
      //     if (container.children.length > 1) {
      //       let arcEl = document  .createElementNS("http://www.w3.org/2000/svg", "path");
      //       const sector = arc({
      //         x: container.getBoundingClientRect().width / 5000,
      //         y: container.getBoundingClientRect().height / 5000,
      //         r: container.getBoundingClientRect().width / 2,
      //         start: 0,
      //         end: 360,
      //       });
      //       arcEl.setAttribute("d", sector);
      //       arcEl.setAttribute("stroke", "red");
      //       container.appendChild(arcEl);
      //     } else {
      //       let arcEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      //       const sector = arc({
      //         x: container.getBoundingClientRect().width / 500,
      //         y: container.getBoundingClientRect().height / 500,
      //         r: container.getBoundingClientRect().width / 2,
      //         start: 0,
      //         end: 360,
      //       });
      //       arcEl.setAttribute("d", sector);
      //       arcEl.setAttribute("stroke", "red");
      //       container.appendChild(arcEl);
      //     }
      //   });
      // }, 1000);
      return sectorPoints;
    },
    drop(src) {
      // Координаты центра сектора
      var centerCoordinates = [37.617644, 55.755819];
      const sectorPoints = this.updateCoords(centerCoordinates);
      const angleStart = this.getRndInteger(0, 360);
      const angleEnd = this.getRndInteger(angleStart, 360);
      this.markers.push({
        featuresCoords: sectorPoints,
        coordinates: centerCoordinates,
        iconSrc: src,
        onClick: () => {},
        draggable: true,
        rotate: 0,
        radius: "",
        angleStart: angleStart,
        angleEnd: angleEnd,
      });
    },
  },
  components: {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMapMarker,
    YandexMapFeature,
    // YandexMapClusterer,
    YandexMapListener,
  },
  watch: {
    "$refs.map.zoom"() {
      // alert(val);
    },
    isShiftActive(val) {
      console.log(`shift: ${val}`);
    }
  },
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
.pin--wrap {
  border-radius: 100%;
  width: 75px;
  height: 75px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.pin {
  max-width: unset;
  width: 75px;
  height: 75px;
  border-radius: 1000%;
  position: relative;
  z-index: 5;
}
.root {
  display: flex;
}
.aside {
  background-color: #fff;
  width: 300px;
  height: 100vh;
  column-gap: 8px;
  padding: 8px;
}
.aside__item {
  margin: 5px;
  float: left;
  width: 50px;
  height: 50px;
  max-width: 50px;
  max-height: 50px;
  overflow: hidden;
  border-radius: 8px;
  background-image: url("https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png");
  background-size: 100%;
  background-repeat: no-repeat;
}
.map-overlay {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Disables user interaction */
  z-index: 0;
}
ymaps g {
  pointer-events: none;
}
</style>
