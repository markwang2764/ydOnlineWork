import rp from 'request-promise'
class indexModel {
  constructor(ctx) {
    this.ctx = ctx;
  }
  updateNum() {
    const options = {
      uri: 'http://localhost:8888/homework/praise.php',
      method: 'GET'
    }
    return new Promise((resolve,reject) => {
      rp(options).then(function(res){
        console.log('res:'+res);
        const info = JSON.parse(res);
        if(info){
          resolve({data: info.result})
        }else{
          reject({})
        }
      })
    })
  }
}
export default indexModel
