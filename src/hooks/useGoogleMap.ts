import { Loader } from "@googlemaps/js-api-loader";
import { MutableRefObject, useEffect, useState } from "react";

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["geometry", "places"],
});

export function useGoogleMap(ref: MutableRefObject<HTMLElement>) {
  const [map, setMap] = useState(null);
  const [google, setGoogle] = useState(null);

  if (ref == null || typeof window === "undefined") {
    return { map, google };
  }

  useEffect(() => {
    loader.load().then((googleSrc) => {
      setGoogle(googleSrc);
      setMap(
        new googleSrc.maps.Map(ref.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        })
      );
    });
  }, [ref]);

  return {
    google,
    map,
  };
}
