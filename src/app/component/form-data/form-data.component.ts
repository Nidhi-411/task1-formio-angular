import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-data',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './form-data.component.html',
  styleUrl: './form-data.component.css'
})
export class FormDataComponent {
   screens: any[] = [];
   selectedScreen = '';
   formData = {};
   formJson: any;
   formDataArray: { key: string; value: any }[] = [];


   ngOnInit(): void {

    // console.log(localStorage.getItem('forms')); 
    this.screens = JSON.parse(localStorage.getItem('forms') || '[]');
    console.log( 'yha se kya aa rha screens , mtlb sare forms ' , this.screens);

   
  }

  loadForm(): void {
    const screen = this.screens.find(s => s.title === this.selectedScreen);
    this.formJson = screen;
    console.log(this.formJson);
  // console.log( 'yhi kam ka h form data' ,screen.submissions);
   this.formData = screen.submissions;

   this.formDataArray = Object.entries(this.formData).map(([key, value]) => ({
    key,
    value,
  }));


     //console.log(' formJson (screen) which have title(scren-name ) , form (components)  , data( submitions)');
     //console.log( 'yhi kam ka h form data' ,this.formJson.submissions);

  }

}
