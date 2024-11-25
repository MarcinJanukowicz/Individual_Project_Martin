const { test, expect } = require('@playwright/test');



test.describe('E-commerce tests', () => {
  
  test.beforeEach(async ({ page }) => {

    // Always logged in
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
  

  
  });


test("SCENARIO 4: User should be logged out once Logout button is pressed", async ({ page }) => {

  await test.step("GIVEN: User is on https://www.saucedemo.com/inventory.html page", async () => {

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  await test.step("WHEN: User click at list icon in left right corner", async () => {

    
    await page.getByRole('button', { name: 'Open Menu' }).click()

  });

  await test.step("AND WHEN: User cliks on logout button on the appered list", async () => {

    await page.locator("#logout_sidebar_link").click();
    
   });

  await test.step("THEN: User is redirected to login page", async () => {

  await expect(page).toHaveURL("https://www.saucedemo.com/");
  });  

});

test("SCENARIO 5: User should see the correct product details such as image, product name, description and price.", async ({ page }) => {

  await test.step("GIVEN: User should be able to filter the inventory according to the option chosen.", async () => {
    
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });
    
    //Scenario: price low to high

    await test.step("WHEN: User clicks on the sorting selector", async () => {

      await page.locator('[data-test="product-sort-container"]').click();
    });
      
    await test.step("AND WHEN: User clicks Price (low to high))  ", async () => {

      await page.locator('[data-test="product-sort-container"]').selectOption("lohi");
    
    });

  await test.step("THEN: User see products sorted by Price", async () => {

    await expect(page.locator(".inventory_item_name").first()).toHaveText("Sauce Labs Onesie");
    await expect(page.locator(".inventory_item_price").first()).toContainText("7.99");
  });
});

  test("SCENARIO 6: User should see the correct product details such as image, product name, description and price.", async ({ page }) => {

    await test.step("GIVEN: User is on https://www.saucedemo.com/inventory.html page", async () => {
  
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });
  
    await test.step("WHEN: User observe all the products on the website", async () => {
  
    });
  
    await test.step("THEN: User can see all products details such as image, product name, description and price", async () => {

      await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
      await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
      await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText("Sauce Labs Backpack");
      await expect(page.getByText('carry.allTheThings() with the')).toBeVisible();
      await expect(page.getByText('carry.allTheThings() with the')).toContainText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
      await expect(page.getByText('$29.99')).toBeVisible();
      await expect(page.getByText('$29.99')).toContainText("$29.99");
      
      
    });
  });

  test("SCENARIO 7: User should see the added product in their cart", async ({ page }) => {

    await test.step("GIVEN: User is on https://www.saucedemo.com/inventory.html page", async () => {
  
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });
  
    await test.step("WHEN: User click Add co cart icon near the product", async () => {

      await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    });
  
    await test.step("AND WHEN: User click the shopping cart icon", async () => {

      await page.locator('[data-test="shopping-cart-link"]').click();
    
    });

    await test.step("THEN: User is redirected to https://www.saucedemo.com/cart.html and see all product details", async () => {

      await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

      await expect(page.locator('[data-test="item-quantity"]')).toBeVisible();
      await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1");
      await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
      await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText("Sauce Labs Bike Light")
      await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
      await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$9.99")
      
      
      
     });
  });
  
    test("SCENARIO 8: User should see the cart icon update accordingly when adding a product to the cart", async ({ page }) => {

      await test.step("GIVEN: User is on https://www.saucedemo.com/inventory.html page", async () => {
    
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      });
    
      await test.step("WHEN: User click “Add to cart” button for one product", async () => {

        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        
    });
    
      await test.step("THEN: Number 1 appears near the cart icon", async () => {
  
      await expect(page.locator('.shopping_cart_badge')).toBeVisible();
      await expect(page.locator('.shopping_cart_badge')).toHaveText("1");
      
    });
  });

    test("SCENARIO 9: : User should be able to remove the added product on the cart page.", async ({ page }) => {

    await test.step("GIVEN: User is on https://www.saucedemo.com/cart.html page with one product added", async () => {
    
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    });
    
      await test.step("WHEN: User click Remove button", async () => {

      await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
      await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

    });

      await test.step("Product is removed from cart (there is no number near cart icon) ", async () => {

      await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    
    });
  });

    test("SCENARIO 10: User should be able to remove the added product from cart on the inventory page.", async ({ page }) => {

      await test.step("GIVEN: User is on https://www.saucedemo.com/inventory.html page", async () => {
    
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      });
    
      await test.step("WHEN: : User click Remove button near the product", async () => {

        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
      });
    
      await test.step("THEN: Product is removed from cart (No number near cart icon) or Remove button change to Add to cart", async () => {

        await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    
      });
    });

    test("SCENARIO 11: User should be able to remove the added product from cart on the specific product page.", async ({ page }) => {

      await test.step("GIVEN: User is on on https://www.saucedemo.com/inventory.html page", async () => {
    
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible()
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
      });

    await test.step("WHEN: User enters specific product page (by clicking name of product of photo)", async () => {

      await page.locator('[data-test="item-0-img-link"]').click();
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=0");  

      });

    await test.step("AND WHEN: User clicks remove button", async () => {

      await expect(page.locator('[data-test="remove"]')).toBeVisible();
      await page.locator('[data-test="remove"]').click();
      });

    await test.step("Then: User clicks remove button", async () => {

      await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
      await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  });
}); 



  test("SCENARIO 12: User should be able to continue shopping from the cart page", async ({ page }) => {

    await test.step("GIVEN: User is on https://www.saucedemo.com/cart.html page with one product added", async () => {

      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      await expect(page.locator(".shopping_cart_badge")).toBeVisible();
      await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
      await expect(page.locator(".shopping_cart_badge")).toBeVisible();
      await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
      });

      await test.step("WHEN: :User click Continue Shopping button", async () => {

      await page.locator('[data-test="continue-shopping"]').click();
      
    ``});
      await test.step("THEN: User is redirected to https://www.saucedemo.com/inventory.html", async () => {

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      
    
      });
    });

  test("EXTRA SCENARIO 16: User can see all social media icons on inventory page", async ({ page }) => {

      await test.step("GIVEN: User is on https://www.saucedemo.com/inventory.html page", async () => {
      
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        });
      
        await test.step("WHEN: User observe all social media icons the website", async () => {
      
        });
      
        await test.step("THEN: User can see all social media icons on inventory page", async () => {
    
          await expect(page.locator('[data-test="social-twitter"]')).toBeVisible();
          await expect(page.locator('[data-test="social-facebook"]')).toBeVisible();
          await expect(page.locator('[data-test="social-linkedin"]')).toBeVisible();
          
        });
    });
  });

  
