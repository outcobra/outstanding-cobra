import {MainComponent} from './main.component';
import {I18nMarkdownComponent} from '../shared/components/i18n-markdown/i18n-markdown.component';

export const mainRoutes = [
    {
        path: '',
        component: MainComponent,
        children: [
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
                path: '',
                component: I18nMarkdownComponent,
                data: {
                    path: '/assets/docs/about',
                    displayMode: 'card',
                    wrapperClasses: ['container', 'middle-container']
                }
            },
            {
                path: 'devs',
                component: I18nMarkdownComponent,
                data: {
                    path: '/assets/docs/profiles',
                    displayMode: 'card',
                    wrapperClasses: ['container', 'middle-container']
                }
            }
        ]
    }
];
