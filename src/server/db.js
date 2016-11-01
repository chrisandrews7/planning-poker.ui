import config from 'config';
import redis from 'redis';

const client = redis.createClient(config.get('db.port'), config.get('db.host'));
client.auth(config.get('db.password'));

export default client;
