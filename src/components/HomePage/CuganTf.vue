<template>
    <div class="nf reveal-from-top">
        <div class="nh az">
            <h3 class="oe ok">cugan_tf</h3>
            <p class="sz" v-html="$t('cugan_tf_detail')"></p>
            <div class="custom-file-input-wrapper" style=" margin-top: 50px">
                <input @change="changeFile" ref="fileInput" type="file" id="deploy-file-input" class="custom-file-input"
                    accept="image/*">
                <label for="deploy-file-input" class="custom-file-input-label">
                    <span ref="selectImage">{{ $t('image_select') }}</span>
                    <img ref="imageReShow" id="previewImage" class="custom-file-input-preview" alt="Preview"
                        style="display: none;">
                    <div id="placeholderIcon" class="custom-file-input-placeholder">
                        <i class="fas fa-image"></i>
                        <span></span>
                    </div>
                </label>
            </div>
            <div class="select-btn">
                <input id="radio1" type="radio" name="modles" v-model="modleIndex" class="button-modles" value="0" />
                <label for="radio1">{{ $t('conservative') }}</label>
                <input id="radio2" type="radio" name="modles" v-model="modleIndex" class="button-modles" value="1" />
                <label for="radio2">{{ $t('no-denoise') }}</label>
                <input id="radio3" type="radio" name="modles" v-model="modleIndex" class="button-modles" value="2" />
                <label for="radio3">{{ $t('denoise3x') }}</label>
            </div>
            <button @click="tryIt" class="tbuttonn fbuttonl">Try it !</button>
        </div>
        <div class="nl nc tillustration-element-n" style="overflow:hidden;" :style="{ borderRadius: flag ? '20px' : '0' }">
            <img ref="imageBox" v-show="flag" :src="picture" alt="Features split image 03" />
            <div class="box-image" v-show="!flag">
                <div class="image" ref='image' style="height: 50%;width: 100%;">
                    <canvas class="canvas" ref='canvas' style="width: 100%;"></canvas>
                    <div>
                        <button class="tbuttonn fbuttonl" @click="download">{{ $t('download') }}</button>
                    </div>
                </div>
            </div>
            <div class="loadingBox" v-show="showLoading">
                <Loading></Loading>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import Loading from '../Common/loading.vue'
import { useToast } from 'vue-toastification'
import picture from '../../../public/static/picture/5.jpeg'
import "@tensorflow/tfjs-backend-wasm"
import * as tf from '@tensorflow/tfjs';
import { useI18n } from 'vue-i18n';
const image = ref<HTMLDivElement | null>()
const imageBox = ref<HTMLDivElement | null>()
const selectImage = ref<HTMLSpanElement | null>()
const imageReShow = ref<HTMLImageElement | null>()
const canvas = ref<HTMLCanvasElement | null>()
const fileInput = ref<HTMLInputElement | null>()
const { t } = useI18n()
let showLoading = ref(false)
let flag = ref(true)
let modleIndex = ref(0)
let data: FormData = new FormData();
let sourceImage = new Image();
let imageName = "";
const changeFile = (e: any) => {
    data = new FormData();
    let file: File = e.target.files[0]
    let reader: FileReader = new FileReader()
    imageName = file.name.split('.')[0]
    reader.readAsDataURL(file)
    reader.onload = (e) => {
        if (!imageReShow.value || !selectImage.value) return
        imageReShow.value.src = e.target?.result as string
    }
    data.append('image', file)
}

const download = () => {
    if (!canvas.value) return
    let a = document.createElement("a")
    fetch(canvas.value.toDataURL("image/png"))
        .then(res => res.blob()).then(blob => {
            a.href = URL.createObjectURL(blob)
            a.download = `${imageName}_up2x_${['conservative', 'no-denoise', 'denoise3x'][modleIndex.value]}.png`;
            a.click()
        })


}


