import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

    @Input() fileLists;
    imageUrl: any;

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
        this.imageUrl = environment.imageUrl;
    }

}
