import { InMemoryDbService } from 'angular-in-memory-web-api';

import { CategoryFakeDb } from 'app/fake-db/categories';
import { BrandFakeDb } from 'app/fake-db/brands';
import { SearchFakeDb } from 'app/fake-db/search';

export class FakeDbService implements InMemoryDbService {
    createDb(): any {
        return {
            categories: CategoryFakeDb.categories,
            banner_categories: CategoryFakeDb.bannerCategories,
            brands: BrandFakeDb.brands,
            servicesandpromotions: CategoryFakeDb.servicesandpromotions,
            condition: CategoryFakeDb.condition,
            tags: CategoryFakeDb.tags,
            default_keywords: SearchFakeDb.defaultKeywords
        };
    }
}
