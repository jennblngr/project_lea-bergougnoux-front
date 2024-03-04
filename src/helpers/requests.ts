import { type DocumentNode } from "graphql";
import { gql } from "graphql-tag";

export const GET_HOME_PAGE: DocumentNode = gql`
	query HomePage {
		homepage {
			data {
				id
				attributes {
					text
					carousel {
						data {
							id
							attributes {
								url
								alternativeText
								formats
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_CATEGORIES: DocumentNode = gql`
	query Categories {
		categories {
			data {
				attributes {
					name
				}
			}
		}
	}
`;

export const GET_PROJECTS: DocumentNode = gql`
	query Projects {
		projects {
			data {
				id
				attributes {
					name
					year
					description {
						text
						medias {
							data {
								id
								attributes {
									url
									alternativeText
									formats
								}
							}
						}
					}
					categories {
						data {
							attributes {
								name
							}
						}
					}
					media {
						source {
							data {
								id
								attributes {
									alternativeText
									url
									formats
								}
							}
						}
						alt
					}
					cover {
						data {
							attributes {
								url
								alternativeText
								formats
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_REFERENCES: DocumentNode = gql`
	query References {
		reference {
			data {
				attributes {
					url {
						id
						src
						name
					}
				}
			}
		}
	}
`;

export const GET_INFOS: DocumentNode = gql`
	query Infos {
		info {
			data {
				attributes {
					text
				}
			}
		}
	}
`;

export const GET_CV: DocumentNode = gql`
	query CV {
		cv {
			data {
				attributes {
					src
				}
			}
		}
	}
`;
