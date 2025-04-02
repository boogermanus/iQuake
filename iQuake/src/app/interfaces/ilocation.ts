import { LatLng } from "leaflet";

export interface ILocation {
    latLng: LatLng;
    mag: number;
    range: number;
}
