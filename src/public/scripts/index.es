import css from '../css/index.css'
class PraiseButton {
    constructor() {
    }
    clickAction() {
      console.log(22);
      axios.get('/index/update')
      .then(function (response) {
        let num = response.data.data
        $('.total').text(num)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}

 export default PraiseButton
