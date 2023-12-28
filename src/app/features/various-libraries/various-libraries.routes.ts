import { Routes } from "@angular/router";
import { Html2CanvasComponent } from "./containers/html2canvas/html2canvas.component";
import { VariousLibrariesPageComponent } from "./containers/various-libraries-page/various-libraries-page.component";

export const VARIOUS_LIBRARIES_ROUTES: Routes = [
  {
    path: '',
    component: VariousLibrariesPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'html2canvas',
        pathMatch: 'full',
      },
      {
        path: 'html2canvas',
        component: Html2CanvasComponent,
        title: 'Html2canvas',
      },
    ],
  },
];
