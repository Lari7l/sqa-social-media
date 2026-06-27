import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8080/auth';

test.describe('Testes de API (Caixa-Preta) - Autenticação e Usuários', () => {
  
  const emailValido = `usuario_${Date.now()}@teste.com`;
  const senhaForte = 'SenhaForte123!'; 

  test('POST /auth/signup - Deve cadastrar um usuário com sucesso', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/signup`, {
      data: { email: emailValido, password: senhaForte }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('id');
  });

  test('POST /auth/signup - Não deve permitir cadastro com senha fraca', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/signup`, {
      data: { email: `error_${Date.now()}@teste.com`, password: '123' }
    });

    expect(response.status()).toBe(422);
  });

  test('POST /auth/signup - Deve expor duplicidade de e-mail', async ({ request }) => {
    const emailDuplicado = `duplicado_${Date.now()}@teste.com`;

    const res1 = await request.post(`${BASE_URL}/signup`, {
      data: { email: emailDuplicado, password: senhaForte }
    });
    expect(res1.ok()).toBeTruthy();

    const res2 = await request.post(`${BASE_URL}/signup`, {
      data: { email: emailDuplicado, password: 'OutraSenha123!' }
    });

    expect(res2.status()).toBe(409); 
  });

  test('POST /auth/signup - Deve falhar ao enviar dados vazios', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/signup`, {
      data: {}
    });
    expect(response.status()).toBe(422);
  });
});