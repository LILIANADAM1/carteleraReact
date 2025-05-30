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

  //Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});





test('iniciar sesión y seleccionar género aventura', async ({ page }) => {
  await page.goto('http://localhost:5173/carteleraReact/');

  // 1. Hacer clic en el enlace para mostrar el formulario de inicio de sesión
  await page.getByText('Iniciar Sesion', { exact: false }).click();

  // 2. Esperar a que el formulario aparezca
  await expect(page.getByPlaceholder('Tu nombre')).toBeVisible();

  // 3. Llenar el formulario
  await page.getByPlaceholder('Tu nombre').fill('usuarioPrueba');
  await page.getByPlaceholder('ejemplo@email.com').fill('usuario@prueba.com');
  await page.getByPlaceholder('Tu contraseña').fill('contraseñaSegura123');

  // 4. Enviar el formulario
  await page.getByRole('button', { name: /enviar/i }).click();

  // Pausa para ver el resultado antes de continuar

  // 5. Esperar a que aparezca el selector de género
  const select = page.getByTestId('genre-select');
  await expect(select).toBeVisible({ timeout: 10000 }); // esperar hasta 10s por si tarda en cargar

  // 6. Seleccionar "Aventura"
  await select.selectOption('Aventura');

  await page.pause(); 
});