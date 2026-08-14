import { queryOptions, useQuery } from "@tanstack/react-query";
import { getSiteContent } from "./site-content.functions";
import { defaultSiteContent, type SiteContent } from "./site-content";

export const siteContentQueryOptions = queryOptions<SiteContent>({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 30_000,
});

/** Live site content with the bundled defaults as a safe fallback. */
export function useSiteContent(): SiteContent {
  const { data } = useQuery(siteContentQueryOptions);
  return data ?? defaultSiteContent;
}
