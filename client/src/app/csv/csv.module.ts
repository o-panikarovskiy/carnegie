import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { CSVImportRoutingModule } from 'src/app/csv/csv-routing.module';
import { CSVImportService } from 'src/app/csv/services/import.service';
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
    ScrollingModule,
    MatProgressBarModule,
    CSVImportRoutingModule,
  ],
  providers: [CSVImportService],
})
export class CSVImportModule {}
