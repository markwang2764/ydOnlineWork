import PraiseButton from './index.es'
const f = new PraiseButton;
xtag.register('x-praise', {
  content: '<div id="thumb" class="hand">' +
    '<div class="arm"></div>' +
    '<div class="finger"></div>' +
    '<div class="finger"></div>' +
    '</div>' +
    '<span class="total">0</span>' +
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
      if(e.target.id == 'thumb'){
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
