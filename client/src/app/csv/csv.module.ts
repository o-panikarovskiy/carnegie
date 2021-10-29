import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { CSVImportRoutingModule } from 'src/app/csv/csv-routing.module';
import { ImportsService } from 'src/app/csv/services/imports.service';
import { UploadLocalizationsComponent } from 'src/app/csv/upload/upload-localizations/upload-localizations.component';
import { UploadProteinsComponent } from 'src/app/csv/upload/upload-proteins/upload-proteins.component';
import { UploadButtonComponent } from './upload/upload-button/upload-button.component';
import { UploadFormComponent } from './upload/upload-form/upload-form.component';
import { UploadGenesComponent } from './upload/upload-genes/upload-genes.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    UploadComponent, //
    UploadFormComponent,
    UploadButtonComponent,
    UploadGenesComponent,
    UploadProteinsComponent,
    UploadLocalizationsComponent,
  ],
  imports: [
    CommonModule, //
    MatTabsModule,
    MatButtonModule,
    ScrollingModule,
    MatProgressBarModule,
    CSVImportRoutingModule,
  ],
  providers: [ImportsService],
})
export class CSVImportModule {}
