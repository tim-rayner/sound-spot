import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import InputSwitch from "primevue/inputswitch";
import Card from "primevue/card";
import Textarea from "primevue/textarea";
import Fieldset from "primevue/fieldset";
import Avatar from "primevue/avatar";
import Dialog from "primevue/dialog";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("InputSwitch", InputSwitch);
  nuxtApp.vueApp.component("Card", Card);
  nuxtApp.vueApp.component("Textarea", Textarea);
  nuxtApp.vueApp.component("Fieldset", Fieldset);
  nuxtApp.vueApp.component("Avatar", Avatar);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("TabView", TabView);
  nuxtApp.vueApp.component("TabPanel", TabPanel);
});
