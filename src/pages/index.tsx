import React from 'react';
import { AuthorizedContent } from 'components/AuthorizedContent';
import { UsersMap } from 'components/maps/UsersMap';

export default function Page() {
  

  return (
    <AuthorizedContent>
      <UsersMap />
      <a href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin/profile.php`}>Edit My Info</a>
    </AuthorizedContent>
  );
}
