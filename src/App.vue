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
      :class="{ 'map-overlay': !draggable }"
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
      <yandex-map-marker v-for="marker in markers" :key="marker.iconSrc" :settings="{ coordinates: marker.coordinates, draggable: true, iconRotate: '64' }" position="top-center left-center" ref="marker">
        <div class="pin--wrap" :style="activeMarker === marker ? `background-color: #ccc; ${radius}` : marker.radius">
          <img
            @mousedown="rotate($event, marker)"
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
import { VueYandexMaps } from 'vue-yandex-maps';
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapMarker} from 'vue-yandex-maps';
export default {
  name: 'App',
  data: () => ({
    mapModel: null,
    draggable: true,
    activeMarker: null,
    markers: [],
  }),
  mounted() {
    console.log(`maps: ${VueYandexMaps.settings.value}`) //ref
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
        const marker = mapChildren[index + 2];
        const lat = marker.coordinates[0];
        const lon = marker.coordinates[1];
        console.log(`index: ${index}, lat: ${lat}, lon: ${lon}`);
        // send payload to backend
      }
    });
  },
  methods: {
    radius() {
      const corner = this.getRndInteger(0, 360);
      return `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500' transform='rotate(${corner})'%3E%3Ccircle fill='transparent' stroke='rgba(225, 225, 225, 0.4)' stroke-width='265' stroke-dashoffset='500' stroke-dasharray='calc((250 + 5) * 250 / 100) 250' cx='250' cy='250' r='100' /%3E%3C/svg%3E");`;
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    rotate(event, marker) {
      this.activeMarker = marker;
      this.activeMarker.draggable = !event.shiftKey;
    },
    drop(src) {
      this.markers.push({
        coordinates: [37.617644, 55.755819],
        iconSrc: src,
        onClick: () => {},
        draggable: true,
        rotate: 0,
        radius: this.radius(),
      });
    },
  },
  components: {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMapMarker,
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
  width: 250px;
  height: 250px;
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
  border-radius: 50%;
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
</style>