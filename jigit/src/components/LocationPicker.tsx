import { useEffect, useRef, useState } from "react";
import PencilIcon from "./PencilIcon";

const LocationPicker = ({
  onLocationChange,
}: {
  onLocationChange: (
    latitude: number,
    longitude: number,
    address: string
  ) => void;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [focusedLocationInput, setFocusedLocationInput] = useState(false);

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (
        window.google?.maps?.Map &&
        window.google?.maps?.marker?.AdvancedMarkerElement &&
        window.google?.maps?.places &&
        window.google?.maps?.Geocoder
      ) {
        setIsLoaded(true);
      } else {
        setTimeout(checkGoogleMaps, 100);
      }
    };

    checkGoogleMaps();
  }, []);

  useEffect(() => {
    if (mapRef.current && !map && isLoaded) {
      const initialPosition = { lat: 42.6977, lng: 23.3219 };
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: initialPosition,
        zoom: 14,
        mapId: "MAP_ID",
      });

      const markerInstance = new google.maps.marker.AdvancedMarkerElement({
        position: initialPosition,
        map: mapInstance,
        gmpDraggable: true,
      });

      markerInstance.addListener("dragend", () => {
        const pos = markerInstance.position;
        if (pos) {
          const lat = typeof pos.lat === "function" ? pos.lat() : pos.lat;
          const lng = typeof pos.lng === "function" ? pos.lng() : pos.lng;
          reverseGeocode(lat, lng);
        }
      });

      setMap(mapInstance);
      setMarker(markerInstance);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (autocompleteRef.current && isLoaded && map && marker) {
      const autocomplete = new google.maps.places.Autocomplete(
        autocompleteRef.current
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
          marker.position = place.geometry.location;
          map.setCenter(place.geometry.location);
          onLocationChange(latitude, longitude, place.formatted_address || "");
        }
      });
    }
  }, [map, marker, onLocationChange, isLoaded]);

  const reverseGeocode = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK && results && results[0]) {
        onLocationChange(lat, lng, results[0].formatted_address);
      }
    });
  };

  return (
    <>
      {!isLoaded ? (
        <p>Loading Google Maps</p>
      ) : (
        <>
          <div className="flex gap-4 w-full items-center">
            <img src="/LocationIcon.svg" alt="Location" />
            <div
              className={`flex items-center py-4 px-3 border rounded-sm w-full ${
                focusedLocationInput
                  ? "border-primary1 caret-primary1 text-primary1"
                  : "border-secondary2 text-secondary2"
              }`}
              onMouseEnter={() => setFocusedLocationInput(true)}
              onMouseLeave={() => setFocusedLocationInput(false)}
            >
              <input
                ref={autocompleteRef}
                placeholder="Add Location"
                type="text"
                className="w-full"
              />
              <PencilIcon
                color={
                  focusedLocationInput
                    ? "#4110ea"
                    : autocompleteRef
                    ? "#250d77"
                    : "666666"
                }
              />
            </div>
          </div>
          <div ref={mapRef} className="w-full aspect-square max-h-4/5" />
        </>
      )}
    </>
  );
};

export default LocationPicker;