const tryIt = async () => {
    if (!imageReShow.value?.src) {
        useToast().warning(t('pick_pic_tip'))
        return
    }
    flag.value = true
    showLoading.value = true
    nextTick(() => {
        if (imageBox.value && image.value)
            image.value.style.height = imageBox.value.clientHeight + 'px'
    })
    if (isMobile()) {
        await tf.setBackend("wasm")
    }
    else {
        await tf.setBackend("webgl")
    }

    const render = (url: string) => {
        tf.loadGraphModel(url).then(async (model) => {

            if (!sourceImage) return
            let tfImage = tf.browser.fromPixels(sourceImage)
            let tfImage4d = tfImage.expandDims(0) as tf.Tensor4D;

            let predictions = await model.executeAsync(tfImage4d) as tf.Tensor;

            let squeeze = tf.squeeze(predictions) as tf.Tensor3D

            flag.value = false
            if (!canvas.value) return
            canvas.value.height = squeeze.shape[0] * window.devicePixelRatio
            canvas.value.width = squeeze.shape[1] * window.devicePixelRatio
            tf.browser.toPixels(squeeze, canvas.value);
            showLoading.value = false
        }).catch(() => {
            useToast().warning(t('error_tip'))
            showLoading.value = false
        });
    }
    const models = ['models/cugan_tfjs_conservative/model.json', 'models/cugan_tfjs_no-denoise/model.json', 'models/cugan_tfjs_denoise3x/model.json']
    render(process.env.BASE_URL + models[modleIndex.value])
}

function isMobile() {
    let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return flag;
}

if (!isMobile())
    window.onresize = (e) => {
        flag.value = true
    }

onMounted(() => {
    if (!imageBox.value) return
    imageBox.value.onload = () => {
        if (window.location.hash == '#CuganTf')
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

    if (!imageReShow.value) return
    imageReShow.value.onload = (e: Event) => {
        const el = e.target as HTMLImageElement
        if (!el || !selectImage.value || !fileInput.value) return
        if (el.naturalWidth * el.naturalHeight > 512 * 512) {
            fileInput.value.value = ''
            useToast().warning(t('image_size_tip'))
            el.style.display = 'none'
            selectImage.value.style.display = 'block'
        }
        else {
            el.style.display = 'block'
            selectImage.value.style.display = 'none'
            sourceImage = new Image()
            sourceImage.src = el.src
        }
    }
})

</script>
<style lang="scss" scoped>
.box-image {
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.image {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &>div {
        display: flex;
        justify-content: center;
    }
}

$glass: rgba(255, 255, 255, 0.2);
$glass-icon: rgba(255, 255, 255, 0.3);
$gradient: linear-gradient(35deg, red, purple);
$option: #320a28;

body {
    background: $gradient;
}

.select-btn {
    display: flex;
    margin-bottom: 10px;

    .button-modles {
        display: none;

        &+label {
            flex: 1;
            padding: 10px 15px;
            $radius: 5px;
            background-color: #fff;
            border: 1px solid #e5e5e5;
            display: inline-block;
            padding: 10px 10px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;

            &:active {
                background-color: #a3a3a3;
            }

            &:last-of-type {
                border-top-right-radius: $radius;
                border-bottom-right-radius: $radius;
            }

            &:first-of-type {
                border-top-left-radius: $radius;
                border-bottom-left-radius: $radius;
            }
        }

        &:checked+label {
            background-color: #e5e5e5;
        }
    }
}

select {
    /* Reset Select */
    appearance: none;
    outline: 0;
    border: 0;
    box-shadow: none;
    /* Personalize */
    flex: 1;
    padding: 0 1em;
    color: #fff;
    background-color: var(--darkgray);
    background-image: none;
    cursor: pointer;
}

/* Remove IE arrow */
select::-ms-expand {
    display: none;
}

/* Custom Select wrapper */
.tabs {
    --background-gradient: linear-gradient(30deg, #f39c12 30%, #f1c40f);
    --gray: #34495e;
    --darkgray: #8e79fc;
    position: relative;
    display: flex;
    width: 40%;
    height: 3em;
    border-radius: .25em;
    overflow: hidden;
    font-size: 12px;
}

/* Arrow */
.tabs::after {
    content: '\25BC';
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #34495e;
    transition: .25s all ease;
    pointer-events: none;
    width: 10%;
}

/* Transition */
.tabs:hover::after {
    color: #f39c12;
}

/* Other styles*/
body {
    color: #fff;
    background: var(--background-gradient);
}

h1 {
    margin: 0 0 0.25em;
}

a {
    font-weight: bold;
    color: var(--gray);
    text-decoration: none;
    padding: .25em;
    border-radius: .25em;
    background: white;
}
</style>