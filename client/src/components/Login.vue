<template>
    <div class="login-wrapper">
        <div class="login-form">
            <div class="login-header">
                <p>Please select the nickname</p>
            </div>
            <div class="select-user-name">
                <input v-model="userName" type="text" class="login-input" v-on:keyup.enter="onSubmit()"/>
            </div>
            <div class="log-in">
                <button
                        @click="onSubmit()"
                        class="btn"
                        type="button"
                        v-bind:class="{ 'is-disabled': !userName }">
                    Log in
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    html, body, html * {
        font-family: 'Roboto', sans-serif;
    }

    .login-wrapper {
        position: relative;
        width: 100%;
        min-height: 500px;
        background: rgb(31, 33, 46);
        background: linear-gradient(25deg, #1f212e 0%, rgba(22, 25, 38, 0.3803921568627451) 100%);
        box-shadow: 0 0 17px 0px black;
        padding-bottom: 60px;
        overflow: hidden;
    }
    .login-form {
        display:flex;
        flex-direction:column;
        padding: 15px;
    }

    .login-header{
        text-align:center;
        display:flex;
        flex-direction:column;
        margin-bottom: 20px;
        color: white;
        font-size: 28px;
        margin-top: 80px;
    }

    .select-user-name {
        display: flex;
        justify-content: center;
        margin: 20px;

        .login-input{
            height:40px;
            margin: 10px 0px;
            background-color: transparent;
            border: none;
            border-bottom: 2px solid #fff;
            outline: none;
            padding: 5px 5px 15px;
            text-align: center;
            width: 400px;
            color: #fff;
            font-weight: 100;
            font-size: 200%;
        }
    }

    .log-in {
        display: flex;
        justify-content: center;
        margin-top: 20px;

        .btn {
            border: none;
            padding: 0;
            margin: 0;
            outline: none;
            background: rgb(243, 107, 131);
            width: 124px;
            height: 44px;
            border-radius: 3px;
            font-size: 15px;
            cursor: pointer;
            color: white;

            &:hover {
                background: #e45a72;
            }

            &.is-disabled {
                cursor: not-allowed;
                pointer-events: none;
            }
        }
    }

    @media screen and (max-width: 780px) {
        .login-wrapper {
            width:90%;
        }
    }
</style>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    class Login extends Vue {
        @Prop() currentUserName!: string;

        userName = '';

        public onSubmit() {
            this.$emit('onCreate', this.userName);
        }
    }
    export default Login;
</script>