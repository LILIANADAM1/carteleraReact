import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
 // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('mostrar genero aventura', async ({ page }) => {
  await page.goto('http://localhost:5173/carteleraReact/'); 
  await page.getByRole('combobox').selectOption('Aventura');
  await page.pause();
});

test('iniciar sesion', async ({ page }) => {
  await page.goto('http://localhost:5173/carteleraReact/');
   
  // Hacer clic en el enlace que activa el scroll hacia el formulario
  await page.getByText('Iniciar Sesion', { exact: false }).click();


   // Esperar a que el formulario aparezca en pantalla (por placeholder)
  await expect(page.getByPlaceholder('Tu nombre')).toBeVisible();

  // Rellenar los campos usando los placeholders
  await page.getByPlaceholder('Tu nombre').fill('usuarioPrueba');
  await page.getByPlaceholder('ejemplo@email.com').fill('usuario@prueba.com');
  await page.getByPlaceholder('Tu contraseña').fill('contraseñaSegura123');
 
  // Enviar el formulario
  await page.getByRole('button', { name: /enviar/i }).click();
  
 
});
 