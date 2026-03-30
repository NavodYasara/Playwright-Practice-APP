import {test} from '@playwright/test'
import { PageManager } from '../Page-Objects/pageManager'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test('navigate to form page', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo.formLayoutPage()
    await pm.navigateTo.datepickerPage()
    await pm.navigateTo.smartTabPage()
    await pm.navigateTo.toastrPage()
    await pm.navigateTo.tooltipPage()   
})

test('navigate to form page 2', async ({page}) => {
    
})