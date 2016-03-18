import config from 'config';
import redis from 'redis';
import fakeredis from 'fakeredis';

const db = config.get('db.fake') ? fakeredis : redis;
const client = db.createClient(config.get('db.port'), config.get('db.host'));

if (config.get('db.auth')) {
    client.auth(config.get('db.password'));
}

export default client;
