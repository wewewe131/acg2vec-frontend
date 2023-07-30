<template>
    <div class="nf reveal-from-top">
        <div class="nh az">
            <h3 class="oe ok">illust2vec</h3>
            <p class="sz" v-html="$t('illust2vec_detail')"></p>
            <div class="custom-file-input-wrapper" style=" margin-top: 50px;">
                <label for="fileInput_2" class="custom-file-input-label">
                    <span ref="selectImage">{{ $t('image_select') }}</span>
                    <img ref="imageReShow" id="previewImage" class="custom-file-input-preview" alt="Preview"
                        style="display: none;">
                    <div id="placeholderIcon" class="custom-file-input-placeholder">
                        <i class="fas fa-image"></i>
                        <span></span>
                    </div>
                </label>
                <input @change="changeFile" ref="fileInput" type="file" id="fileInput" class="custom-file-input"
                    accept="image/*">
            </div>
            <button @click="tryIt" class="tbuttonn fbuttonl">Try it !</button>
        </div>
        <div class="nl nc rillustration-element-i list_bg_container" style="overflow:hidden;"
            :style="{ borderRadius: flag ? '20px' : '10px' }">
            <img ref="imageBox" :src="picture" alt="Features split image 04" />
            <div v-show="!flag" ref="waterFallBox">
                <Waterfall :list="Waterfalldata.list"></Waterfall>
            </div>
            <div class="loadingBox" v-show="showLoading">
                <Loading></Loading>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import picture from '../../../public/static/picture/4.jpeg'
import { getIllust2vecData } from '../../api/api';
import { ref, onMounted, nextTick } from 'vue';
import Loading from '../Common/loading.vue'
import Waterfall from '../Common/Waterfall.vue';
import { useToast } from 'vue-toastification'
let imageBox = ref(null as unknown as HTMLDivElement)
let selectImage = ref(null as unknown as HTMLSpanElement)
let flag = ref(true)
let showLoading = ref(false)
let data: FormData = new FormData();
let imageReShow = ref(null as unknown as HTMLImageElement)

const changeFile = (e: any) => {
    data = new FormData();
    let file: File = e.target.files[0]
    let reader: FileReader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
        imageReShow.value.src = e.target?.result as string
        imageReShow.value.style.display = 'block'
        selectImage.value.style.display = 'none'
    }
    data.append('image', file)
}

let Waterfalldata = ref({} as { list: WaterfallItem[] })
let largeList: Array<WaterfallItem> = []
let waterFallBox = ref(null as unknown as HTMLDivElement)

let tryIt = () => {
    if(!imageReShow.value.src){
        useToast().error("请先选择图片")
        return
    }
    showLoading.value = true
    Waterfalldata.value.list = []
    waterFallBox.value.scrollTop = 0
    flag.value = true
    largeList = []
    getIllust2vecData(data).then((res: { data: { data: ImageUrlItem[]; }; }) => {
        res.data.data.forEach((item: ImageUrlItem) => {
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
    }).catch((err: any) => {
        flag.value = true
        useToast().error("请求超时")
        showLoading.value = false
    })
}

onMounted(() => {
    imageBox.value.onload = () => {
        waterFallBox.value.style.height = imageBox.value.clientHeight + 'px'
        if (window.location.hash == '#illust2Vec')
            nextTick(() => {
                let hash = window.location.hash
                if (hash) {
                    let el = imageBox.value
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' })
                    }
                }
            })
    }

})

</script>
<style lang="scss" scoped></style>