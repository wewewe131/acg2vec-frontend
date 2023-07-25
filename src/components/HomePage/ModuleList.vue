<template>
    <div class="rv s_ reveal-from-top">
        <div class="scontainero" style="">
            <img class="ue" :src="picture" alt="Clients 01" height="200px" width="200" />
            <h2 class="oe ok">模型列表</h2>
            <ul style="text-align:left">
                <li>
                    <p>
                        <a
                            href="#Acgvoc2vec">💡acgvoc2vec</a>：基于从维基百科动漫列表、萌娘百科、Bangumi、pixiv、AnimeList等来源获取清洗处理抽取的510w语句对微调的sentence-transformers模型，生成二次元相关文本的特征向量，用于各种下游任务（标签推荐，标签搜索，推荐系统等）可以使用<a
                            href='https://huggingface.co/OysterQAQ/ACGVoc2vec' target='_blank'
                            class='url'>Huggingface</a>在线体验
                    </p>
                </li>
                <li>
                    <p><a href="#Dclip">💡dclip</a>：使用danburoo2021数据集对clip（ViT-L/14）模型进行微调。可以使用<a
                            href='https://huggingface.co/OysterQAQ/DanbooruCLIP' target='_blank'
                            class='url'>Huggingface</a>在线体验</p>
                </li>
                <li>
                    <p><a href="#Pix2Score">💡pix2score</a>：基于resnet101的多任务模型，用于预测动漫插图的收藏数、浏览数与情色级别（训练中）</p>
                </li>
                <li>
                    <p><a href="#illust2Vec">💡illust2vec</a>：从<a href='https://github.com/KichangKim/DeepDanbooru'
                            target='_blank' class='url'>DeepDanbooru</a>模型去除预测头并对末尾层做均值池化的图片语义特征抽取模型</p>
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

a[href*='#']{
    text-decoration: none;
    font-weight: bold;
}

</style>