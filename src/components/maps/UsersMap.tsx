import { RootQueryToUserConnectionEdge } from 'client';
import { useGoogleMap } from 'hooks/useGoogleMap';
import { PropsWithChildren, useEffect, useRef } from 'react';
import styles from './styles.module.css';

interface UsersMapProps {
    users: RootQueryToUserConnectionEdge[];
}

export function UsersMap({ users }: PropsWithChildren<UsersMapProps>) {
    const mapRef = useRef(null as HTMLDivElement);
    const { map, google } = useGoogleMap(mapRef);
    const populatedUsers = users.filter(({ node: { meetupInfo: { location } } }) => !!location.latitude && !!location.longitude);

    useEffect(() => {
        if (map == null || google == null || populatedUsers.length === 0) return;

        const bounds = new google.maps.LatLngBounds();
        const infowindow = new google.maps.InfoWindow();

        populatedUsers.forEach(({ node: { firstName, lastName, meetupInfo: { location } } }) => {
            const latLng = new google.maps.LatLng(location.latitude, location.longitude);
            const marker = new google.maps.Marker({
                position: latLng,
                map: map
            });

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
    }, [map, google, populatedUsers.length]);

    return (
        <>
            <p>Map goes here...</p>
            <div style={{ width: 600, height: 600 }} ref={mapRef} />
        </>
        // <div className={styles['google-map']}>
        //     <GoogleMapReact
        //         bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        //         defaultCenter={usCenter}
        //         defaultZoom={4}
        //     >
        //         {users.map(({ node: { id = '', meetupInfo: { location } } }) => {
        //             return (
        //                 <UserPin
        //                     key={id}
        //                     lat={location.latitude}
        //                     lng={location.longitude}
        //                     text={`${location.city}, ${location.state}`}
        //                 />
        //             )
        //         })}
        //     </GoogleMapReact>
        // </div>
    )
}