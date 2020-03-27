const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = Router();

const NgoController = require('./controllers/NgoController');
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');
const IncidentsController = require('./controllers/IncidentsController');

routes.get('/ngos', NgoController.index);
routes.post(
	'/ngos',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			whatsapp: Joi.string().required().min(10).max(13),
			city: Joi.string().required(),
			uf: Joi.string().required().length(2)
		})
	}),
	NgoController.create
);

routes.post('/session', SessionController.create);

routes.get(
	'/profile',
	celebrate({
		[Segments.HEADERS]: Joi.object({
			authorization: Joi.string().required()
		}).unknown()
	}),
	ProfileController.index
);

routes.get(
	'/incidents',
	celebrate({
		[Segments.QUERY]: Joi.object().keys({
			page: Joi.number()
		})
	}),
	IncidentsController.index
);
routes.post('/incidents', IncidentsController.create);
routes.delete(
	'/incidents/:id',
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number().required()
		})
	}),
	IncidentsController.delete
);

module.exports = routes;
