import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../components/Index";
import AddSmoothie from "../components/AddSmoothie";
import EditSmoothie from "../components/EditSmoothie";
import DetailSmoothie from "../components/DetailSmoothie";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/add-smoothie",
      name: "AddSmoothie",
      component: AddSmoothie
    },
    {
      path: "/edit-smoothie/:smoothie_slug",
      name: "EditSmoothie",
      component: EditSmoothie
    },
  {
      path: "/detail-smoothie/:smoothie_slug",
      name: "DetailSmoothie",
      component: DetailSmoothie
    }
  ]
});
