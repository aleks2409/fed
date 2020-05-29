<template>
    <div class="box-wrapper">
        <span v-show="box.name=='Box dupli'" style="color:#742d6c">Preporučujemo</span>
        <div class="line-breaker" v-show="box.name=='Box dupli'"></div>
        <div class="box-header">
            <p>{{box.name}}</p>
        </div>
        <div class="line-breaker"></div>
        <div class="box-main">
            <div class="box-tv-category">
                <div class="box-left">
                    <img :src="assets.tv_category" alt="">
                </div>
                <div class="box-right">
                    <ul>
                        <li v-for="(item,$index) in tvPerks" :key="$index">{{item.long_name}}</li>
                    </ul>
                </div>
            </div>
            <div class="line-breaker"></div>
            <div class="box-net-category">
                <div class="box-left">
                    <img :src="assets.net_category" alt="">
                </div>
                <div class="box-right">
                    <ul>
                        <li v-for="(item,$index) in netPerks" :key="$index">{{item.long_name}}</li>
                    </ul>
                </div>
            </div>
            <div class="box-promotion" v-for="(promotion,$index) in promotion" :key="$index">
                <div class="box-promotion-wrapper">
                    <img style="height:95px;" :src="promotion.promotion_image" alt="">
                    <div v-html="!!promotion && promotion.promo_text || ''"></div>

                </div>
            </div>
            <div class="line-breaker"></div>
            <div class="box-pricing">
                <div class="box-pricing-top">
                    <div class="specificPrice">
                        <span class="strike">
                        {{promotion.length > 0 ? Math.round(box.prices.old_price_recurring["Ugovor 24 meseca"]) + ' rsd/mes.' : ''}}
                    </span>
                    <span class="new-price">
                        {{promotion.length > 0 ? Math.round(box.prices.price_recurring["Ugovor 24 meseca"]) + ' rsd/mes.' : ''}}
                    </span>
                    </div>
                    <div v-show="promotion.length > 0" v-html="box.prices.old_price_promo_text"></div>
                    <div v-show="selected == 'Ugovor 12 meseci'">
                        <span class="new-price">
                        {{Math.round(box.prices.price_recurring["Ugovor 12 meseci"]) + ' rsd/mes.'}}
                        </span>
                    </div>
                    <div v-show="selected == 'Bez ugovorne obaveze'">
                        <span class="new-price">
                        {{Math.round(box.prices.price_recurring["Bez ugovorne obaveze"]) + ' rsd/mes.'}}
                        </span>
                    </div>
                </div>
                <div class="box-pricing-bottom">

                </div>
            </div>
        </div>
        <div class="box-footer">
            <button class="span">Naručite</button>
        </div>
    </div>
</template>
<script>
export default {
    props:['box','assets','promotion','selected'],
    data:()=>{
        return{
            tvPerks: [],
            netPerks:[],
            promotions:[],
            price:null,
        }
    },
    mounted(){
        this.tvPerks = this.box.included.filter(item => item.product_category == 'tv');
        this.netPerks =  this.box.included.filter(item => item.product_category == 'net');
    },
}
</script>
<style lang="scss">
    .specificPrice{
      display:flex;
      justify-items: center;
      align-items: center;
    }
.box-wrapper{
    background-color: var(--main-bg-color);
    border-radius:10px;
    padding:20px;
    .line-breaker{
        border: 1px solid #D3D3D3;
        margin:20px 0px;
    }
    .box-header{
        padding:0px 40px;
        p{
            font-size: 48px;
            color:var(--secondary-color);
            padding:0;
            margin:0;
            word-break: break-word;
        }
    }
    .box-tv-category,.box-net-category{
        display: flex;
        justify-content: center;
        align-items: center;
        .box-right{
            li{
                text-align: left;
            }
            align-self: flex-start;
            flex:1;
        }
    }
    .box-promotion{
        .box-promotion-wrapper{
            background-color: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
            max-height:80px;
            img{
                height: 95px !important;
                max-height: unset;
                max-width: unset !important;
                width: 85px;
            }
            font-size: 14px;
            color:var(--secondary-color);
        }
    }
    .box-pricing{
        .box-pricing-top{
            .strike{
                text-decoration:line-through;
                font-size: 22px;
                color:var(--secondary-color);
            }
            .new-price{
                font-size: 33px;
                color:var(--secondary-color);
            }
        }
    }
    .box-footer{
        display:flex;
        justify-content: center;
        align-items:center;
        button{
            padding:12px 0px;
            background-color: var(--secondary-color);
            border:1px solid var(--secondary-color);
            border-radius:10px;
            color:white;
            width:100%;
            margin-top:24px;
        }
    }
}
img{
    max-height:45px;
    height:45px;
    max-width:45px;
    width:45px;
}
</style>