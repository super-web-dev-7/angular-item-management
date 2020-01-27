import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { RootLayout } from '../root/root.component';


@Component({
  selector: 'corporate-layout',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CorporateLayout extends RootLayout implements OnInit {
  menuLinks = [
      {
        label:"Projects",
        details:"12 New Updates",
        routerLink:"/projects",
        iconType:"pg",
        iconName:"home",
        thumbNailClass:"text-white"
      },
  ];

  ngOnInit() {
    this.changeLayout("menu-pin");
    this.changeLayout("menu-behind");
    //Will sidebar close on screens below 1024
    this.autoHideMenuPin();
    this._footer = false;
  }

}
