/**
 * Haversine formula to calculate the great-circle distance between two points on a sphere.
 * Returns distance in meters.
 */
export const calculateDistance = (coord1, coord2) => {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Finds the closest point on the route to the user's current location,
 * and slices the route array to remove coordinates the user has already passed.
 * Returns the truncated route array.
 */
export const truncateRouteByProximity = (routeData, currentCoord) => {
  if (!routeData || routeData.length < 2) return routeData;

  let minDistance = Infinity;
  let closestIndex = 0;

  // Find the node on the route closest to the user's current position
  for (let i = 0; i < routeData.length; i++) {
    const dist = calculateDistance(currentCoord, routeData[i]);
    if (dist < minDistance) {
      minDistance = dist;
      closestIndex = i;
    }
  }

  // If the user is extremely close to the end, just return the remaining segment
  if (closestIndex === routeData.length - 1) {
    return [currentCoord, routeData[routeData.length - 1]];
  }

  // Slice the array to remove passed points, and prepend the user's current live location
  // so the line starts exactly under their feet.
  return [currentCoord, ...routeData.slice(closestIndex + 1)];
};
