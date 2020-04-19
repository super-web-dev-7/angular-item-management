import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ModalComponent } from '../../common/modal/modal.component';
import { CreateFieldComponent } from './create-field/create-field.component';
import { IField } from '../../models/field.model';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { ModalSize } from '@app/common/modal/ModalEnums';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss']
})
export class AddFieldComponent implements OnInit {

  private existingFieldIcon;
  private size = this.getSize();

  constructor() { 
    this.existingFieldIcon = faLink;
  }

  @ViewChild("createFieldModal", {static: true})
  public createFieldModal: ModalComponent;

  @ViewChild("createFieldComponent", {static: true})
  public createFieldComponent: CreateFieldComponent;

  @Input()
  public projectTypeFields: IField[];

  private createdSubject: Subject<IField[]> = new Subject();

  public shouldCreateNewField = false;
  public shouldAddExistingField = false;

  ngOnInit() {
    this.onCancel.bind(this);
  }

  openAndWaitForFinish(): Observable<IField[]> {
    this.open();
    return this.createdSubject.asObservable();
  }

  private onCancel = () => {
    this.createdSubject.next();
  }

  close() {
    this.createFieldModal.cancel();
  }

  open() {
    this.shouldAddExistingField = false;
    this.shouldCreateNewField = false;
    this.createFieldModal.show();
  }

  onSelectExistingFieldOption() {
    this.shouldAddExistingField = true;
    this.shouldCreateNewField = false;
  }

  onSelectNewFieldOption() {
    this.shouldAddExistingField = false;
    this.shouldCreateNewField = true;
  }

  afterFieldCreated(createdField: IField[]) {
    console.log(createdField);
    this.createFieldModal.hide();
    this.createdSubject.next(createdField);
  }

  getSize() {
    return ModalSize.LARGE;
  }
}
