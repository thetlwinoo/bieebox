import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxTreeViewComponent } from '@box/components/tree-view/tree-view.component';
import { BoxTreeViewDirective } from './tree-view.directive';
import { MatButtonModule, MatIconModule, MatRippleModule, MatTreeModule, MatCheckboxModule } from '@angular/material';
import { BoxPipesModule } from '@box/pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatTreeModule,
        MatCheckboxModule,
        BoxPipesModule
    ],
    exports: [
        BoxTreeViewComponent,
        BoxTreeViewDirective
    ],
    declarations: [
        BoxTreeViewComponent,
        BoxTreeViewDirective
    ],
})
export class BoxTreeViewModule {
}
