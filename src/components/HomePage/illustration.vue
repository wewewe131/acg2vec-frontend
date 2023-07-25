<template>
    <section class="rb nx tillustration-section-n">
        <div class="tcontainern">
            <div class="rm rd" style="padding-bottom:10px">
                <div class="na np">
                    <div class="nf">
                        <div class="rg nh az">
                            <h1 class="oe ok reveal-from-top" data-reveal-delay="150">ACG2Vec</h1>
                            <p class="oe us reveal-from-top" data-reveal-delay="300">ACG2vec全称为Anime Comics Games to
                                vector。将持续维护一些基于二次元相关的深度学习领域实践与探索。</p>
                            <div class="reveal-from-top" data-reveal-delay="450">
                                <a class="tbuttonn fbuttonl gbuttony" href="https://github.com/OysterQAQ/ACG2vec"
                                    target="_blank">
                                    <img :src="picture" alt="Abstract" width="32" height="32"
                                        style="margin: 0;" />Github</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import picture from '../../../public/static/picture/github.svg'

defineOptions({
    name: 'illustration',
})

</script>
<style lang="scss" scoped>
@media (min-width:641px) {
    .rb .na .nf {
        align-items: flex-start;
        min-height: 492px
    }
}

.tcontainern {
    padding-top: 80px;
}
</style>