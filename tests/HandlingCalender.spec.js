//import {test, expect } from "@playwright/test";
const { test, expect } = require("@playwright/test");
const exp = require("constants");

test("Calender Handling", async ({ browser }) => {

    const year = "2027";
    const month = "6";
    const day = "15";

    const expectedDate = [month,day,year];

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/");
    // console.log("Title : " +await page.title());
    await expect(page).toHaveTitle("GreenKart - veg and fruits kart");
    // expect(page.getByTitle("GreenKart - veg and fruits kart")).toBeTruthy();

    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.getByRole("link", { name: "Top Deals" }).click()
    ])
    // await page.pause();

    await expect(newPage.getByLabel("Search:")).toBeVisible();
    await newPage.locator(".react-date-picker__inputGroup").click();
    await newPage.locator(".react-calendar__navigation__label").click();
    await newPage.locator(".react-calendar__navigation__label__labelText").click();
    await newPage.getByText(year).click();
    await newPage.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();
    await newPage.locator("//abbr[text()='" + day + "']").click();

    const date = await newPage.locator("input[name='date']").getAttribute('value');
    console.log("date : " + date);

    // expect(date.split("-")[0].localeCompare(year)).toEqual(0);
    // expect(date.split("-")[1].localeCompare(month)).toEqual(0);
    // expect(date.split("-")[2].localeCompare(day)).toEqual(0);

    const inputs = await newPage.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index < inputs.length; index++) {
        expect(await newPage.locator(".react-date-picker__inputGroup input").nth(index).getAttribute("value")).toEqual(expectedDate[index]);
    }

})