<template>
    <header class="nb reveal-from-top">
        <div class="tcontainern">
            <div class="n_">
                <div class="nk">
                    <h1 class="sz"><a href=""><img :src="picture" alt="Abstract" width="32" height="32" /></a></h1>
                </div>
                <button id="tc" class="tc" aria-controls="primary-menu" aria-expanded="false"><span class="se">Menu</span>
                    <span class="th"><span class="tp"></span></span></button>
                <nav id="nj" class="nj">
                    <div class="nq">
                        <ul class="st h re">
                            <li><a href="https://cheerfun.dev" target="_blank">Cheerfun</a></li>
                            <li class="language_selector_pc">
                                <span class="language_label" style="color: #58678c;font-weight: 500;">Language:</span>
                                <select v-model="$i18n.locale">
                                    <option key="locale-zh" value="zh">中文</option>
                                    <option key="locale-en" value="en">English</option>
                                    <option key="locale-jp" value="jp">日本語</option>
                                </select>
                            </li>
                            <li class="language_selector_pe"><a @click="showDialog">Language</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
        <div v-show="flag" class="dialog" @click="flag = false">
            <ul>
                <li @click="() => $i18n.locale = 'zh'">中文</li>
                <li @click="() => $i18n.locale = 'en'">English</li>
                <li @click="() => $i18n.locale = 'jp'">日本語</li>
            </ul>
        </div>
    </header>
</template>
<script lang="ts" setup>
// import { getCurrentInstance } from 'vue';
import { ref } from 'vue';
import picture from '../../../public/static/picture/logo.png'
defineOptions({
    name: 'HomeHeader',
})

// let thisInstance = getCurrentInstance()
// console.log(thisInstance);
// let languages = thisInstance?.proxy?.$i18n.availableLocales.map(v => {
//     return {
//         key: `locale-${v}`,
//         value: v
//     }
// })
let flag = ref(false);
const showDialog = () => {
    flag.value = true
}
</script>
<style lang="scss" scoped>
.language_selector {
    @media (max-width: 640px) {
        &_pc {
            display: none;
        }

        &_pe {
            display: block;
        }
    }

    &_pe {
        display: none;

    }

    &_pc {
        .language_label {
            text-transform: uppercase;
            color: #58678c;
        }

        select {
            background-color: transparent;
            cursor: pointer;
            border: none;
            &:focus-visible {
                outline: none;
            }

            option {
                cursor: pointer;
            }
        }
    }
}


.dialog {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 101;
    background-color: rgba($color: #000000, $alpha: .5);

    >ul {
        background-color: #fff;
        width: 100%;
        text-align: center;
        padding: 0;
        box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 20%;

        >li {
            list-style: none;
            margin: 0;
            border-top: 1px solid #e5e5e5;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;

            &:first-child {
                border-top: none;
            }
        }
    }
}
</style>
