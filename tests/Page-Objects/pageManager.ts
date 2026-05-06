import {Page, expect} from "@playwright/test"
import { NavigationPage } from "./navigationPage"

export class PageManager{
    private readonly page: Page
    private readonly navigationPage: NavigationPage

    constructor (page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(page)
    }

    get navigateTo(){
        return this.navigationPage
    }
}
