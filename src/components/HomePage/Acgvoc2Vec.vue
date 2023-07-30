<template>
    <div class="nf reveal-from-top">
        <div class="nh az">
            <h3 class="oe ok">acgvoc2vec</h3>
            <p class="sz" v-html="$t('acgvoc2vec_detail')">

            </p>
            <div class="tl" style=" margin-top: 50px;overflow:hidden;border-radius: 10px;"><input class="_ te" v-model="tag"
                    id="tag_input" :placeholder="$t('acgvoc2vec_input')" style="border: none;background-color:#F8F9F9">
                <button class="tbuttonn fbuttonl" @click="sendTry">Try it !</button>
            </div>
        </div>
        <div class="nl nc tillustration-element-n box" style="overflow:hidden;border-radius: 20px;position: relative;">
            <img @onload="recanvasSize()" ref="imageBox" v-show="showImage" :src="picture" alt="Features split image 01" />
            <canvas ref="canvas" class="canvas" v-show="!showImage">
            </canvas>
            <div v-show="showLoading" class="loadingBox">
                <Loading></Loading>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import picture from '../../../public/static/picture/1.jpeg'
import { getAcg2vecApiData } from '../../api/api';
import { nextTick, onMounted, ref } from 'vue';
import wordcloud from 'wordcloud'
import Loading from '../Common/loading.vue';
import { useToast } from 'vue-toastification';
// eslint-disable-next-line
defineOptions({
    name: 'Acgvoc2vec',
})

const imageBox = ref('' as unknown as HTMLDivElement)
const showImage = ref(true);
const tag = ref('')
const canvas = ref(null as unknown as HTMLCanvasElement)
const showLoading = ref(false)

// window.addEventListener('resize', () => {
//     recanvasSize()
//     showImage.value = true
// })
function isMobile() {
    let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return flag;
}
if (!isMobile())
    window.onresize = () => {
        recanvasSize()
        showImage.value = true
    }

let recanvasSize = () => {
    canvas.value.width = imageBox.value.clientWidth * window.devicePixelRatio
    canvas.value.height = imageBox.value.clientHeight * window.devicePixelRatio
    canvas.value.style.width = imageBox.value.clientWidth + 'px'
    canvas.value.style.height = imageBox.value.clientHeight + 'px'
}

let sendTry = () => {
    if (showImage.value)
        recanvasSize()
    showImage.value = true
    showLoading.value = true
    getAcg2vecApiData(tag.value).then(res => {
        let wordOption: wordcloud.Options = {} as wordcloud.Options
        wordOption =
        {
            gridSize: 1,
            weightFactor: function (size) {
                return size * 10
            },
            rotateRatio: 0.5,
            rotationSteps: 2,
            backgroundColor: '#fff',
            // minFontSize:40,
            color: () => {
                let arr = [];
                for (var i = 0; i < 3; i++) {
                    // 暖色
                    arr.push(Math.floor(Math.random() * 128 + 128));
                    // 亮色
                    arr.push(Math.floor(Math.random() * 128 + 128));
                }
                let [r, g, b] = arr;
                // rgb颜色
                // var color=`rgb(${r},${g},${b})`;
                // 16进制颜色
                var color = `#${r.toString(16).length > 1 ? r.toString(16) : '0' + r.toString(16)}${g.toString(16).length > 1 ? g.toString(16) : '0' + g.toString(16)}${b.toString(16).length > 1 ? b.toString(16) : '0' + b.toString(16)}`;
                return color;
            },
        }
        wordOption["list"] = res.data.data.map((item, index: number) => {
            return [item, 5]
        })
        new (wordcloud as any)(canvas.value, wordOption)
        showImage.value = false
        showLoading.value = false
    }).catch(err => {
        showImage.value = true
        showLoading.value = false
        useToast().error('请求超时')
    })
}

onMounted(() => {
    imageBox.value.onload = () => {
        if (window.location.hash == '#Acgvoc2vec')
            nextTick(() => {
                let hash = window.location.hash
                if (hash) {
                    let el = imageBox.value
                    console.log(el.cloneNode(true));
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' })
                    }
                }
            })
    }

})
</script>
<style lang="scss" scoped></style>