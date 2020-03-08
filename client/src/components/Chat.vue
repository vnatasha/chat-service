<template>
    <div class="chat-wrapper">
        <div class="chat-header">
            User name: {{currentUserName}}
        </div>
        <ul class="chat-messages-list" ref='messageList'>
            <li
                    v-for="(item, index) in messages"
                    class="message"
                    v-bind:class="{ 'is-current-user': isCurrentUserName(item.userName) }"
                    :key="index">
                <span class="user-name">{{item.userName}}</span>
                {{ item.text }}
            </li>
        </ul>
        <div class="text-wrapper">
            <textarea
                    v-model="message"
                    placeholder="Write a message..."
                    class="textarea-field"
                    v-on:keyup.enter="send()">

            </textarea>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    html, body, html * {
        font-family: 'Roboto', sans-serif;
    }

    .chat-wrapper {
        position: relative;
        width: 100%;
        min-height: 500px;
        background: rgb(31, 33, 46);
        background: linear-gradient(25deg, #1f212e 0%, rgba(22, 25, 38, 0.3803921568627451) 100%);
        box-shadow: 0 0 17px 0px black;
        padding-bottom: 60px;
        overflow: hidden;
    }

    .chat-messages-list {
        display: flex;
        flex-direction: column;
        color: white;
        list-style: none;
        max-height: 100vh;
        margin: 0;
        padding: 30px 35px 0;
        overflow: hidden;
        overflow-y: scroll;
    }

    .chat-header {
        position: relative;
        background: #272934;
        color: white;
        padding: 20px;
        box-shadow: 0px 3px 17px 0px black;
        z-index: 3;
    }

    .user-name {
        position: absolute;
        top: -17px;
        left: 0;
        font-size: 11px;
        color: rgb(139, 139, 140);
    }

    .message {
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 70%;
        position: relative;
        padding: 10px;
        border-radius: 4px;
        background: rgb(53, 58, 70);
        margin-bottom: 20px;
        align-self: flex-start;

        &.is-current-user {
            align-self: flex-end;
            background: rgb(36, 67, 254);
            background: linear-gradient(12deg, #2443fe 0%, rgb(164, 174, 236) 100%);

            .user-name {
                left: auto;
                right: 0;
            }
        }
    }

    .log {
        align-self: center;
    }

    .textarea-field {
        width: 100%;
        resize: none;
        background: rgb(22, 25, 38);
        border: none;
        outline: none;
        color: white;
        margin: 0;
        padding: 13px 10px;
        font-size: 16px;
    }

    .text-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        background: rgb(22, 25, 38);
    }
</style>

<script lang="ts">
import { Message } from '@/model'
import {Component, Prop, Vue} from "vue-property-decorator";
import {ChatClient} from "@/client";

@Component
class Chat extends Vue {
    @Prop() currentUserName!: string;
    private client: ChatClient = new ChatClient();

    message = '';

    messages: Message[] = [
        {
            userName: 'Host',
            text: 'Welcome to the chat! Let us know what do you think',

        }
    ];

    users: string[] = [this.currentUserName];

    mounted() {
        this.client.init();
        this.client.onOtherMessage((data) => {
            this.messages.push({
                userName: data.userName,
                text: data.text
            });
        });
    }

    updated(){
        const elem = this.$refs.messageList as HTMLElement;
        elem.scrollTop = elem.scrollHeight;
    }

    public send() {
        if (!!this.message.trim()) {
            this.client.send({userName: this.currentUserName, text: this.message});
            this.messages.push({
                userName: this.currentUserName,
                text: this.message
            });
            this.message = '';
        }
    }

    public isCurrentUserName(userName: string): boolean {
        return this.currentUserName === userName;
    }
}

export default Chat;

</script>

