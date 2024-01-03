import { request as gqlRequest } from "graphql-request";

export function gqlEndpoint({
   siteSlug,
}: {
   siteSlug?: string | undefined | null;
}) {
   //Custom sites
   if (siteSlug)
      return `https://${siteSlug}-db.${process.env.PAYLOAD_PUBLIC_HOST_DOMAIN}/api/graphql`;

   return process.env.NODE_ENV == "development"
      ? "http://localhost:3000/api/graphql"
      : `https://${process.env.PAYLOAD_PUBLIC_HOST_DOMAIN}/api/graphql`;
}

export function swrRestFetcher(...args: any) {
   return fetch(args).then((res) => res.json());
}

export function authRestFetcher({
   path,
   method,
   body,
}: {
   path: string;
   method: "PATCH" | "GET";
   body?: any;
}) {
   try {
      return fetch(path, {
         method,
         ...(process.env.MANA_APP_KEY && {
            headers: {
               Authorization: `users API-Key ${process.env.MANA_APP_KEY}`,
               "Content-Type": "application/json",
            },
         }),
         ...(body &&
            method == "PATCH" && {
               body: JSON.stringify({
                  ...body,
               }),
            }),
      }).then((res) => res.json());
   } catch (err) {
      console.log(err);
   }
}

export function authGQLFetcher({
   document,
   variables,
   siteSlug,
   request,
}: {
   document?: any;
   variables?: any;
   siteSlug?: string;
   request: Request;
}) {
   try {
      return gqlRequest(gqlEndpoint({ siteSlug }), document, variables, {
         cookie: request?.headers.get("cookie") ?? "",
         ...(process.env.MANA_APP_KEY && {
            Authorization: `users API-Key ${process.env.MANA_APP_KEY}`,
         }),
      });
   } catch (err) {
      console.log(err);
   }
}