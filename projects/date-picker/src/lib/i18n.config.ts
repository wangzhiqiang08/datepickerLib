import { ENGLISH } from './date-picker.l10n';
import { PatternCategories } from '@vmw/ngx-vip';

export const I18nConfig = {
    productID: 'SampleApp',
    component: 'datePicker',
    version: '1.0.0',
    i18nScope: [
        PatternCategories.DATE,
        PatternCategories.NUMBER,
        PatternCategories.CURRENCIES
    ],
    host: 'https://localhost:8091/',
    // By default, the resources of each component are isolated.
    // Please set isolated as false in a shared module.
    isolated: false,
    sourceBundles: [ENGLISH]
};