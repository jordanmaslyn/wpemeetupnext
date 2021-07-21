import { useGoogleMap } from "hooks/useGoogleMap";
import { useEffect, useRef, useState } from "react";
import { User } from "client";
import { UserList } from "components/UserList";
import { useUserMapMarkers } from "hooks/useUserMapMarkers";
import { UserFilter } from "components/UserFilter";

interface UsersMapProps {
    users: User[];
    isLoading: boolean;
}

export function UsersMap({ users, isLoading }: UsersMapProps) {
    const mapRef = useRef(null as HTMLDivElement);
    const { map, google } = useGoogleMap(mapRef);

    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        setFilteredUsers(users);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users.length]);

    useUserMapMarkers({ map, google, users: filteredUsers, allUsers: users });

    return (
        <>
            <div style={{ width: "100%", height: 600, maxHeight: "50vh" }} ref={mapRef} />
            <div className="container mx-auto">
                <UserFilter
                    onChange={(users) => setFilteredUsers(users)}
                    allUsers={users}
                    google={google}
                    map={map}
                />
                <UserList users={filteredUsers} loading={isLoading} />
            </div>
        </>
    );
}
