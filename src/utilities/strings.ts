export function getLocationString(location) {
  const city = location?.city;
  const state = location?.state;
  const country = state ? location?.countryShort : location?.country;

  return `${city ? city + ", " : ""}${state ? state + ", " : ""}${country}`;
}
