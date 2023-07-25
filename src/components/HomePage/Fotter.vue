<template>
    <footer class="rr az reveal-from-bottom" data-reveal-offset="0">
        <div class="tcontainern">
            <div class="ri">
                <div class="rs rh h">
                    <div class="nk">
                        <a href=""><img :src="picture" alt="Abstract" width="32" height="32" /></a>
                    </div>

                </div>
            </div>
            <div class="ro rh h rp">
                <nav class="rc">

                </nav>
                <div class="footer-copyright">
                    Copyright &copy; 2023.Cheerfun All rights reserved.
                    <a target="_blank" href="https://cheerfun.dev">Cheerfun</a>
                </div>
            </div>

        </div>
    </footer>
</template>

<script lang="ts" setup>
import picture from '../../../public/static/picture/logo.png'
defineOptions({
    name: 'Fotter',
})

</script>
<style lang="scss" scoped></style>