import { InMemoryDbService } from 'angular-in-memory-web-api';

import { CategoryFakeDb } from 'app/fake-db/categories';
import { BrandFakeDb } from 'app/fake-db/brands';

export class FakeDbService implements InMemoryDbService {
    createDb(): any {
        return {
            categories: CategoryFakeDb.categories,
            banner_categories: CategoryFakeDb.bannerCategories,
            brands: BrandFakeDb.brands
        };
    }
}
