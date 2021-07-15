import { useGoogleMap } from 'hooks/useGoogleMap';
import { useEffect, useRef, useState } from 'react';
import { client, RootQueryToUserConnectionEdge } from 'client';
import { UserListEntry } from 'components/UserListEntry';
import styles from './styles.module.css';
import { useUserMapMarkers } from 'hooks/useUserMapMarkers';
import { UserFilter } from 'components/UserFilter';

export function UsersMap() {
    const mapRef = useRef(null as HTMLDivElement);
    const { map, google } = useGoogleMap(mapRef);

    const { users } = client.useQuery();
    const isNotExcluded = ({ node }: RootQueryToUserConnectionEdge) => !node.meetupInfo.exclude;
    const hasLocation = ({ node }: RootQueryToUserConnectionEdge) => node.meetupInfo?.location != null;
    const displayedUsers = users().edges.filter(isNotExcluded).filter(hasLocation);
    const populatedUsers = displayedUsers.filter(({ node: { meetupInfo: { location } } }) => !!location.latitude && !!location.longitude).map(user => user.node);

    const [filteredUsers, setFilteredUsers] = useState(populatedUsers);

    useEffect(() => {
        setFilteredUsers(populatedUsers);
    }, [populatedUsers.length]);

    useUserMapMarkers({map, google, users: filteredUsers});

    return (
        <>
            <p>Map goes here...</p>
            <div style={{ width: 600, height: 600 }} ref={mapRef} />
            <UserFilter onChange={users => setFilteredUsers(users)} allUsers={populatedUsers} google={google} map={map} />
            <ul>
                {displayedUsers.map(({ node }, index) => {
                    return (
                        <li key={node?.id ?? index}>
                            <UserListEntry user={node} />
                        </li>
                    )
                })}
            </ul>
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