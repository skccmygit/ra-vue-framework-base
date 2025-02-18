import { createApp, defineAsyncComponent } from 'vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';

import router from './router';
import App from './App.vue'

const COMPONENTS = [
    "ContentCollapse", "InlineInput", "InlineTextarea", "OptionSelect", "OptionSwitch",
    "OptionRadio", "TooltipBox", "OptionSelectByCode",
    "InputDropdownFinder", "InputDropdownCell", "ItemsTable", "PanelCollapse",
    "InlineCheckbox", "ElementCollapse", "ElementButtons", "PageNavigator",
];

const app = createApp(App);

app.use(router);

COMPONENTS.forEach((component: string) => {
    app.component(component, defineAsyncComponent(() => import(`./components/${component}.vue`)));
})

app.mount('#app')
