import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import '@formio/angular';
import { FormioModule } from '@formio/angular';
import { FormRenderComponent } from '../form-render/form-render.component';


@Component({
  selector: 'app-form-builder',
  standalone: true,


  imports: [CommonModule, FormsModule, FormioModule, RouterLink, RouterOutlet, FormRenderComponent],

  templateUrl: './form-builder.component.html',

  styleUrl: './form-builder.component.css'
})
export class FormBuilderComponent {

  public jsonData: any = null;
  screenName = '';
  isDuplicate: boolean = false;

  @ViewChild('json') jsonElement?: ElementRef;
  public form: Object = {
    components: []
  };

  onChange(event: any) {
    this.jsonData = event.form;
    // console.log('JSON Data: yhi h bhai ', this.jsonData); 
    this.jsonElement!.nativeElement.innerHTML = '';
    this.jsonElement!.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));

    console.log(this.jsonElement);
  }

  saveForm(): void {

    if (this.screenName === '') {
      alert('screenName is required');
      return;
    }
    const savedForms = JSON.parse(localStorage.getItem('forms') || '[]');

    const isMatch = savedForms.some((form: { title: string, components: [] }) => form.title === this.screenName);
    if (isMatch) {
      alert('screenName already exists');
      return;
    }

    //console.log(this.jsonData.componets);
    savedForms.push({ title: this.screenName, components: this.jsonData.components });
    localStorage.setItem('forms', JSON.stringify(savedForms));
    console.log(savedForms);
  }

}