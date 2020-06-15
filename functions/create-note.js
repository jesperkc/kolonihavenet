const sendQuery = require('./helpers/send-query');

const CREATE_NOTE = `
  mutation($text: String!, $userID: String!){
    createNote(data: {text: $text, userID: $userID}){
      _id
      text
      userID
    }
  }
`;

exports.handler = async (event, context, callback) => {
	const { identity, user } = context.clientContext;
	const { text } = JSON.parse(event.body);
	console.log(context);
	if (!identity) throw new Error('Not Authorized');
	const userID = (identity && identity.user && identity.user.id) || 'none';
	const { data, errors } = await sendQuery(CREATE_NOTE, { text, userID });

	if (errors) {
		return {
			statusCode: 500,
			body: JSON.stringify(errors),
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ newNote: data.createNote }),
	};
};
