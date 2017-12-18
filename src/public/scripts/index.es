import css from '../css/index.css'
class PraiseButton {
    constructor() {
    }
    clickAction() {
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
class Thumb extends PraiseButton {
  constructor() {
    super();
  }
}
class Star extends PraiseButton {
  constructor() {
    super();
  }
}
 export {Thumb, Star}
