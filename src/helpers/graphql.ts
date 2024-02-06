import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export default new ApolloClient({
	link: new HttpLink({ uri: process.env.VITE_API_URL + "/graphql" }),
	cache: new InMemoryCache({
		addTypename: false,
	}),
});
