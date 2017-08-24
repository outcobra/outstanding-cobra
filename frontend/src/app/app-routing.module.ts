import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FallbackComponent} from './main/fallback/fallback.component';
import {I18nMarkdownComponent} from './shared/components/i18n-markdown/i18n-markdown.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'features',
                component: I18nMarkdownComponent,
                data: {
                    path: '/assets/docs/features',
                    displayMode: 'card',
                    wrapperClasses: ['container', 'middle-container', 'features-text']
                }
            },
            {
                path: '**',
                component: FallbackComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
