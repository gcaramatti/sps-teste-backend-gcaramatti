const userService = require('../modules/users/user.service');


describe('User Service', () => {
    it('deve listar usuários', () => {
        const users = userService.listUsers();
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThan(0);
    });


    it('deve criar um usuário', () => {
        const user = userService.createUser({
            email: 'teste@sps.com',
            name: 'Teste',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
        expect(user.email).toBe('teste@sps.com');
    });


    it('não deve permitir criar usuário com email duplicado', () => {
        expect(() => {
            userService.createUser({
                email: 'admin@sps.com',
                name: 'Duplicado',
                password: '123456'
            });
        }).toThrow('Email já existe');
    });


    it('deve atualizar usuário', () => {
        const user = userService.createUser({ 
            email: 'up@sps.com', 
            name: 'Up', 
            password: '123'
        });
        const updated = userService.updateUser(user.id, { name: 'Atualizado' });
        expect(updated.name).toBe('Atualizado');
    });


    it('deve deletar usuário', () => {
        const user = userService.createUser({ 
            email: 'del@sps.com', 
            name: 'Del', 
            password: '123' 
        });

        const deleted = userService.deleteUser(user.id);
        expect(deleted).toBe(true);
    });
});