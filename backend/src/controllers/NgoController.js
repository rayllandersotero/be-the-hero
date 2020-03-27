const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
	async index(req, res) {
		const ngos = await connection('ngos').select('*');

		return res.json({ ngos });
	},

	async create(req, res) {
		const { name, email, whatsapp, city, uf } = req.body;

		const id = generateUniqueId();

		await connection('ngos').insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf
		});

		return res.json({ id });
	}
};
