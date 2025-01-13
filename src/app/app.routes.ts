import { Routes } from '@angular/router';
import { FormBuilderComponent} from './component/form-builder/form-builder.component'
import { FormRenderComponent } from './component/form-render/form-render.component';
import { FormDataComponent } from './component/form-data/form-data.component';

export const routes: Routes = [
 
  { path: 'builder', component: FormBuilderComponent },

  { path: 'render', component: FormRenderComponent },

  { path: 'data', component: FormDataComponent },

];

