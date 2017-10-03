function Model(data){
  var self = this;

  self.data = data;

  self.addItem = function (item) {
    if (item.title.legth === 0){
      return;
    };
    self.data.push(item);
    return self.data;
  };

  self.removeItem = function (item) {
    var index = self.data.indexOf(item);

    self.data.splice(index, 1);
    return self.data;
  };

  self.find = function (array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == value) return i;
    }
    return -1;
  };



};



function View(model){
  var self = this;

  self.elements = {
    left: $('.userBlock'),
    right: $('.right'),
  };


//==========Show-Hide==========

//----------Plus button----------
    self.addBtnShow = function (){
      var button = self.elements.addBtn;
      button.show();
    };

    self.addBtnHide = function (){
      var button = self.elements.addBtn;
      button.hide();
    };

//----------Right----------
    self.rightShow = function (){
      var right = self.elements.right;
      right.show();
    };

    self.rightHide = function (){
      var right = self.elements.right;
      right.hide();
    };


//==========Functions==========

  self.init = function (data) {
    self.elements.left.html(data)
  };

  self.open = function (data){
    var right = self.elements.right;
    right.html(data);
  };



};



function Controller(model, view){
  var self = this;

  $(document).delegate( ".userBtn", "click", open);

  function open (){
    var id = $(this).attr('value');
    var i = model.find(model.data, id);
    var item = model.data[i];

    $.ajax({
      method: "POST",
      url: "/users/open",
      data: item
    }).done(function(data){
      console.log('ok')
       view.open(data);
       view.addBtnShow();
       view.rightShow();
    });
    return false;
  };



  self.init = function () {
    $.ajax({
      method: "POST",
      url: "/users/init",
      data: {
        users: model.data,
      }
    }).done(function(data){
      view.init(data);
      return;
    });
  };

  self.init();



};




$(function(){
  var data = [
    {
      name: 'Soul 1',
      adress: '9055-9057 Normandie Ave',
      id: 1
    },
    {
      name: 'Soul 2',
      adress: '9055 Normandie Ave',
      id: 2
    },
    {
      name: 'Soul 3',
      adress: '9055-9057 Normandie Str',
      id: 3
    },
  ];
  var model = new Model(data);
  var view = new View(model);
  var controller = new Controller(model, view);
});
