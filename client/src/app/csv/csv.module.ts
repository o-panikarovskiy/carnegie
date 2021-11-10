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
import { UploadDomainsComponent } from 'src/app/csv/upload/upload-domains/upload-domains.component';
import { UploadLocalizationsComponent } from 'src/app/csv/upload/upload-localizations/upload-localizations.component';
import { UploadPathwaysComponent } from 'src/app/csv/upload/upload-pathways/upload-pathways.component';
import { UploadProteinsComponent } from 'src/app/csv/upload/upload-proteins/upload-proteins.component';
import { UploadReactionsComponent } from 'src/app/csv/upload/upload-reactions/upload-reactions.component';
import { UploadTagsComponent } from 'src/app/csv/upload/upload-tags/upload-tags.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadButtonComponent } from './upload/upload-button/upload-button.component';
import { UploadFormComponent } from './upload/upload-form/upload-form.component';
import { UploadGenesComponent } from './upload/upload-genes/upload-genes.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    UploadComponent, //
    UploadTagsComponent,
    UploadFormComponent,
    UploadButtonComponent,
    UploadGenesComponent,
    UploadDomainsComponent,
    UploadProteinsComponent,
    UploadPathwaysComponent,
    UploadReactionsComponent,
    UploadLocalizationsComponent,
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
