import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { Protein } from 'src/app/search/typings/table';

export class ProteinsDataSource implements DataSource<Protein> {
  constructor(private store: SearchStoreService) {}

  connect(collectionViewer: CollectionViewer): Observable<readonly Protein[]> {
    return this.store.proteins$;
  }

  disconnect(collectionViewer: CollectionViewer): void {}
}
