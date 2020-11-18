import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("siedeNav") sideNav: ElementRef;

  title = 'hotel-app';
  inputDisbled: boolean;

  disableInput(value): void {
    this.inputDisbled = value;
  }

  openNav() {
    this.sideNav.nativeElement.style.width = "250px";
  }
  
  closeNav() {
    this.sideNav.nativeElement.style.width = "0";
  }
 }
