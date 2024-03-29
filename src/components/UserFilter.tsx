import { User } from "client";
import { useCallback } from "react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

interface UserFilterProps {
  allUsers: User[];
  google: any;
  map: any;
  onChange: (users: User[]) => void;
}

const distances = [5, 10, 25, 50, 100, 250, 500];

export function UserFilter({
  allUsers,
  google,
  map,
  onChange: handleOnChange,
}: PropsWithChildren<UserFilterProps>) {
  const [filtering, setFiltering] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [distance, setDistance] = useState(distances[Math.floor(distances.length / 2)]);
  const [location, setLocation] = useState(null);
  const originRef = useRef(null);

  const filterUsers = useCallback(
    ({ filteredLocation, filteredDistance }): User[] => {
      const filtered = allUsers.filter((user) => {
        const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(filteredLocation),
          new google.maps.LatLng({
            lat: user.meetupInfo.location.latitude,
            lng: user.meetupInfo.location.longitude,
          })
        );
        const distanceInMiles = distanceInMeters * 0.000621371;
        return distanceInMiles <= filteredDistance;
      });
      setFilteredUsers(filtered);
      return filtered;
    },
    [allUsers, google?.maps.geometry.spherical, google?.maps.LatLng]
  );

  useEffect(() => {
    if (originRef.current == null || !filtering) return;

    const options = {
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
      types: ["(cities)"],
    };

    const updateLocation = (autocomplete) => () => {
      const place = autocomplete.getPlace();

      if (place.geometry?.location == null) return;

      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setLocation(newLocation);
      handleOnChange(filterUsers({ filteredLocation: newLocation, filteredDistance: distance }));
    };

    const autocomplete = new google.maps.places.Autocomplete(originRef.current, options);
    autocomplete.bindTo("bounds", map);
    autocomplete.addListener("place_changed", updateLocation(autocomplete));
  }, [filtering, map, google?.maps.places.Autocomplete, handleOnChange, filterUsers, distance]);

  if (google == null || map == null) return null;

  const handleFilterToggle = (e) => {
    const checked = e.target.checked;
    setFiltering(checked);

    if (!checked) {
      setLocation(null);
      setFilteredUsers(allUsers);
    }

    if (!checked || !location) {
      handleOnChange(allUsers);
      return;
    }

    handleOnChange(filterUsers({ filteredDistance: distance, filteredLocation: location }));
  };

  const handleDistanceChange = (e) => {
    const newDistance = Number(e.target.value);
    setDistance(newDistance);

    if (!!location) {
      handleOnChange(filterUsers({ filteredDistance: newDistance, filteredLocation: location }));
    }
  };

  const handleEmailGroup = () => {
    window.open(
      `mailto:${filteredUsers
        .filter((user) => user.meetupInfo.email != null)
        .map((user) => user.meetupInfo.email)
        .join(",")}`
    );
  };

  return (
    <div className="max-w-5xl mx-auto mb-4 mt-6 flex">
      <div className="flex-auto">
        <label htmlFor="enableDistanceFilter">
          <input
            type="checkbox"
            name="enableDistanceFilter"
            id="enableDistanceFilter"
            checked={filtering}
            onChange={handleFilterToggle}
            className="mr-2"
          />
          <span>
            {filtering ? null : (
              <span>
                <strong>Not</strong> currently filtering by proximity:
              </span>
            )}
          </span>
        </label>
        {filtering && (
          <span>
            Folks within{" "}
            <select value={distance} onChange={handleDistanceChange}>
              {distances.map((distance) => (
                <option value={distance} key={distance}>
                  {distance}
                </option>
              ))}
            </select>{" "}
            miles of <input ref={originRef} type="text" placeholder="Location" />
          </span>
        )}
      </div>
      <div className="flex-none">
        <button
          className="bg-brand-primary-teal py-1 px-2 rounded-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleEmailGroup}
          disabled={
            !filtering ||
            !location ||
            filteredUsers.filter((user) => user.meetupInfo.email != null).length === 0
          }
        >
          Email Group
        </button>
      </div>
    </div>
  );
}
