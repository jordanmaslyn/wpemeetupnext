import { User } from "client";
import { PropsWithChildren } from "react";

interface UserListEntryProps {
    user: User;
}

export function UserListEntry({ user }: PropsWithChildren<UserListEntryProps>) {
    const sendEmail = e => window.open(`mailto:${user.meetupInfo.email}`);
    const sendPhoneCall = e => window.open(`tel:${user.meetupInfo.phoneNumber}`);

    return (
        <>
            <span>{user.firstName} {user.lastName}</span> -{' '}
            <span>{user.meetupInfo.location.city}, {user.meetupInfo.location.state}</span>
            <div>
                {user.meetupInfo.email && <button onClick={sendEmail}>Email Me</button>}
                {user.meetupInfo.phoneNumber && <button onClick={sendPhoneCall}>Call Me</button>}
            </div>
        </>
    );
}