<template>
    <div class="rn">
        <HomeHeader />
        <illustration />
        <ModuleList />
        <section class="ig nx sillustration-section-o">
            <div class="tcontainern">
                <div class="features-split-inner rd sk" style="padding-top:0;">
                    <div class="na np">
                        <Acgvoc2vec id="Acgvoc2vec" />
                        <Dclip id="Dclip" />
                        <Pix2Score id="Pix2Score" />
                        <illust2Vec id="illust2Vec" />
                        <Deploy id="Deploy" />
                    </div>
                </div>
                <BeContinue />
                <Star />
                <Fotter />
            </div>
        </section>
        <div class="billustration-section-w"></div>
    </div>
</template>
<script lang="ts" setup>
import illustration from '../components/HomePage/illustration.vue'
import HomeHeader from '../components/HomePage/HomeHeader.vue'
import ModuleList from '../components/HomePage/ModuleList.vue'
import Acgvoc2vec from '../components/HomePage/Acgvoc2Vec.vue'
import Dclip from '../components/HomePage/Dclip.vue'
import Pix2Score from '../components/HomePage/Pix2Score.vue'
import illust2Vec from '../components/HomePage/illust2Vec.vue'
import BeContinue from '../components/HomePage/BeContinue.vue'
import Star from '../components/HomePage/Star.vue'
import Fotter from '../components/HomePage/Fotter.vue'
import Deploy from '../components/HomePage/Deploy.vue'

import init from "@/js/main.js";
import { onMounted } from 'vue';
onMounted(() => {
    init();
})
</script>
<style lang="scss" scoped></style>