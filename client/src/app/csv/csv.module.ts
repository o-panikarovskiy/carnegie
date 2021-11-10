import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { CSVImportRoutingModule } from 'src/app/csv/csv-routing.module';
import { ImportsService } from 'src/app/csv/services/imports.service';
import { ImportFormComponent } from 'src/app/csv/upload/import-form/import-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadButtonComponent } from './upload/upload-button/upload-button.component';
import { UploadFormComponent } from './upload/upload-form/upload-form.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    UploadComponent, //
    ImportFormComponent,
    UploadFormComponent,
    UploadButtonComponent,
  ],
  imports: [
    CommonModule, //
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    ScrollingModule,
    ReactiveFormsModule,
    SharedModule,
    MatProgressBarModule,
    CSVImportRoutingModule,
  ],
  providers: [ImportsService],
})
export class CSVImportModule {}
