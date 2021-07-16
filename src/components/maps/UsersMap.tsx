import { useGoogleMap } from "hooks/useGoogleMap";
import { useEffect, useRef, useState } from "react";
import { client, RootQueryToUserConnectionEdge } from "client";
import { UserList } from "components/UserList";
import { useUserMapMarkers } from "hooks/useUserMapMarkers";
import { UserFilter } from "components/UserFilter";

export function UsersMap() {
    const mapRef = useRef(null as HTMLDivElement);
    const { map, google } = useGoogleMap(mapRef);

    const {
        users,
        $state: { isLoading },
    } = client.useQuery({
        prepare({ prepass, query }) {
            prepass(query.users, 'id', 'firstName', 'lastName', 'meetupInfo.email', 'meetupInfo.phoneNumber', 'meetupInfo.exclude', 'meetupInfo.location.latitude', 'meetupInfo.location.longitude');
        },
        suspense: false,
    });
    const isNotExcluded = ({ node }: RootQueryToUserConnectionEdge) => !node.meetupInfo.exclude;
    const hasLocation = ({ node }: RootQueryToUserConnectionEdge) =>
        node.meetupInfo?.location != null;
    const displayedUsers = users({first: 100}).edges.filter(isNotExcluded).filter(hasLocation);
    const populatedUsers = displayedUsers
        .filter(
            ({
                node: {
                    firstName,
                    lastName,
                    meetupInfo: { location },
                },
            }) => !!location.latitude && !!location.longitude
        )
        .map((user) => user.node);

    const [filteredUsers, setFilteredUsers] = useState(populatedUsers);

    useEffect(() => {
        setFilteredUsers(populatedUsers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [populatedUsers.length]);

    useUserMapMarkers({ map, google, users: filteredUsers, allUsers: populatedUsers });

    return (
        <>
            <div style={{ width: "100%", height: 600, maxHeight: "50vh" }} ref={mapRef} />
            <div className="container mx-auto">
                <UserFilter
                    onChange={(users) => setFilteredUsers(users)}
                    allUsers={populatedUsers}
                    google={google}
                    map={map}
                />
                <UserList users={filteredUsers} loading={isLoading} />
            </div>
        </>
    );
}
