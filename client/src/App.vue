<template>
    <div class="page-container">
        <div class="wrapper">
            <Chat v-if="currentUserName" :currentUserName="currentUserName"/>
            <Login v-if="!currentUserName" v-on:onCreate="currentUserName = $event"/>
        </div>
    </div>
</template>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    body {
        background: rgb(56, 60, 67);
    }

    .wrapper {
        width: 80%;
        margin: 0 auto;
        margin-top: 95px;
    }
</style>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import Chat from "@/components/Chat.vue";
  import Login from "@/components/Login.vue";

  @Component({
    components: {
      Chat, Login
    }
  })
  export default class App extends Vue {

      currentUserName = null;

  }
</script>