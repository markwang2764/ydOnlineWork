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
    someMethod: function(){}
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
    focus: function(){}
  }
});
