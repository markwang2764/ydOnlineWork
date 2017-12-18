import {Star} from './index.es'
const f = new Star();
xtag.register('x-star', {
  content: '<div id="star" class="star">' +
    '<div class="star1"></div>' +
    '</div>' +
    '<span id="animation" class="hide">+1</span>',
  lifecycle:{
    created: function(){},
    inserted: function(){},
    removed: function(){},
    attributeChanged: function(){}
  },
  methods: {
    praise: function(){
      let _this = this;
      f.clickAction();
      let animation = _this.querySelector('#animation')
      animation.className = 'hide num';
      setTimeout(function() {
        animation.className = 'hide';
      }, 800)
    }
  },
  accessors: {
    someAccessor: {
      // links to the 'some-accessor' attribute
      attribute: {},
      set: function(){},
      get: function(){}
    }
  },
  events: {
    tap: function(){},
    focus: function(){},
    click: function(e){
      let _this = this;
      if(e.target.id == 'star'){
        let t= "";
        if(t){
          clearTimeout(t);
        }
        t=setTimeout(()=> {
          _this.praise();
        },500)
      }
    }
  }
});
