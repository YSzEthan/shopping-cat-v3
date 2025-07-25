import axios from 'axios'

const storedata = {
//data
  url:"http://localhost:3002/",
  cats: [],
  adopt:[],
  totalAmout:"",
  
  //function
  get countTotalAmount(){
    if(this.adopt.length != 0){
      this.totalAmout = ` 購物車 ${this.adopt.map(amount =>amount.num).reduce((pre,cur)=>pre+cur)}`
    }else{
      this.totalAmout =" 購物車"
    }
  },
  catPrice(cat){return `$${cat.price}`},

  async getApi(){
    const respcats = await axios.get(`${this.url}cats`)
    const respadopt = await axios.get(`${this.url}adopt`)
    
    this.cats = respcats.data
    this.adopt = respadopt.data
    this.countTotalAmount
    // console.log(`待收名單：${this.cats.length}`);
    // console.log(`收養數量：${this.adopt.length}`);
    // console.log(this.adopt);
  },
  
  async setApi(status,cat){
    
    const adoptId =this.adopt.findIndex(find => find.id == cat.id)
    const url=`${this.url}adopt/`;
    const adoptCat = this.adopt[adoptId]
    
    if(status == "add"){
      if(this.adopt.includes(adoptCat)){
        // console.log(url+`${adoptId+1}`);
        this.adopt[adoptId].num = this.adopt[adoptId].num + 1
        const resp = await axios.patch(url+cat.id,{num:this.adopt[adoptId].num});
        // console.log(resp);
      }else{
        const catData = {id:cat.id , num : 1 , name : cat.name , price:cat.price}
        // console.log(catData);
        // console.log(this.adopt);
        this.adopt.push(catData)
        // console.log(this.adopt);
        const resp = await axios.post(url,catData)
        // console.log(resp);
      }
    }else if(status=="del"){
      this.adopt.splice(adoptId,1)
      // console.log(this.adopt);
      const resp = await axios.delete(url+cat.id)
      // console.log(resp);
    }else if(status=="updata"){
      if (cat.num > 0){
        this.adopt[adoptId].num = cat.num;
        const resp = await axios.patch(url+cat.id,{num:cat.num})
        // console.log(resp);
      }else{
        this.adopt.splice(adoptId,1)
        const resp = await axios.delete(url+cat.id)
        // console.log(resp);
      }
    }else{
      
      const deletePromises =this.adopt.map(cat => axios.delete(url+cat.id))
      const resp = await Promise.all(deletePromises)
      // console.log(deletePromises);
      this.adopt=[]
    }
    this.countTotalAmount
    // console.log(this.totalAmout);
    
  },

}

export {storedata} 