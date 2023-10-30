<template>
  <router-view/>
</template>

<script>
import {mapGetters} from "vuex";
import mixpanel from "mixpanel-browser";

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'getUser',
    ])
  },
  watch: {
    getUser() {
      if(this.getUser){
        mixpanel.identify(this.getUser?.client_id);
      }
    }
  },
}
</script>