const chai = require('chai');
const sinonChai = require('sinon-chai');

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

chai.use(sinonChai);
