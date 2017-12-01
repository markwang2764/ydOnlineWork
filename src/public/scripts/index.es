
class PraiseButton {
    constructor(num, element) {
        this.num = num;
        this.element = element;
    }
    // 下面这个方法应该封装到外面 import进来
    throttle(method,context){
        clearTimeout(method.tId);
        method.tId = setTimeout(function(){
            method.call(context);
        },200);
    }

    clickAction() {
        this.element.click(() => {
          this.throttle(this.praiseLogic,this)
        })
    }
    praiseLogic() {
      if (this.num < 10) {
          this.num ++
            this.element.css('-webkit-filter', 'grayscale(0)');
            $('.hide').addClass('num');
          setTimeout(function() {
                    $('.hide').removeClass('num');
                }, 1000);
              console.log(this.num);
              axios.get('/index/update')
              .then(function (response) {
                let num = response.data.data
                $('.total').text(num)
              })
              .catch(function (error) {
                console.log(error);
              });
      }else{
        	this.element.css('-webkit-filter', 'grayscale(1)');
        this.num=0;
      }
    }
}
class Thumb extends PraiseButton{
	constructor(num,element){
		super(num,element);
	}
}


 export
 default{
 	Thumb
 }
