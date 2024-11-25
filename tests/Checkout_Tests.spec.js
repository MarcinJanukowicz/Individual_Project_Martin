const { test, expect } = require('@playwright/test');



test.describe('E-commerce tests', () => {
  
  test.beforeEach(async ({ page }) => {

    // Always logged in

    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".shopping_cart_badge")).not.toBeVisible();

    //Adding product to the cart

    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator(".shopping_cart_badge")).toBeVisible();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");


    // navigating to the cart page
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    await expect(page.locator(".shopping_cart_badge")).toBeVisible();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");


    // navigating to the checkout page (checkout-step-one)
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
  
  });


  test("SCENARIO 13: User should see the checkout overview with details such as payment, shipping info, price total", async ({ page }) => {

    await test.step("GIVEN:User is on https://www.saucedemo.com/checkout-step-one.html with one product added to cart", async () => {

    });

    await test.step("WHEN: User input necessary credentials (First Name, Last Name and Zip Code) and clicks continue button", async () => {

      await page.locator('[data-test="firstName"]').fill("John");
      await page.locator('[data-test="lastName"]').fill("Rambo");
      await page.locator('[data-test="postalCode"]').fill("66666");
      await page.locator('[data-test="continue"]').click();
    });

    await test.step("THEN: User is moved to https://www.saucedemo.com/checkout-step-two.html and see all payment details", async () => {

      await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");

      await expect(page.locator('[data-test="item-quantity"]')).toBeVisible
      await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1")

      await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
      await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText("Sauce Labs Bike Light");
      await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
      await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveText("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.");
      await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
      await expect(page.locator('[data-test="inventory-item-price"]')).toContainText("$9.99");
      await expect(page.locator('[data-test="payment-info-value"]')).toContainText("SauceCard #31337");
      await expect(page.locator('[data-test="shipping-info-value"]')).toHaveText("Free Pony Express Delivery!");
      await expect(page.locator('[data-test="subtotal-label"]')).toContainText("$9.99");
      await expect(page.locator('[data-test="tax-label"]')).toContainText("$0.80");
      await expect(page.locator('[data-test="total-label"]')).toContainText("$10.79")
  });
});

  test("SCENARIO 14: User should get notified when they fail to enter any of the checkout information", async ({ page }) => {

    await test.step("GIVEN: User is on https://www.saucedemo.com/checkout-step-one.html with one product added to cart", async () => {
    });
  
    // Scenario 14A: missing First Name

    await test.step("WHEN: User not input first name and click continue button", async () => {

      
      await page.locator('[data-test="lastName"]').fill("Rambo");
      await page.locator('[data-test="postalCode"]').fill("66666");
      await page.locator('[data-test="continue"]').click();

    });
  
    await test.step("THEN: User received and error message", async () => {

    await expect(page.locator('[data-test="error"]')).toHaveText("Error: First Name is required");
    });
  
    // Scenario 14B: missing Last Name

    await test.step("WHEN: User not input first name and click continue button", async () => {

      await page.reload();
     
      await page.locator('[data-test="firstName"]').fill("John");
      await page.locator('[data-test="postalCode"]').fill("66666");;
      await page.locator('[data-test="continue"]').click();

    });
  
    await test.step("THEN: User received and error message", async () => {

      await expect(page.locator('[data-test="error"]')).toHaveText("Error: Last Name is required");
    
    });
  
    // Scenario 14C: missing zip code

    await test.step("WHEN: User not input postal Code and click continue button", async () => {

     await page.reload();
    
      await page.locator('[data-test="firstName"]').fill("John");
      await page.locator('[data-test="lastName"]').fill("Rambo");
      await page.locator('[data-test="continue"]').click();

    });
  
    await test.step("THEN: User received and error message", async () => {

    await expect(page.locator('[data-test="error"]')).toHaveText("Error: Postal Code is required");

    });
  });

  test("SCENARIO 15: User should get notified after placing a successful order", async ({ page }) => {

    await test.step("GIVEN: User is on https://www.saucedemo.com/checkout-step-one.html one product added to cart", async () => {
    });
  
    await test.step("WHEN: User input necessary credentials (First Name, Last Name and Zip Code) and clicks continue button", async () => {

      await page.locator('[data-test="firstName"]').fill("John");
      await page.locator('[data-test="lastName"]').fill("Rambo");
      await page.locator('[data-test="postalCode"]').fill("66666");
      await page.locator('[data-test="continue"]').click();
    });
  
    await test.step("AND WHEN:User is redirected to https://www.saucedemo.com/checkout-step-two.html", async () => {

      await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
    });
  
    await test.step("AND WHEN: User clicks on the 'Finish' button", async () => {

      await page.locator('[data-test="finish"]').click();

    });
  
    await test.step("THEN: User is redirected to the checkout-complete page and correct test is displayed on the page", async () => {

      await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
      await expect(page.locator('[data-test="complete-header"]')).toHaveText("Thank you for your order!");
      await expect(page.locator('[data-test="complete-text"]')).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    });
  });
});
