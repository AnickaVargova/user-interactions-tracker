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
