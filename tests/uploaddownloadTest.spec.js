const exceljs = require("exceljs");
const {test,expect} = require("@playwright/test");

async function writeExcelTest(searchText,replaceText,change,filePath) {
   
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcelTest(worksheet,searchText);

    const cell = worksheet.getCell(output.row,output.col+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}

async function readExcelTest(worksheet,searchText) {
    let output = {row:-1,col:-1};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                // console.log("(" + rowNumber +","+colNumber +")");
                output.row = rowNumber;
                output.col = colNumber;
            }

        })
    })
    return output;
}
// writeExcelTest("Rabbit",350,{rowChange:0,colChange:2},"/Users/lokeshkumar/Downloads/excelTest.xlsx");

test("Excel upload download test",async ({page})=>{
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    // const downloadPromise = page.waitForEvent('download');
    const downloadButton = page.getByRole('button',{name:'Download'});

    const download = await Promise.all([page.waitForEvent("download"),await downloadButton.click()]);
    //saving file at ExcelUtils folder
    await download[0].saveAs("./ExcelUtils/" +download[0].suggestedFilename());
    const filePath = "ExcelUtils/download.xlsx";
    writeExcelTest("Mango",350,{rowChange:0,colChange:2},filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);

    const textlocator = page.getByText(textSearch);
    const desiredRow = page.getByRole('row').filter({ has: textlocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

});

