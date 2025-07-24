import axios from 'axios'


const storedata = {
//data
  url:"http://localhost:3002/",
  cats: [],
  adopt:[],
  
  //function
  catPrice(cat){return `$${cat.price}`},
  async getApi(){
    const respcats = await axios.get(`${this.url}cats`)
    const respadopt = await axios.get(`${this.url}adopt`)
    
    this.cats = respcats.data
    this.adopt = respadopt.data
    // console.log(`待收名單：${this.cats.length}`);
    // console.log(`收養數量：${this.adopt.length}`);
    // console.log(this.adopt);
  },
  
  async setApi(status,cat){
    
    const adoptId =await this.adopt.findIndex(find=>find.id==cat.id)
    const url=`${this.url}adopt/`;
    const adoptCat = this.adopt[adoptId]
    
    if(status == "add"){
      if(this.adopt.includes(adoptCat)){
        // console.log(url+`${adoptId+1}`);
        this.adopt[adoptId].num = this.adopt[adoptId].num + 1
        const resp = await axios.patch(url+cat.id,{num:this.adopt[adoptId].num});
        // console.log(resp);
        this.getApi()
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
    }else{
      this.adopt=[]
      const resp = await axios.delete(url+cat.id) 
    }
  },

}

export {storedata} 