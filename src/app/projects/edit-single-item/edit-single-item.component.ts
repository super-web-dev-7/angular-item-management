import { Component, OnInit, ViewChild, Input, ɵConsole, Output, EventEmitter } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { ItemsService } from "../items-list/items.service";

@Component({
  selector: 'app-edit-single-item',
  templateUrl: './edit-single-item.component.html',
  styleUrls: ['./edit-single-item.component.scss']
})


export class EditSingleItemComponent implements OnInit {
  @ViewChild("newItemPopup", { static: false }) newItemPopup: ModalDirective;
  @Input() projectId;
  @Input() fieldType;
  @Input() fieldName;
  // @Input() SelectedSingleRowData;
  @Input() dbclicked;
  @Input() fields;
  @Input() fieldslable;
  @Output() getLatestitem: EventEmitter<any> = new EventEmitter();

  [key: string]: any;
  data = {};
  items;
  data1 = {}
  comment;
  SelectedSingleRowData = []
  selectedRowComments = []
  fieldWithData = []
  reverse = false;
  constructor(private itemsService: ItemsService, ) { }

  ngOnInit() {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementById("TabComment");
    tabcontent.style.display = "none"
  }
  getItems(itemId) {
    var itemcomment = []
    this.itemsService
      .getItemsByProject(this.projectId)
      .subscribe((items: any) => {
        const found = items.find(element => element._id == itemId);
        this.selectedRowComments = found.comments.reverse();
        this.selectedRowComments['itemid'] = found._id
        // this.shortedcoment = shortedcoment.reverse();
        // this.selectedRowComments = shortedcoment;
      });


  }



  show(event) {
    this.newItemPopup.config.ignoreBackdropClick = true
    this.newItemPopup.config.backdrop = false
    this.newItemPopup.config.keyboard = true
    // this.getItems(event.data._id)
    if (this.dbclicked == true) {
     // this.newItemPopup.hide();
    } else {
      var popup = this.newItemPopup
      this.SelectedSingleRowData = event.data;
      if (event.type == "rowClicked") {
        if (this.dbclicked == false || this.dbclicked == undefined) {
          var db = this.dbclicked
          setTimeout(function () {
            if (localStorage.getItem('pdata') == 'true') {
              popup.show()
            }
            if (localStorage.getItem('pdata') == 'false') {
              // popup.hide()
            }
          }, 300);
        }
      }
      // this.newItemPopup.show();
      if (this.SelectedSingleRowData) {
        this.selectedRowComments = this.SelectedSingleRowData['comments']
        this.selectedRowComments['itemid'] = this.SelectedSingleRowData['_id']
        if(this.reverse == false){
          this.selectedRowComments.reverse();
          this.reverse = true;
         
        }
        // this.selectedRowComments = shorted;
      }

      // if (this.dbclicked == true) {
      //   this.newItemPopup.hide();
      // }
      this.fieldName.forEach(item => {
        this.data[item] = '';
      })
    }

  }

  openTabs(evt, tabID) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabID).style.display = "block";
    evt.currentTarget.className += " active";
  }
  onChangeSelectValue(event: any) {
    this[event.target.name] = (<HTMLInputElement>event.target).value;
  }
  onFieldValuek(event: any) {
    this[event.target.name] = (<HTMLInputElement>event.target).value;
  }

  onEditItem() {
    this.fieldName.forEach(item => {
      if (this[item]) {
        this.data[item] = this[item];
      }
    });
    console.log(this.SelectedSingleRowData)
    this.data["_id"] = this.SelectedSingleRowData['_id']
    this.data["projectId"] = this.SelectedSingleRowData['projectId']
    this.itemsService
      .editItemByProject(this.data)
      .subscribe(result => {
        console.log('projectId')
        this.getLatestitem.emit();
      });
    // this.newItemPopup.hide()

  }

  addComment() {
    if (this.SelectedSingleRowData) {
      var data = {
        itemId: this.SelectedSingleRowData['_id'],
        comment: this.comment
      }
      this.itemsService
        .addComment(data, this.SelectedSingleRowData['_id'])
        .subscribe(result => {
          if (result) {
            this.getItems(data.itemId)
            this.comment = ''
          }
        });
    }
  }

  calledit(id) {
    document.getElementById(id).hidden = true
    document.getElementById('text' + id).hidden = false
    document.getElementById('date').hidden = true
  }

  mouseOutFromTaxtArea(event, commentID, comment) {
    var data = {
      itemId: this.selectedRowComments['itemid'],
      commentId: commentID,
      comment: event.target.value
    }
    this.itemsService
      .updateComment(data)
      .subscribe(result => {
        if (result) {
          this.getItems(data.itemId)
          document.getElementById(commentID).hidden = false;
          document.getElementById('text' + commentID).hidden = true;
          document.getElementById('date').hidden = false;
        };
      });

  }

  deleteComment(commentID) {
    var data = {
      itemId: this.selectedRowComments['itemid'],
      commentId: commentID,
    }
    this.itemsService
      .deleteComment(data)
      .subscribe(result => {
        if (result) {
          this.getItems(data.itemId)
        }
      });

  }

closeModel(event){  
  this.newItemPopup.hide();
}
}


