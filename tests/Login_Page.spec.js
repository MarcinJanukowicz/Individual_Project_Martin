const { test, expect } = require('@playwright/test');


test.skip('SCENARIO 1#: User should be able to log in with standard user given the correct credentials', async ({ page }) => {
    
    //Created by chat GPT - for the future check
    await page.goto('https://www.saucedemo.com/');
   
    await page.fill('input[name="user-name"]', 'standard_user');  
    await page.fill('input[name="password"]', 'secret_sauce');  
    await page.click('input[type="submit"]');  

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
   
  });
  
   
  
  
  test('SCENARIO 1: User should be able to log in with standard user given the correct credentials.', async ({ page }) => {
    
    await test.step("GIVEN: : User is on main page https://www.saucedemo.com/", async () => {

      await page.goto('https://www.saucedemo.com/');
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    await test.step("WHEN: : User input correct Username/Password and clicks login button", async () => {

    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    });

    await test.step("THEN: : User is login and moved to page https://www.saucedemo.com/inventory.html", async () => {
    
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
   
    });

  });


  
  test("SCENARIO 2: User should not be able to access the e-shop inventory without logging in.", async ({ page }) => {

    await test.step("GIVEN: User want to go directly to inventory page without login", async () => {
    });

    await test.step("WHEN: User input inventory page directly without login", async () => {

      await page.goto("https://www.saucedemo.com/inventory.html");
    });

    await test.step("THEN: User is redirected to login page", async () => {

      await expect(page).toHaveURL("https://www.saucedemo.com/");
    });
  });


  test('SCENARIO 3: : User whose access is denied (locked_out_user) should not be able to log in', async ({ page }) => {
    
    
  await test.step("GIVEN: GIVEN: User is on main page (https://www.saucedemo.com/)", async () => {

    await page.goto('https://www.saucedemo.com/');
    });
    
  await test.step("WHEN: User input blocked Username/Password and click Login button", async () => {

    await page.locator('[data-test="username"]').fill("locked_out_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    });
    
    await test.step("THEN: User is redirected to login page", async () => {

    const errorMessage = await page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");

  });

});