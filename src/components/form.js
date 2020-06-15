import React, { useState } from 'react';
import axios from 'axios';
import { useIdentityContext } from 'react-netlify-identity-widget';

const Form = ({ reloadNotes }) => {
	const identity = useIdentityContext();

	const [text, setText] = useState('');
	const handleSubmit = async event => {
		event.preventDefault();

		if (text === '') return;

		await axios.post('/api/create-note', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + identity.user.token.access_token, // like this
			},
			body: {
				text,
			},
		});

		setText('');
		reloadNotes();
	};
	console.log(identity.user.token.access_token);

	return (
		<form className='note-form' onSubmit={handleSubmit}>
			<label htmlFor='textarea'>
				Add notes
				<textarea id='textarea' value={text} onChange={event => setText(event.target.value)}></textarea>
			</label>
			<button className='save-button' type='submit'>
				Save note
			</button>
		</form>
	);
};

export default Form;
