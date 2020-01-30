const users = require('./users')

// write some tests
describe('users', () => {
    test('finds first user', async () => {
        expect(await users.findUser(0)).toMatchObject({
            id: 0,
            email: "readycoder0@gmail.com",
            createdAt: expect.anything()
        });
    });

    test('finds last user', async () => {
        expect(await users.findUser(19)).toMatchObject({
            id: 19,
            email: "readycoder19@gmail.com",
            createdAt: expect.anything()
        });
    });

    test('findUser throws an error for unknown user', () => {
        expect(users.findUser(100)).rejects.toThrow(Error);
    });

    test('deletes user', async () => {
        expect(await users.findUser(3)).toBeTruthy();
        expect(await users.deleteUser(3)).toMatchObject([{
            id: 3,
            email: "readycoder3@gmail.com",
            createdAt: expect.anything()
        }]);
        expect(users.findUser(3)).rejects.toThrow(Error);
    });

    test('deleteUser throws an error for unknown user', async () => {
        expect(users.deleteUser(335)).rejects.toThrow(Error);
    });
})
