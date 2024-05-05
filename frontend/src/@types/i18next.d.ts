import Resources from './resources';
import {defaultNS} from "@/i18n";
import {ns} from "@/i18n";

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        ns: typeof ns;
        resources: Resources;
    }
}