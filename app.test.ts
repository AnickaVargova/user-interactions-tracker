import { detectFirstTimeUser } from './public/utils';
import supertest from 'supertest';
import { server } from "./index";
import { outputServer } from './index';

const request = supertest(server);
const outputRequest = supertest(outputServer);

afterEach(done => {
    server.close();
    done();
});

describe(
    'html response is sent to webpage and output', () => {
        test('GET "/" returns html response', async () => {
            const res = await request.get('/');
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('html'));
        });
        test('GET "/" in output returns html response', async () => {
            const res = await outputRequest.get('/');
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('html'));
        });
        test('GET "/about"  returns html response', async () => {
            const res = await request.get('/about');
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('html'));
        });
    }
);

describe(
    'post request returns status 200', () => {
        test('POST "/" returns status 200', async () => {
            const res = await request.post('/').send({test: 'test'});
            expect(res.status).toEqual(200);
        });
    }
);

//TODO solve current type
describe('detectFirstUser returns correct value', () => {
    test('should return true when user visited web long ago',
        () => { expect(detectFirstTimeUser(true, new Date("01/01/2020 16:00:00").getTime())).toBe(true) })
    test(
        'should return false when user visited web an hour ago',
        () => { expect(detectFirstTimeUser(true, Date.now() - 60 * 60 * 1000)).toBe(false) })
    test(
        'should return false when there is no local storage available',
        () => { expect(detectFirstTimeUser(false, 0)).toBe(false) })
    test(
        'should return true when user visited web for the very first time and there is local storage available',
        () => { expect(detectFirstTimeUser(true, 0)).toBe(true) })
});


