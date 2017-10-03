function Model(){
  var self = this;

  self.rooms = [];


  self.clean = function (){
    self.rooms = [];
  };

  self.roomAdd = function (item){
    if (item.length === 0){
      return;
    };
    if (self.rooms.length === 0){
      self.rooms.push(item);
      console.log('first room')
      return self.rooms;
    } else {
      console.log(item);
      self.rooms.forEach(function(room, i, rooms){
        if (room.id === null) {
          self.rooms[i] = item;
          console.log('last room')
          console.log(room)
          return
        };
      });
      console.log('eeee')
      self.rooms.push(item);
      return self.rooms;
    };



  };
  self.roomDel = function (id){
    console.log('del room')
    console.log(id)
    self.rooms.forEach(function(room, i, rooms){
      console.log(room.id)
      if (room.id == id){
        console.log('success')
        room.id = null;
        console.log(self.rooms)
      }
    });
    return;
  };

};



function View(model){
  var self = this;

  self.elements = {
    addBtn: $('.addBtn'),
    right: $('.right'),
    cancelBtn: $('.addCancel'),
    openBtn: $('.openBtn'),
    delBtn: $('.gistDel'),
    houseBlock: $('.houseBlock'),
    rooms: $('.rooms'),
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
  self.open = function (data){
    var right = self.elements.right;
    right.html(data);
  };

  self.delete = function (id){
    $('#' + id).slideUp();
  };

  self.add = function (data){
    var right = self.elements.right;
    right.html(data);
    console.log('Add window is opened!');
  };

  self.roomAdd = function (data){
    var rooms = $('.rooms');
    rooms.append(data);
  };

  self.roomDel = function (id){
    $('#room-' + id).slideUp();
  };

  self.save = function(data){
    var house = self.elements.houseBlock;
    house.append(data);
  };



};




function Controller(model, view){
  var self = this;

  $(document).delegate( ".houseBtn", "click", open);
  $(document).delegate( ".gistDel", "click", del);
  //edit
  $(document).delegate( ".addBtn", "click", add);
  $(document).delegate( ".roomAdd", "click", roomAdd);
  $(document).delegate( ".roomDel", "click", roomDel);

  $(document).delegate( ".addSave", "click", save);
  $(document).delegate( ".addCancel", "click", cancel);

  function open (){
    var id = $(this).attr('value');

    $.ajax({
      method: "POST",
      url: "/houses/open",
      data: {
        name: $('#houseName_' + id).html(),
        adress: $('#houseAdress_' + id).html(),
        id: id
      }
    }).done(function(data){
      view.open(data);
      view.addBtnShow();
      view.rightShow();
    });
    return false;
  };

  function del(){
    var id = $(this).attr('value');

    view.delete(id);
    view.rightHide();
    console.log(id + ' - house deleted!');
  };

  function add() {
    $.ajax({
      method: "POST",
      url: "/houses/add",
    }).done(function (data){
      view.add(data);
      view.addBtnHide();
      view.rightShow();
      model.clean();
    });
    return false;
  };

  function roomAdd (){
    var id = model.rooms.length;
    console.log(id);
    //var id = Date.now();
    $.ajax({
      method: "POST",
      url: "/houses/room",
      data: {
        id: id,
      },
    }).done(function (data){
      view.roomAdd(data);
      console.log('room is added');
      var item = {id};
      model.roomAdd(item);
    });
    return false;
  };

  function roomDel (){
    var id = $(this).attr('value')
    view.roomDel(id);
    model.roomDel(id);
    return false;
  };

  function save(){
    var title  = $('.addTitle > input').val();
    var adress = $('.addAddress > input').val();
    var id = Date.now();

    $.ajax({
      method: "POST",
      url: "/houses/save",
      data: {
        name: title,
        adress: adress,
        id: id,
      },
    }).done(function (data){
      view.save(data);
      view.addBtnShow();
      view.rightHide();

      console.log('House is saved!');
    });
    return false;
  };

  function cancel() {
    $.ajax({
      method: "POST",
      url: "/houses/cancel",
    }).done(function (){
      view.addBtnShow();
      view.rightHide();

      console.log('Cancel...');
    });
    return false;
  };


};

$(function(){
  var model = new Model();
  var view = new View(model);
  var controller = new Controller(model, view);
});
