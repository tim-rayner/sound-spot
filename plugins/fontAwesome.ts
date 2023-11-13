import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTwitterSquare,
  faTwitch,
  faGithubSquare,
} from "@fortawesome/free-brands-svg-icons";

import {
  faSun,
  faMoon,
  faChevronDown,
  faE,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faTwitterSquare,
  faTwitch,
  faGithubSquare,
  faSun,
  faMoon,
  faChevronDown,
  faE,
  faEdit
);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  //@ts-ignore
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});
