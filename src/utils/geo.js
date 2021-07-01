
import { PermissionsAndroid, Platform } from "react-native";
import { init, Geolocation } from "react-native-amap-geolocation";
import axios from "axios";
class Geo {
  // async initGeo() {
  //   if (Platform.OS === "android") {
  //     await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
  //   }
  //   await init({
  //     ios: "e8b092f4b23cef186bd1c4fdd975bf38",
  //     android: "e8b092f4b23cef186bd1c4fdd975bf38"
  //   });
  //   return Promise.resolve();
  // }
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log("开始定位");
      Geolocation.getCurrentPosition(({ coords }) => {
        // console.log(coords)
        resolve(coords);
      }, reject);
    })
  }
  async getCityByLocation() {
    // if (Platform.OS === "android") {
    //   //     await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    //   //   }
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ])
    await init({
      android: "0540239b37af97aa3055dc427ef38f5b"
    });
    const { longitude, latitude } = await this.getCurrentPosition();
    console.log(longitude, latitude)
    const res = await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
      params: { location: `${longitude},${latitude}`, key: "100af84be8b817ec6017fc6bbff875e0", }
    });
    return Promise.resolve(res.data);
  }
}


export default new Geo();