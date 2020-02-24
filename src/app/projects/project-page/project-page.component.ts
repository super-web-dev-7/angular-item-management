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
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
  }
  myfunc(event){
    if(event.target.text){
      if(event.target.text.trim() == "Items"){
        if(localStorage.getItem('copydata')){
  
            document.getElementById('popupid').hidden = false
        }
      }
    }   
  }
  ngAfterViewInit(){
  //alert('i ngAfterViewInit')
   // 
 }


}
