<template>
    <div class="nf reveal-from-top">
        <div class="nh az">
            <h3 class="oe ok">pix2score</h3>
            <p class="sz" v-html="$t('pix2score_detail')"></p>
            <div class="custom-file-input-wrapper" style=" margin-top: 50px">
                <input @change="changeFile" ref="fileInput" type="file" id="fileInput" class="custom-file-input"
                    accept="image/*">
                <label for="fileInput" class="custom-file-input-label">
                    <span ref="selectImage">{{ $t('image_select') }}</span>
                    <img ref="imageReShow" id="previewImage" class="custom-file-input-preview" alt="Preview"
                        style="display: none;">
                    <div id="placeholderIcon" class="custom-file-input-placeholder">
                        <i class="fas fa-image"></i>
                        <span></span>
                    </div>
                </label>
            </div>
            <button @click="tryIt" class="tbuttonn fbuttonl">Try it !</button>
        </div>
        <div class="nl nc tillustration-element-n" style="overflow:hidden;" :style="{ borderRadius: flag ? '20px' : '0' }">
            <img ref="imageBox" v-show="flag" :src="picture" alt="Features split image 03" />
            <div class="canvasBox" v-show="!flag" ref="canvasBox">
                <div class="canvas" ref='canvas' style="height: 50%;width: 100%;"></div>
                <div v-show="!flag" class="tabs">
                    <select ref="selectOption" @change="changeEchartOption">
                        <option value="0">雷达图</option>
                        <option value="1">Bookmark Predict详情</option>
                        <option value="2">View Predict详情</option>
                        <option value="3">Sanity Predict详情</option>
                    </select>
                </div>
            </div>
            <div class="loadingBox" v-show="showLoading">
                <Loading></Loading>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getPix2ScoreDate } from '../../api/api';
import { ref, onMounted, nextTick, computed } from 'vue';
import Loading from '../Common/loading.vue'
import radargrade from '@/common/radar-grade'
import { useToast } from 'vue-toastification'
import * as echart from 'echarts'
import picture from '../../../public/static/picture/3.jpeg'

let imageBox = ref(null as unknown as HTMLDivElement)
let selectImage = ref(null as unknown as HTMLSpanElement)
let flag = ref(true)
let showLoading = ref(false)
let data: FormData = new FormData();
let imageReShow = ref(null as unknown as HTMLImageElement)
let selectOption = ref(null as unknown as HTMLSelectElement)
let canvas = ref(null as unknown as HTMLDivElement)

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

let canvasBox = ref(null as unknown as HTMLDivElement)
let myChart = null as unknown as echart.ECharts

let options = [] as echart.EChartsOption[]

