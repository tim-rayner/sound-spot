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
import AvatarGroup from "primevue/avatargroup";
import Skeleton from "primevue/skeleton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Carousel from "primevue/carousel";
import Row from "primevue/row";
import Chips from "primevue/chips";
import MultiSelect from "primevue/multiselect";

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
  nuxtApp.vueApp.component("PrimeAvatarGroup", AvatarGroup);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("TabView", TabView);
  nuxtApp.vueApp.component("TabPanel", TabPanel);
  nuxtApp.vueApp.component("Skeleton", Skeleton);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("ColumnGroup", ColumnGroup);
  nuxtApp.vueApp.component("Row", Row);
  nuxtApp.vueApp.component("Chips", Chips);
  nuxtApp.vueApp.component("MultiSelect", MultiSelect);
  nuxtApp.vueApp.component("Carousel", Carousel);
});
