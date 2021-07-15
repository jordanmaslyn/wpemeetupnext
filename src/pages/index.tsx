import React from 'react';
import { AuthorizedContent } from 'components/AuthorizedContent';
import { client, RootQueryToUserConnectionEdge } from 'client';
import { UsersMap } from 'components/maps/UsersMap';
import { UserListEntry } from 'components/UserListEntry';

export default function Page() {
  const { users } = client.useQuery();
  const isNotExcluded = ({ node }: RootQueryToUserConnectionEdge) => !node.meetupInfo.exclude;
  const hasLocation = ({ node }: RootQueryToUserConnectionEdge) => node.meetupInfo?.location != null;
  const displayedUsers = users().edges.filter(isNotExcluded).filter(hasLocation);

  return (
    <AuthorizedContent>
      <UsersMap users={displayedUsers} />
      <ul>
        {displayedUsers.map(({ node }, index) => {
          return (
            <li key={node?.id ?? index}>
              <UserListEntry user={node} />
            </li>
          )
        })}
      </ul>
      <a href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin/profile.php`}>Edit My Info</a>
    </AuthorizedContent>
  );
}
