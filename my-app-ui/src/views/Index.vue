<template>
    <div class="index">
        <el-carousel :interval="5000" height="5.333334rem">
            <el-carousel-item v-for="item in lunboImgArr" :key="item.id">
                <img class="lunbo-img" :src="item.image" alt="" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                lunboImgArr: []
            };
        },
        created() {
            this.getLunboImage();
        },
        mounted() {},
        methods: {
            getLunboImage() {
                let lunboUrl = "https://customer.yingwumeijia.com/v5/banner/getAll";
                this.$http.get(lunboUrl).then(res => {
                    if (res.data.succ) {
                        this.lunboImgArr = res.data.data;
                        console.log(this.lunboImgArr);
                    } else {
                        this.$notify.error({
                            title: "失败",
                            message: res.data.message
                        });
                    }
                });
            }
        }
    };
</script>

<style>
    .lunbo-img {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>