const authService = require('../modules/auth/auth.service');


describe('Auth Service', () => {
    it('deve autenticar usuário admin com credenciais corretas', () => {
        const token = authService.login('admin@sps.com', 'admin123');
        expect(typeof token).toBe('string');
    });


    it('não deve autenticar com senha inválida', () => {
        const token = authService.login('admin@sps.com', 'senhaerrada');
        expect(token).toBeNull();
    });


    it('não deve autenticar usuário inexistente', () => {
        const token = authService.login('naoexiste@sps.com', '123456');
        expect(token).toBeNull();
    });
});