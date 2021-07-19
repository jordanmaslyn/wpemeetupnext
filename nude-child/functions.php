<?php

# Set Google Maps API Key
function my_acf_google_map_api( $api ){
    $api['key'] = GOOLE_MAPS_API_KEY;
    return $api;
}
add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');


# Filter User registration by Email domain
add_filter( 'registration_errors', 'myplugin_registration_errors', 10, 3 );
function myplugin_registration_errors( $errors, $sanitized_user_login, $user_email ) {

  if (! preg_match('/^[a-zA-Z0-9._\-+]+@wpengine\.com$/', $user_email )) {
    $errors->add( 'invalid_email', __( 'ERROR: Only valid "wpengine.com" email address is allowed.' ));
    $user_email = '';
  }

  return $errors;
}


?>