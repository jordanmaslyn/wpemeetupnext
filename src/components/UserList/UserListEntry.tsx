import { User } from "client";
import { PropsWithChildren } from "react";
import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
interface UserListEntryProps {
  user: User;
}

export function UserListEntry({ user }: PropsWithChildren<UserListEntryProps>) {
  const phoneNumber = user?.meetupInfo?.phoneNumber;
  const emailAddress = user?.meetupInfo?.email;

  return (
    <div className="user-list-grid max-w-5xl mx-auto">
      <span className="user-name">
        {user?.firstName} {user?.lastName}
      </span>
      <span className="user-location">
        {user?.meetupInfo?.location?.city}, {user?.meetupInfo?.location?.state}, {user?. meetupInfo?.location?.countryShort}
      </span>
      <span className="user-email">
        {emailAddress ? (
          <a href={`mailto:${emailAddress}`} title="Email">
            <span className="sr-only">Email</span>
            <MailIcon className="w-4 inline" />
            {emailAddress}
          </a>
        ) : (
          <p>
            <em>Not shared</em>
          </p>
        )}
      </span>
      <span className="user-phone">
        {phoneNumber ? (
          <a href={`tel:${phoneNumber}`} title="Phone Number">
            <span className="sr-only">Phone Number</span>
            <PhoneIcon className="w-4 inline" />
            {phoneNumber}
          </a>
        ) : (
          <p>
            <em>Not shared</em>
          </p>
        )}
      </span>
    </div>
  );
}
