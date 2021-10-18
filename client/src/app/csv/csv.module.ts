import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { CSVImportRoutingModule } from 'src/app/csv/csv-routing.module';
import { UploadButtonComponent } from './upload/upload-button/upload-button.component';
import { UploadGenesComponent } from './upload/upload-genes/upload-genes.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    UploadComponent, //
    UploadGenesComponent,
    UploadButtonComponent,
  ],
  imports: [
    CommonModule, //
    MatTabsModule,
    MatButtonModule,
    MatProgressBarModule,
    CSVImportRoutingModule,
  ],
  providers: [],
})
export class CSVImportModule {}
