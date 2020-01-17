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
        routerLink:"projects",
        iconType:"pg",
        iconName:"home",
        thumbNailClass:"text-white"
      },
      {
        label:"UI Elements",
        iconType:"letter",
        iconName:"Ui",
        toggle:"close",
        submenu:[
          {
            label:"Color",
            routerLink:"ui/color",
            iconType:"letter",
            iconName:"c",
          },
          {
            label:"Typography",
            routerLink:"ui/typography",
            iconType:"letter",
            iconName:"t",
          },
          {
            label:"Icons",
            routerLink:"ui/icons",
            iconType:"letter",
            iconName:"i",
          },
          {
            label:"Buttons",
            routerLink:"ui/buttons",
            iconType:"letter",
            iconName:"b",
          },
          {
            label:"Notifications",
            routerLink:"ui/notifications",
            iconType:"letter",
            iconName:"n",
          },
          {
            label:"Modals",
            routerLink:"ui/modal",
            iconType:"letter",
            iconName:"m",
          },
          {
            label:"Progress & Activity",
            routerLink:"ui/progress",
            iconType:"letter",
            iconName:"pa",
          },
          {
            label:"Tabs & Accordians",
            routerLink:"ui/tabs",
            iconType:"letter",
            iconName:"a",
          },
          {
            label:"Sliders",
            routerLink:"ui/sliders",
            iconType:"letter",
            iconName:"s",
          },
          {
            label:"Treeview",
            routerLink:"ui/tree",
            iconType:"letter",
            iconName:"tv",
          }
        ]
      },
  ];

  ngOnInit() {
    this.changeLayout("menu-pin");
    this.changeLayout("menu-behind");
    //Will sidebar close on screens below 1024
    this.autoHideMenuPin();
  }

}
