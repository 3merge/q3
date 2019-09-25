require('dotenv').config();

const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID, URL } = process.env;

module.exports = {
  siteMetadata: {
    title: '3merge inc.',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-q3',
      options: {
        contentfulSpaceID: CONTENTFUL_SPACE_ID,
        contentfulAccessToken: CONTENTFUL_ACCESS_TOKEN,
        siteUrl: URL,
      },
    },
  ],
};
