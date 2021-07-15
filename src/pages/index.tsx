import React from 'react';
import { UsersMap } from 'components/maps/UsersMap';
import Layout from "components/Layout"

export default function Page() {
  

  return (
    <Layout>
      <UsersMap />
      <a href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin/profile.php`}>Edit My Info</a>
    </Layout>
  );
}
