import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import auth from './auth'
import usercontroller from '../controllers/usercontroller'
import flightcontroller from '../controllers/flightcontroller'
import notificationcontroller from '../controllers/notificationcontroller'
export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }))
	api.use('/auth', auth)
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.post('/createuser', usercontroller.create(req, res) )

	api.get('/getflight', flightcontroller.get(req, res) )
	api.post('/createflight', flightcontroller.create(req, res) )

	api.post('/sendNotification', notificationcontroller.send(req, res) )

	return api;
}
