<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height style="min-width: 300px" class="justify-center">
                <v-col :cols="4" v-for="(type, index) in types" :key="index">
                    <v-checkbox
                                v-model="selected"
                                :label="type.label"
                                :value="type.val"
                                class="ma-0 pa-0"
                                color="warning"></v-checkbox>
                </v-col>
                <v-btn color="success" @click="submit" :disabled="stored===selected" class="ma-auto">
                    <v-icon>mdi-sync</v-icon>
                    <span>确定</span>
                </v-btn>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                stored: [], //stored types
                selected: [], //selected types
                url: '',
                types: [
                    {val: 'a', label: '动画'},
                    {val: 'b', label: '漫画'},
                    {val: 'c', label: '游戏'},
                    {val: 'd', label: '文学'},
                    {val: 'e', label: '原创'},
                    {val: 'f', label: '来自网络'},
                    {val: 'g', label: '其他'},
                    {val: 'h', label: '影视'},
                    {val: 'i', label: '诗词'},
                    {val: 'j', label: '网易云'},
                    {val: 'k', label: '哲学'},
                    {val: 'l', label: '抖机灵'},
                ],
            }
        },
        methods: {
            submit() {
                browser.storage.local.set({types: this.selected})
                .then(()=>{
                    window.close()
                })
            }
        },
        created() {
            browser.storage.local.get('types')
                .then(data => {
                    this.stored = data.types
                    this.selected = data.types
                    this.fetch()
                })
        },
    }
</script>
