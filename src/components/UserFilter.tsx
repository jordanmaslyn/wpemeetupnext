import { User } from "client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

interface UserFilterProps {
    allUsers: User[];
    google: any;
    map: any;
    onChange: (users: User[]) => void;
}

const distances = [5, 10, 25, 50, 100, 250, 500];

export function UserFilter({ allUsers, google, map, onChange: handleOnChange }: PropsWithChildren<UserFilterProps>) {
    const [filtering, setFiltering] = useState(false);
    const [distance, setDistance] = useState(distances[Math.floor(distances.length / 2)])
    const [location, setLocation] = useState(null);
    const originRef = useRef(null);

    const updateLocation = (autocomplete) => () => {
        const place = autocomplete.getPlace();

        if (place.geometry?.location == null) return;

        const newLocation = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        setLocation(newLocation);
        handleOnChange(filterUsers(newLocation));
    };

    const options = {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: false,
        types: ["(cities)"],
    };

    useEffect(() => {
        if (originRef.current == null || !filtering) return;

        const autocomplete = new google.maps.places.Autocomplete(originRef.current, options);
        autocomplete.bindTo("bounds", map);
        autocomplete.addListener("place_changed", updateLocation(autocomplete));
    }, [originRef.current, filtering]);

    if (google == null || map == null) return null;

    const filterUsers = (filteredLocation = location): User[] => {
        return allUsers.filter(user => {
            const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(filteredLocation), new google.maps.LatLng({ lat: user.meetupInfo.location.latitude, lng: user.meetupInfo.location.longitude }))
            const distanceInMiles = distanceInMeters * 0.000621371;
            return distanceInMiles <= distance;
        });
    }

    const handleFilterToggle = e => {
        const checked = e.target.checked;
        setFiltering(checked);

        if (!checked || !location) {
            handleOnChange(allUsers);
            return;
        }

        handleOnChange(filterUsers());
    }

    return (
        <div>
            <label htmlFor="enableDistanceFilter">
                <input type="checkbox" name="enableDistanceFilter" id="enableDistanceFilter" checked={filtering} onChange={handleFilterToggle} />
                <span>{filtering ? <span>Currently filtering by proximity:</span> : <span><strong>Not</strong> currently filtering by proximity:</span>}</span>
            </label>
            {
                filtering && (
                    <div>
                        Folks within <select value={distance} onChange={e => setDistance(Number(e.target.value))}>{distances.map(distance => (<option value={distance} key={distance}>{distance}</option>))}</select> miles of <input ref={originRef} type="text" placeholder="Location" />
                    </div>
                )
            }
        </div>
    );
}