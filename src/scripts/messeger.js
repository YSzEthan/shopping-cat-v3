

const commodity =() => {return{
  init(){
    this.$store.data.getApi()
    
  },

//data
  // catPrice(cat){return `$${cat.price}`},
  catImg(cat){return `<img src=images/${cat.picture} class="select-none" alt="" />`},
  test(cat){console.log(cat.id)},

//function
  addAdopt(cat){
    this.$store.data.setApi("add",cat)
  },
}}

const cartShop=()=>{return{

  totalPrice(cat){return `$${cat.num * cat.price}`},

  get total2Price(){
    const sum=[]
    let total = 0
    let show = 0
    if(this.$store.data.adopt.length != 0){total = this.$store.data.adopt.forEach(cat=>sum.push((cat.num * cat.price)*100))}else{total = 0}
    // show = sum.reduce((per,cur)=>per+cur)
    if(total != 0){show=`$${(sum.reduce((per,cur)=>per+cur))*0.01}`}else{show="$0"}
    return show
  },

  updataNum(cat){
    console.log(cat);
    
    this.$store.data.setApi("updata",cat);
  },

  rmAdopt(cat){
    this.$store.data.setApi("del",cat)
    // console.log("ok");
    },

  get rmAllAdopt(){
    this.$store.data.adopt.forEach(cat => this.$store.data.setApi(" ",cat)
      
    );
  }
}}

export {commodity,cartShop} ;