let tryIt = () => {
    canvasBox.value.style.height = imageBox.value.clientHeight + 'px'
    showLoading.value = true
    flag.value = true
    getPix2ScoreDate(data).then(res => {
        let { bookmarkPredict, viewPredict, sanityPredict } = res.data.data
        let { bookmark_predict, view_predict, sanity_predict } = radargrade
        let bookmarkPredictIndex = bookmarkPredict.findIndex(val => val == Math.max(...bookmarkPredict))
        let bookmarkPredictStr = bookmark_predict[bookmarkPredictIndex]
        let bookmarkPredictlevel = bookmarkPredictIndex + 1

        let viewPredictIndex = viewPredict.findIndex(val => val == Math.max(...viewPredict))
        let viewPredictStr = view_predict[viewPredictIndex]
        let viewPredictlevel = viewPredictIndex + 1

        let sanityPredictIndex = sanityPredict.findIndex(val => val == Math.max(...sanityPredict))
        let sanityPredictStr = sanity_predict[sanityPredictIndex]
        let sanityPredictlevel = sanityPredictIndex + 1

        let radar_data = [bookmarkPredictlevel, viewPredictlevel, sanityPredictlevel]
        if (myChart)
            myChart.clear()
        myChart = echart.init(canvas.value, null, {
            renderer: 'svg'
        })

        options[0] = {
            title: {
                text: 'Pix2Score',
                top: '15%'
            },
            radar: {
                indicator: [
                    { name: 'bookmarkPredict', max: 15 },
                    { name: 'viewPredict', max: 15 },
                    { name: 'sanityPredict', max: 5 },
                ],
                center: ['50%', '65%'],
                radius: '60%',
                splitNumber: 5,
            },
            series: [{
                type: 'radar',
                data: [
                    {
                        name: ' ',
                        value: [radar_data[0], radar_data[1], radar_data[2]],
                        areaStyle: {
                            opacity: 0
                        },
                        label: {
                            show: true,
                            formatter: (param: any) => {
                                return [bookmarkPredictStr, viewPredictStr, sanityPredictStr][param.dimensionIndex]
                            },
                            offset: [0, 12]
                        }
                    }
                ]
            }]
        } as echart.EChartsOption;

        options[1] = {
            title: {
                text: 'Bookmark Predict',
                top: '15%'
            },
            xAxis: {
                type: 'value',
            },
            grid: {
                height: '60%',
                left: '83',
                right: '20',
                top: '25%'
            },
            yAxis: {
                type: 'category',
                data: radargrade.bookmark_predict,
                axisLabel: {
                    interval: 0,

                }
            },
            series: [
                {
                    name: 'bookmarkPredict',
                    type: 'bar',
                    data: bookmarkPredict,
                    label: {
                        show: true,
                        position: 'end',
                        offset: [15, 0]
                    },
                }
            ]
        };

        options[2] = {
            title: {
                text: 'View Predict',
                top: '15%'
            },
            xAxis: {
                type: 'value',
            },
            grid: {
                height: '60%',
                left: '83',
                right: '20',
                top: '25%'
            },
            yAxis: {
                type: 'category',
                data: radargrade.view_predict,
                axisLabel: {
                    interval: 0,
                }
            },
            series: [
                {
                    name: 'viewPredict',
                    type: 'bar',
                    data: viewPredict,
                    label: {
                        show: true,
                        position: 'end',
                        offset: [15, 0]
                    },
                }
            ]
        };

        options[3] = {
            title: {
                text: 'Sanity Predict',
                top: '15%'
            },
            xAxis: {
                type: 'value',
            },
            grid: {
                height: '60%',
                left: '83',
                right: '20',
                top: '25%'
            },
            yAxis: {
                type: 'category',
                data: radargrade.sanity_predict,
                axisLabel: {
                    interval: 0,
                }
            },
            series: [
                {
                    name: 'sanityPredict',
                    type: 'bar',
                    data: sanityPredict,
                    label: {
                        show: true,
                        position: 'end',
                        offset: [15, 0]
                    },
                }
            ]
        };

        myChart.setOption(options[0])

        setTimeout(() => {
            myChart.resize()
            selectOption.value.selectedIndex = 0
        })
        flag.value = false
        showLoading.value = false
    }).catch(err => {
        useToast().error('请求超时')
        flag.value = true
        showLoading.value = false
    })

}



let changeEchartOption = (e: Event) => {
    let targe = e.target as HTMLSelectElement
    let index = targe.selectedIndex
    myChart.clear()
    myChart.setOption(options[index])
    setTimeout(() => {
        myChart.resize()
        // if (index != 0)
        //     setNum2End()
    })
    let option = myChart.getOption() as any
    console.log(option)
}
function isMobile() {
    let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return flag;
}
if(!isMobile())
window.onresize = (e) => {
    flag.value = true
    if (myChart) {
        setNum2End()
    }
}

onMounted(() => {
    imageBox.value.onload = () => {
        canvasBox.value.style.height = imageBox.value.clientHeight + 'px'
        if (window.location.hash == '#Pix2Score')
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

let setNum2End = () => {
    // setTimeout(function () {
    //     var width = myChart.getWidth();
    //     let option = myChart.getOption() as any;
    //     let grid = option.grid[0];
    //     let gLeft = grid.left;
    //     let gRight = grid.right;
    //     gLeft = (width * parseFloat(gLeft)) / 100;
    //     gRight = (width * parseFloat(gRight)) / 100;
    //     let x = width - gLeft - gRight;

    //     myChart.setOption({
    //         series: [{
    //             label: {
    //                 show: true,
    //                 offset: [x - 37, 0]
    //             }
    //         }]
    //     })
    // })
}
</script>
<style lang="scss" scoped>

.canvasBox {
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.canvas {
    width: 100%;
    height: 60%;
}

$glass: rgba(255, 255, 255, 0.2);
$glass-icon: rgba(255, 255, 255, 0.3);
$gradient: linear-gradient(35deg, red, purple);
$option: #320a28;

body {
    background: $gradient;
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