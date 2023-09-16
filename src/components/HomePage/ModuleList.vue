<template>
    <div class="rv s_ reveal-from-top">
        <div class="scontainero" style="">
            <img class="ue" :src="picture" alt="Clients 01" height="200px" width="200" />
            <h2 class="oe ok">{{ $t("model_list") }}</h2>
            <ul style="text-align:left">
                <li>
                    <p>
                        <a
                            href="#Acgvoc2vec">💡acgvoc2vec</a>:
                            <span v-html="$t('acgvoc2vec_intro')"></span>
                    </p>
                </li>
                <li>
                    <p><a href="#Dclip">💡dclip</a>:
                        <span v-html="$t('dclip_intro')"></span>
                    </p>
                </li>
                <li>
                    <p><a href="#Pix2Score">💡pix2score</a>:
                        <span v-html="$t('pix2score_intro')"></span>
                    </p>
                </li>
                <li>
                    <p><a href="#illust2Vec">💡illust2vec</a>:
                        <span v-html="$t('illust2vec_intro')"></span>
                    </p>
                </li>
                <li>
                    <p><a href="#CuganTf">💡cugan_tf</a>:
                        <span v-html="$t('cugan_tf_intro')"></span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import picture from '../../../public/static/picture/logo.png'
     
defineOptions({
    name: 'ModuleList',
})

</script>
<style lang="scss" scoped>
a[href*='#'] {
    text-decoration: none;
    font-weight: bold;
}
</style>