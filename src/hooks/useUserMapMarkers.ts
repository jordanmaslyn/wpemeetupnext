import { useEffect, useState } from "react";

export function useUserMapMarkers({map, google, users}) {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (map == null || google == null || users.length === 0) return;

        const bounds = new google.maps.LatLngBounds();
        const infowindow = new google.maps.InfoWindow();

        markers.forEach(m => m.setMap(null)); //clear out previous markers
        setMarkers([]); // reset marker array

        users.forEach(({ firstName, lastName, meetupInfo: { location } }) => {
            const latLng = new google.maps.LatLng(location.latitude, location.longitude);
            const marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
            setMarkers((existingMarkers) => [...existingMarkers, marker]);

            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'click', (function (marker) {
                return function () {
                    infowindow.setContent(`${firstName} ${lastName} (${location.city}, ${location.state})`);
                    infowindow.open(map, marker);
                }
            })(marker));
        });

        map.fitBounds(bounds);
        map.panToBounds(bounds);
    }, [map, google, users.length]);
}