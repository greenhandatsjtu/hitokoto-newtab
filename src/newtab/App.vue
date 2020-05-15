<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height
                         :style="imageStyle">
                <v-row
                        class="text-center"
                        justify="center">
                    <v-col :cols="8">
                        <v-card
                                width="800"
                                class="d-inline-block"
                                flat
                                hover
                                color="rgba(255, 255, 255, 0.7)"
                                id="card"
                        >
                            <v-card-text
                                    class="text-center headline"
                                    v-clipboard:copy="hitokoto.hitokoto"
                                    v-clipboard:success="onCopy">{{hitokoto.hitokoto}}
                            </v-card-text>
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
                <v-row>
                    <v-btn
                            large
                            dark
                            color="pink lighten-3"
                            right
                            absolute
                            fab
                            @click.stop="dialog=true">
                        <v-icon>mdi-image-outline</v-icon>
                    </v-btn>
                </v-row>
            </v-container>
            <v-dialog
                    v-model="dialog"
                    width="500"
            >
                <v-card>
                    <v-card-title
                            class="headline grey lighten-2"
                            primary-title
                    >
                        上传壁纸
                    </v-card-title>

                    <v-card-text>
                        <v-file-input
                                accept="image/*"
                                label="File input"
                                show-size
                                small-chips
                                :counter="1"
                                prepend-icon="mdi-wallpaper"
                                v-model="image"
                                @change="preview"></v-file-input>
                        <v-container v-if="showPreview">
                            <v-img :src="previewSrc"></v-img>
                        </v-container>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn
                                color="success"
                                text
                                @click="upload"
                        >
                            Upload
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="error"
                                text
                                @click="dialog = false"
                        >
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-snackbar
                    v-model="snackbar.show"
                    bottom
                    :color="snackbar.color"
                    :timeout="1000"
            >{{snackbar.text}}
                <v-btn
                        dark
                        text
                        @click="snackbar.show = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-snackbar>
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
                stored: [],
                url: '',
                dialog: false,
                image: null, //uploading file
                showPreview: false,
                previewSrc: null, //preview image src
                src: null, //stored image src
                snackbar: {
                    text: null,
                    color: null,
                    show: false
                }
            }
        },
        computed: {
            imageStyle: function () {
                return {
                    backgroundImage: 'url(' + this.src + ')',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }
            }
        },
        methods: {
            next: function () {
                this.fetch()
            },
            fetch: function () {
                let params = new URLSearchParams();
                params.append('encode', 'utf-8')
                for (let t of this.stored) {
                    params.append('c', t)
                }
                this.$api
                    .get('https://v1.hitokoto.cn', {
                        params: params
                    })
                    .then(response => {
                        this.hitokoto = response.data
                    })
                    .catch(() => {
                        this.hitokoto.hitokoto = '出错了~'
                        this.hitokoto.from = ''
                    })
            },
            getWallpaper: function () {
                this.$browser.storage.local.get('wallpaper')
                    .then(data => {
                        if (data.wallpaper) {
                            this.src = data.wallpaper
                        }
                    })
            },
            upload: function () {
                if (this.image === null) {
                    this.$browser.storage.local.set({wallpaper: null})
                        .then(() => {
                                this.dialog = false
                                this.previewSrc = null
                                this.showPreview = false
                                this.src = null
                            }
                        )
                } else {
                    let reader = new FileReader()
                    reader.readAsDataURL(this.image)
                    reader.onload = () => {
                        this.$browser.storage.local.set({wallpaper: reader.result})
                            .then(() => {
                                    this.dialog = false
                                    this.image = null
                                    this.previewSrc = null
                                    this.showPreview = false
                                    this.src = reader.result
                                }
                            )
                    }
                }
            },
            preview: function () {
                let reader = new FileReader()
                reader.readAsDataURL(this.image)
                reader.onload = () => {
                    this.previewSrc = reader.result
                    this.showPreview = true
                }
            },
            onCopy: function () {
                this.snackbar = {
                    text: "一言复制成功！",
                    color: "success",
                    show: true
                }
            }
        },
        created: function () {
            this.$browser.storage.local.get('types')
                .then(data => {
                    this.stored = data.types
                    this.fetch()
                })
            this.getWallpaper()
            this.$browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
                if (message.action === "updateTypes") {
                    this.stored = message.data
                }
            })
        },
    }
</script>
