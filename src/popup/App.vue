<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <v-card
                        flat
                        min-width="300"
                >
                    <v-card-text class="text-center">{{hitokoto.hitokoto}}</v-card-text>
                    <v-card-actions>
                        <v-btn
                                icon
                                color="purple"
                                :href="'https://hitokoto.cn?uuid='+hitokoto.uuid"
                                target="_blank"
                        >
                            <v-icon>mdi-link-variant</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn icon color="primary" @click="next">
                            <v-icon>mdi-skip-next</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                hitokoto: {
                    hitokoto: '',
                    from: '',
                    uuid: 0
                },
                url: ''
            }
        },
        methods: {
            next: function () {
                this.fetch()
            },
            fetch: function () {
                this.$api
                    .get('https://v1.hitokoto.cn', {
                        params: {
                            encode: 'utf-8',
                            c: 'a'
                        }
                    })
                    .then(response => {
                        this.hitokoto = response.data
                    })
                    .catch(() => {
                        this.hitokoto.hitokoto = '出错了~'
                        this.hitokoto.from = ''
                    })
            }
        },
        created() {
            this.fetch()
        },
    }
</script>
