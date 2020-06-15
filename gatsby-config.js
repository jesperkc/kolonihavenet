module.exports = {
	plugins: [
		// You can should only have one instance of this plugin
		{
			resolve: `gatsby-plugin-netlify-identity`,
			options: {
				url: `https://kolonihavenet.netlify.app/`, // required!
			},
		},
	],
};
