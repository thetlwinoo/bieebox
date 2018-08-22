import { Inject, Injectable, InjectionToken } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable()
export class BoxInMemoryService {
    public categories: any[];
    public bannerCategories: any[];
    public brands: any[];

    constructor(
        private http: HttpClient
    ) {
    }

    public loadAll(){
        this.getCategories({});
        this.getBannerCategories({});
        this.getBrands({});
    }

    private getCategories(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('api/categories')
                .subscribe((response: any) => {
                    this.categories = response;
                    resolve(response);
                }, reject);
        });
    }

    private getBannerCategories(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('api/banner_categories')
                .subscribe((response: any) => {
                    this.bannerCategories = response;
                    resolve(response);
                }, reject);
        });
    }

    private getBrands(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('api/brands')
                .subscribe((response: any) => {
                    this.brands = response;
                    resolve(response);
                }, reject);
        });
    }
}