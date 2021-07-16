import { useEffect, useState } from "react";
import { getLocationString } from "../utilities/strings";
import MarkerClusterer from '@googlemaps/markerclustererplus';

export function useUserMapMarkers({ map, google, users, allUsers }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map == null || google == null) return;

    let usersToShow = users;
    if (usersToShow.length === 0) {
      usersToShow = allUsers;
    }

    const bounds = new google.maps.LatLngBounds();
    const infowindow = new google.maps.InfoWindow();

    markers.forEach((m) => m.setMap(null)); //clear out previous markers
    setMarkers([]); // reset marker array

    usersToShow.forEach(({ firstName, lastName, meetupInfo: { location } }) => {
      const latLng = new google.maps.LatLng(location.latitude, location.longitude);
      const marker = new google.maps.Marker({
        position: latLng,
        // map: map,
      });
      setMarkers((existingMarkers) => [...existingMarkers, marker]);

      bounds.extend(marker.position);

      google.maps.event.addListener(
        marker,
        "click",
        (function (marker) {
          return function () {
            infowindow.setContent(`${firstName} ${lastName} (${getLocationString(location)})`);
            infowindow.open(map, marker);
          };
        })(marker)
      );
    });

    map.fitBounds(bounds);
    map.panToBounds(bounds);

    const markerCluster = new MarkerClusterer(map, markers,
        {imagePath: `/images/m`});
  }, [map, google, users.length, MarkerClusterer]);
}
