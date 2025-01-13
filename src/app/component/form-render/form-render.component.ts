import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import '@formio/angular';
import { FormioModule } from '@formio/angular';


@Component({
  selector: 'app-form-render',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule, CommonModule , FormioModule  ],
  templateUrl: './form-render.component.html',
  styleUrl: './form-render.component.css'
})
export class FormRenderComponent {
  screens: any[] = [];
  selectedScreen = '';
   formJson: any;

  ngOnInit(): void {

    // console.log(localStorage.getItem('forms')); 
    this.screens = JSON.parse(localStorage.getItem('forms') || '[]');
    console.log( 'yha se kya aa rha screens , mtlb sare forms ' , this.screens);
  }

  loadForm(): void {
    const screen = this.screens.find(s => s.title === this.selectedScreen);
    this.formJson = screen;

    // console.log('screen which have title(scren-name ) , form (components) ' , screen);
    // console.log('screen ke andar form' , screen?.form);
    // console.log('here it is we set json for later use ( renderer) ');
    // console.log(this.formJson);
  }

  onSubmit(submission: any) {
    

   // console.log(submission); // This will print out the full submission from Form.io API.
     console.log(submission);

     // Retrieve saved forms from local storage
  const savedForms = JSON.parse(localStorage.getItem('forms') || '[]');

  // Check if the form with the given screenName exists
  const formIndex = savedForms.findIndex((form: { title: string; components: []; submissions?: any[] }) => 
    form.title === this.selectedScreen
  );

  if (formIndex === -1) {
    console.error(`Form with title "${this.selectedScreen}" not found.`);
    return;
  }

  // If the form exists, append or update its submissions
  const formToUpdate = savedForms[formIndex];
  
  // Initialize submissions array if not present
  if (!formToUpdate.submissions) {
    formToUpdate.submissions = {};
  }

  // Add the new submission data
  formToUpdate.submissions = submission.data;

  // Update the forms array
  savedForms[formIndex] = formToUpdate;

  // Save back to local storage
  localStorage.setItem('forms', JSON.stringify(savedForms));

  console.log('Updated forms:', savedForms);
  console.log(`Submission saved for form "${this.selectedScreen}"`);

  }
}
