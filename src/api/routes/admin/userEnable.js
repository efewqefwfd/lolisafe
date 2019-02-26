const Route = require('../../structures/Route');

class userEnable extends Route {
	constructor() {
		super('/admin/users/enable', 'post', { adminOnly: true });
	}

	async run(req, res, db) {
		if (!req.body) return res.status(400).json({ message: 'No body provided' });
		const { id } = req.body;
		if (!id) return res.status(400).json({ message: 'No id provided' });

		try {
			await db.table('users')
				.where({ id })
				.update({ enabled: true });
		} catch (error) {
			return super.error(res, error);
		}

		return res.json({
			message: 'Successfully enabled user'
		});
	}
}

module.exports = userEnable;
