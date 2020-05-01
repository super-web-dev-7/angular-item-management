import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit,AfterViewInit {

  subscription;
  projectId;
  itemSelectionView =false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
    
  }
  ShowItemSelection(event){
    if(event.target.text){
      if(event.target.text.trim() == "Items"){
        if(localStorage.getItem('copydata')){
         this.itemSelectionView=true;

        }
      }
    }   
  }
  ngAfterViewInit(){
  
 }


}
