<template>
    <div class="nf reveal-from-top">
        <div class="nh az">
            <h3 class="oe ok">dclip</h3>
            <p class="sz" v-html="$t('dclip_detail')">
               </p>
            <div class="tl" style=" margin-top: 50px;overflow:hidden;border-radius: 10px;">
                <input v-model="description" class="_ te" id="des_input" :placeholder="$t('dclip_input')"
                    style="border: none;background-color:#F8F9F9">
                <button @click="toSearch" class="tbuttonn fbuttonl">Try it !</button>
            </div>
        </div>
        <div class="nl nc rillustration-element-i list_bg_container" style="overflow:hidden;"
            :style="{ borderRadius: flag ? '20px' : '10px' }">
            <img ref="imageBox" :src="picture" alt="Features split image 02" />
            <div v-show="!flag" class="listBox" ref="waterFallBox" style="overflow-y: auto;width: 100%;">
                <Waterfall :list="Waterfalldata.list"></Waterfall>
            </div>
            <div class="loadingBox" v-show="showLoading">
                <Loading></Loading>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import picture from '../../../public/static/picture/2.jpeg'
import { searchIllustByDCLIP } from '../../api/api';
import Waterfall from '../Common/Waterfall.vue';
import Loading from '../Common/loading.vue'
import { ref, onMounted, nextTick } from 'vue';
import { useToast } from 'vue-toastification'
const {t} = useI18n()
let description = ref('')
let flag = ref(true)
let Waterfalldata = ref({} as { list: WaterfallItem[] })
let imageBox = ref(null as unknown as HTMLDivElement)
let waterFallBox = ref(null as unknown as HTMLDivElement)
let showLoading = ref(false)
let largeList: Array<WaterfallItem> = []
const toSearch = () => {
    showLoading.value = true
    flag.value = true
    largeList = []
    searchIllustByDCLIP(description.value).then(res => {
        res.data.data.forEach((item) => {
            let image = item.imageUrls[0]
            Object.keys(image).forEach((item) => {
                let urlstr = image[item as keyof Url]
                image[item as keyof Url] = urlstr.replace('https://i.pximg.net', process.env.NODE_ENV == 'production' ? 'https://i.pixiv.re/' : '/pix2score')
            })
            largeList.push({ src: image.large, title: item.title, id: item.id, height: item.height, width: item.width, ratio: (item.width / item.height) })
        })
        Waterfalldata.value.list = largeList
        flag.value = false
        showLoading.value = false
    }).catch(err => {
        flag.value = true
        showLoading.value = false
        useToast().error(t('timeout_tip'))
    })
}

onMounted(() => {
    imageBox.value.onload = (e) => {
        waterFallBox.value.style.height = imageBox.value.clientHeight + 'px'
        if (window.location.hash == '#Dclip')
            nextTick(() => {
                let hash = window.location.hash
                if (hash) {
                    let el = e.target as HTMLImageElement
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' })
                    }
                }
            })
    }
})


</script>
<style lang="scss" scoped></style>