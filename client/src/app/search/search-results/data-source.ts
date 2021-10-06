import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Protein } from 'src/app/search/models';
import { StoreService } from 'src/app/search/store/store.service';

export class ProteinsDataSource implements DataSource<Protein> {
  constructor(private store: StoreService) {}

  connect(collectionViewer: CollectionViewer): Observable<readonly Protein[]> {
    return this.store.proteins$;
  }

  disconnect(collectionViewer: CollectionViewer): void {}
}
