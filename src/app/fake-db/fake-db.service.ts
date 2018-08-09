import { InMemoryDbService } from 'angular-in-memory-web-api';

import { CategoryFakeDb } from 'app/fake-db/categories';

export class FakeDbService implements InMemoryDbService {
    createDb(): any {
        return {
            categories: CategoryFakeDb.categories,
            banner_categories: CategoryFakeDb.bannerCategories
        };
    }
}
