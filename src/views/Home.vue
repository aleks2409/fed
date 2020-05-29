<template>
  <div class="home">
    <div class="home-header">
        <v-select v-model="selected" label="24 Meseca" :options="presetDropdownItems" @input="filterStuff"></v-select>
    </div>
    <div class="home-wrapper">
      <div class="home-main-content">
        <div class="home-first-box box">
          <box :box="!!localPayload && localPayload.items[0]" :assets="localPayload.assets" :promotion="firstBoxPromo" :selected="selected"/>
        </div>
        <div class="home-second-box box">
          <box :box="!!localPayload && localPayload.items[1]" :assets="localPayload.assets" :promotion="secondBoxPromo" :selected="selected"/>
        </div>
        <div class="home-third-box box">
           <box :box="!!localPayload && localPayload.items[2]" :assets="localPayload.assets" :promotion="thirdBoxPromo" :selected="selected"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BoxComponent from '@/components/BoxComponent.vue';
import vSelect from 'vue-select';
import {mapActions,mapMutations,mapState} from 'vuex';
export default {
  name: 'Home',
  components:{
    vSelect,
    Box:BoxComponent,
  },
  beforeMount(){
    this.$store.dispatch('fetchData').then((res)=>{
      this.localPayload = res;
      this.filterStuff('Ugovor 24 meseca');
    });
  },
  mounted(){

  },
  data:()=>{
    return{
      localPayload:[],
      test:1,
      selected:null,
      firstBoxPromo:[],
      secondBoxPromo:[],
      thirdBoxPromo:[],
    }
  },
  computed:{
    ...mapState({
      payload : state => state.payload,
    }),
    presetDropdownItems(){
      return !!this.payload && this.payload.contract_length.contract_length_options || [];
    },
  },
  methods:{
    filterStuff(value){
      console.log('value: ',value);
      this.selected = value;
      this.firstBoxPromo = !!this.localPayload &&  this.localPayload.items[0].promotions.filter((item) => item.discount_variations.indexOf(this.selected) >= 0);
      this.secondBoxPromo = !!this.localPayload &&  this.localPayload.items[1].promotions.filter((item) => item.discount_variations.indexOf(this.selected) >= 0);
      this.thirdBoxPromo = !!this.localPayload &&  this.localPayload.items[2].promotions.filter((item) => item.discount_variations.indexOf(this.selected) >= 0);
      this.$forceUpdate();
    }
  }

}
</script>
<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
  @media only screen and (max-width: 768px) {
    .home > .home-wrapper > .home-main-content{
      margin-top:20px;
      grid-template-columns: 1fr !important;
    }
    .specificPrice{
      display:flex;
      justify-items: center;
      align-items: center;
    }
  }
  @media only screen and (max-width:320px) {
    .home > .home-wrapper > .home-main-content > .box {
        min-width: 280px;
        max-width: 280px;
    }
    .home{
      padding:10px !important;
    }
    .specificPrice{
      display:flex;
      justify-items: center;
      align-items: center;
      flex-direction: column-reverse;
    }
  }
  :root{
    --main-bg-color:#F8F4EC;
    --secondary-color : #742D6C;
  }
  .v-select{
    .vs__dropdown-toggle{
      background-color: var(--main-bg-color) !important;
      max-height:60px;
      border: 1px solid rgb(247, 244, 236);
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    width:190px;
    #vs1__listbox{
      background-color:var(--main-bg-color);
      li{
        text-align: center;
      }
      li:hover{
        background-color: var(--secondary-color);
      }
    }
  }
  .home{
    height:100%;
    display:flex;
    flex-direction: column;
    padding:50px;
    .home-header{
      align-self: flex-end;
    }
    .home-wrapper{
        display: flex;
        justify-content: center;
      .home-main-content{
        align-items:flex-end;
        display:grid;
        grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) );
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        width:100%;
        justify-items: center;
        .box{
          min-width:340px;
          max-width:340px;
        }
      }
    }
  }
</style>