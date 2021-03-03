const express = require('express');

const post = new express.Router();
post.get('/:title', (req, res) => {
	res.render('../layouts/index', { IS_DEV: true });
});

module.exports = post;
