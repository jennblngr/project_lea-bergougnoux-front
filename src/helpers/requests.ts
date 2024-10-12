import { type DocumentNode } from "graphql";
import { gql } from "graphql-tag";

export const GET_HOME_PAGE: DocumentNode = gql`
	query Homepage {
		homepage {
			documentId
			carousel {
				alternativeText
				formats
				url
			}
			content
		}
	}
`;

export const GET_CATEGORIES: DocumentNode = gql`
	query Categories {
		categories {
			name
		}
	}
`;

export const GET_PROJECTS: DocumentNode = gql`
	query Projects {
		projects {
			media {
				source {
					alternativeText
					formats
					url
					documentId
				}
			}
			categories {
				name
			}
			documentId
			createdAt
			name
			year
			description {
				content
				medias {
					alternativeText
					formats
					documentId
					url
				}
			}
			cover {
				alternativeText
				formats
				documentId
				url
			}
		}
	}
`;

export const GET_INFOS: DocumentNode = gql`
	query Info {
		info {
			content
			address {
				street
				cp
				city
			}
			phone
		}
	}
`;

export const GET_REFERENCES: DocumentNode = gql`
	query Reference {
		reference {
			url {
				id
				name
				src
			}
		}
	}
`;

export const GET_CV: DocumentNode = gql`
	query Cv {
		cv {
			src
		}
	}
`;

export const GET_WEBSITE_CONFIGURATION: DocumentNode = gql`
	query Website {
		website {
			backgroundColor
			textColor
		}
	}
`;
