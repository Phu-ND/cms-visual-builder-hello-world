import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { getPreviewToken } from "@helpers/cms";

interface OptimizelyIntegrationClientConfig {
  cmsUrl: string;
  // Optimizely GraphQL API
  graphUrl: string;
  singleGraphKey: string;
}

export class OptimizelyIntegrationClient extends ApolloClient<NormalizedCacheObject> {
  private config: OptimizelyIntegrationClientConfig;

  public get communicationInjector() {
    return `https://${this.config.cmsUrl}/Util/javascript/communicationInjector.js`;
  }

  constructor(config: OptimizelyIntegrationClientConfig) {
    const httpLink = createHttpLink({
      uri: `https://${config.graphUrl}/content/v2?auth=${config.singleGraphKey}`,
    });

    super({
      link: httpLink,
      cache: new InMemoryCache(),
    });

    this.config = config;
  }

  public refresh(token: string) {
    const httpLink = createHttpLink({
      uri: `https://${this.config.graphUrl}/content/v2?auth=${this.config.singleGraphKey}`,
    });

    this.setLink(
      setContext((_, { headers }) => ({
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      })).concat(httpLink)
    );
  }
}

// function getClient() {
//   const graphUrl = process.env.GRAPH_URL;
//   const singleGraphKey = process.env.GRAPH_SINGLE_KEY;

//   let link: ApolloLink | undefined = undefined;

//   // In Preview Mode
//   const httpLink = createHttpLink({
//     uri: `https://${graphUrl}/content/v2?auth=${singleGraphKey}`,
//   });

//   const authLink = setContext((_, { headers }) => {
//     const authHeaders: Record<string, string> = {};

//     const previewToken = getPreviewToken();
//     if (previewToken) {
//       authHeaders.authorization = previewToken;
//     }

//     return {
//       headers: {
//         ...headers,
//         ...authHeaders,
//       },
//     };
//   });

//   const communicationScript = ;
//   document.body.appendChild(communicationScript);

//   link = authLink.concat(httpLink);

//   return new ApolloClient({
//     link: link,
//     cache: new InMemoryCache(),
//   });
// }

export const client = new OptimizelyIntegrationClient({
  cmsUrl: process.env.CMS_URL ?? "",
  graphUrl: process.env.GRAPH_URL ?? "",
  singleGraphKey: process.env.GRAPH_SINGLE_KEY ?? "",
});
