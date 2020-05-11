<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-row
                        class="text-center"
                        justify="center">
                    <v-col :cols="8">
                        <v-card
                                width="800"
                                class="d-inline-block transparent"
                                flat
                        >
                            <v-card-text class="text-center headline">{{hitokoto.hitokoto}}</v-card-text>
                            <v-card-text class="text-right font-weight-light">{{hitokoto.from}}</v-card-text>

                            <v-card-actions>
                                <v-btn
                                        fab
                                        dark
                                        color="purple"
                                        :href="'https://hitokoto.cn?uuid='+hitokoto.uuid"
                                        target="_blank"
                                >
                                    <v-icon x-large>mdi-link-variant</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn fab color="primary" @click="next">
                                    <v-icon x-large>mdi-skip-next</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
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
