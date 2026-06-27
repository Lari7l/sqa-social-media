import { test, expect } from '@playwright/test';

test.describe('Testes End-to-End (E2E) - Fluxos de Tela', () => {

  test('Deve ser capaz de navegar até a tela de signup e tentar cadastrar', async ({ page }) => {

    await page.goto('http://localhost:3000/signup'); 

    await page.locator('input[type="email"], input[placeholder*="email"]').fill(`e2e_${Date.now()}@teste.com`);
    await page.locator('input[type="password"]').first().fill('SenhaForte123!');
    await page.locator('input[type="password"]').last().fill('SenhaForte123!');

    const botaoCriar = page.locator('main button:has-text("Criar Conta")');
    
    await expect(botaoCriar).toBeVisible();
    
    await botaoCriar.click();
  });

  test('Deve exibir o link para voltar à tela de Login', async ({ page }) => {

    await page.goto('http://localhost:3000/signup');
    
    const linkEntrar = page.locator('main button:has-text("Entrar"), main a:has-text("Entrar")');
    
    if (await linkEntrar.count() > 0) {
      await expect(linkEntrar.first()).toBeVisible();
    } else {
      await expect(page.locator('text=Já tem uma conta?')).toBeVisible();
    }
  });
});