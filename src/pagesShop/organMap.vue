<template>
    <div class="c">
<map id="map" :longitude="longitude" :latitude="latitude" scale="16" :markers="markers" :circles="circles" show-location style="width: 100%; height: 100vh;"></map>

    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      longitude: 0,
      latitude: 0,
      markers: [
        {
          iconPath: "http://img.meiduduo.com/images/xyy/position.png",
          // title: "石家庄贵美人医院",
          id: 0,
          latitude: 0,
          longitude: 0,
          width: 30,
          height: 40,
          callout: {
            content: "",
            color: "#000",
            fontSize: 12,
            borderRadius: 10,
            display: "ALWAYS",
            padding: 5
          }
        }
      ],
      controls: [
        {
          id: 1,
          iconPath: "http://img.meiduduo.com/images/mineItem/infro.png",
          position: {
            left: 0,
            top: 300 - 50,
            width: 50,
            height: 50
          },
          clickable: true
        }
      ],
      circles: [
        {
          latitude: "40.007153",
          longitude: "116.491081",
          color: "#efbb44",
          fillColor: "#7cb5ec88",
          radius: 400,
          strokeWidth: 1
        }
      ],
      polyline: [
        {
          points: [
            {
              longitude: "116.481451",
              latitude: "40.006822"
            },
            {
              longitude: "116.487847",
              latitude: "40.002607"
            },
            {
              longitude: "116.496507",
              latitude: "40.006103"
            }
          ],
          color: "#FF0000DD",
          width: 3,
          dottedLine: true
        }
      ]
    };
  },
  onShow() {
    this.latitude = this.$root.$mp.query.lat;
    this.longitude = this.$root.$mp.query.lng;
    this.markers[0].latitude = this.$root.$mp.query.lat;
    this.markers[0].longitude = this.$root.$mp.query.lng;
    this.markers[0].callout.content =
      this.$root.$mp.query.organName + "\n" + this.$root.$mp.query.address;
    this.circles[0].latitude = this.$root.$mp.query.lat;
    this.circles[0].longitude = this.$root.$mp.query.lng;
    console.log(this.$root.$mp.query.lat);
    console.log(this.markers[0]);
  },
  computed: {
    ...mapState(["userInfo"]),
    latitude() {
      return this.userInfo.latitude;
    },
    longitude() {
      return this.userInfo.longitude;
    }
  }
};
</script>
