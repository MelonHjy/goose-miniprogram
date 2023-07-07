import config from '@/config'

function buildUrlParams(baseUrl: string, params: Record<string, string | number | boolean | undefined>): string {
  // Encode and concatenate query parameter key-value pairs
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key, value]) => encodeURIComponent(key) + "=" + encodeURIComponent(String(value))
    )
    .join("&");

  // Return the final URL with query parameters
  return baseUrl + (queryString.length > 0 ? "?" + queryString : "");
}

function buildUrl(segments: string[] | string, previousUrl: string, index?: number): string {
  if (index === undefined) {
    index = 0;
  }
  // Base case: return the final URL when all segments have been processed
  if (index === segments.length) {
    return previousUrl;
  }

  // Concatenate the current URL segment to the previousUrl
  const currentUrl = previousUrl + (previousUrl.endsWith("/") ? "" : "/") + segments[index];

  // Recursively process the next segment
  return buildUrl(segments, currentUrl, index + 1);
}

function buildWSUrl(segments: string[] | string) {
  if (typeof segments === 'string') {
    segments = [segments];
  }
  return buildUrl(segments, config.WS_BASE_URL)
}

export { buildUrlParams, buildUrl, buildWSUrl }
