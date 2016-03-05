import config from 'config';
import redis from 'redis';

const client = redis.createClient(config.get('db.port'), config.get('db.host'));

if (config.get('db.auth')) {
    client.auth(config.get('db.password'));
}

export default client;
