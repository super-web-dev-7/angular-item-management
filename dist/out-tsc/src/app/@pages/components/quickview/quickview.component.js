"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var toggler_service_1 = require("../../services/toggler.service");
var quickview_service_1 = require("./quickview.service");
var note_1 = require("./note");
var message_1 = require("./message");
var QuickviewComponent = /** @class */ (function () {
    function QuickviewComponent(_service, http, toggler) {
        var _this = this;
        this._service = _service;
        this.http = http;
        this.toggler = toggler;
        this.subscriptions = [];
        this.isOpen = false;
        this.noteList = [];
        this.noteDeleteList = [];
        this.noteText = "";
        //List for deleting or CRUD functions
        this.deleteNoteMode = false;
        this.isNoteOpen = false;
        this.userList = [];
        this.editorModules = {
            //https://github.com/KillerCodeMonkey/ngx-quill
            toolbar: [
                [{ 'header': [1, 2, 3, 4, false] }],
                ['bold', 'italic', 'underline'],
                ['link', 'image']
            ]
        };
        this.subscriptions.push(this.toggler.quickViewToggle.subscribe(function (message) { _this.toggle(); }));
    }
    QuickviewComponent.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.unsubscribe();
        }
    };
    QuickviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Retrieve posts from the API
        this.subscriptions.push(this._service.getNotes().subscribe(function (notes) {
            _this.noteList = notes;
        }));
        this.subscriptions.push(this._service.getUsers().subscribe(function (users) {
            _this.userList = users;
        }));
        this.subscriptions.push(this._service.getChatMessages().subscribe(function (messages) {
            _this.chatHistory = messages;
        }));
    };
    QuickviewComponent.prototype.toggle = function () {
        if (this.isOpen) {
            this.isOpen = false;
        }
        else {
            this.isOpen = true;
        }
    };
    QuickviewComponent.prototype.popNote = function (item) {
        var index = this.noteDeleteList.indexOf(item);
        if (index !== -1) {
            this.noteDeleteList.splice(index, 1);
        }
    };
    QuickviewComponent.prototype.pushNote = function (item) {
        this.noteDeleteList.push(item);
    };
    QuickviewComponent.prototype.onSelectNote = function (item) {
        if (!this.deleteNoteMode) {
            this.selectedNote = item;
            this.noteText = this.selectedNote.notes;
            this.isNoteOpen = true;
        }
    };
    QuickviewComponent.prototype.toggleNotesView = function () {
        if (this.isNoteOpen) {
            this.isNoteOpen = false;
            this.saveNote();
        }
        else
            this.isNoteOpen = true;
    };
    QuickviewComponent.prototype.onCheck = function (e, item) {
        if (e.target.checked) {
            this.pushNote(item);
        }
        else {
            this.popNote(item);
        }
    };
    QuickviewComponent.prototype.composeNote = function () {
        this.isNoteOpen = true;
        this.selectedNote = new note_1.Note;
        this.selectedNote.id = this.noteList.length + 1;
        this.selectedNote.date = new Date();
        this.selectedNote.notes = "";
        this.noteText = "";
        this.noteList.push(this.selectedNote);
    };
    QuickviewComponent.prototype.saveNote = function () {
        this.selectedNote.notes = this.noteText;
    };
    QuickviewComponent.prototype.deleteMode = function () {
        if (this.deleteNoteMode)
            this.deleteNoteMode = false;
        else
            this.deleteNoteMode = true;
    };
    QuickviewComponent.prototype.deleteNote = function () {
        var _this = this;
        this.noteList = this.noteList.filter(function (item) { return _this.noteDeleteList.indexOf(item) === -1; });
    };
    QuickviewComponent.prototype.onMessageKeyPress = function (event) {
        if (event.keyCode == 13) {
            if (this.userMessage) {
                this.newMessage = new message_1.chatMessage;
                this.newMessage.from = "me";
                this.newMessage.date = "";
                this.newMessage.message = this.userMessage;
                this.chatHistory["log"].push(this.newMessage);
                this.userMessage = "";
                this.chatHistoryWrapper.nativeElement.scrollTop = this.chatHistoryWrapper.nativeElement.scrollHeight;
            }
        }
    };
    __decorate([
        core_1.ViewChild('chatHistoryWrapper', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], QuickviewComponent.prototype, "chatHistoryWrapper", void 0);
    QuickviewComponent = __decorate([
        core_1.Component({
            selector: 'app-quickview',
            templateUrl: './quickview.component.html',
            styleUrls: ['./quickview.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [quickview_service_1.QuickviewService, http_1.HttpClient, toggler_service_1.pagesToggleService])
    ], QuickviewComponent);
    return QuickviewComponent;
}());
exports.QuickviewComponent = QuickviewComponent;
//# sourceMappingURL=quickview.component.js.map