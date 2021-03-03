const express = require('express');

const post = new express.Router();
post.get('/:title', (req, res) => {
	res.send(req.params.title);
	res.end();
});

module.exports = post;
