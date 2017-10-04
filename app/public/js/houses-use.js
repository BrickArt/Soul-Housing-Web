function Model(data){
  var self = this;
  self.data = data;
  self.rooms = [];

  self.roomDel = function(i){
    self.rooms[i] = null
  };

 self.roomAdd = function(item){
   self.rooms.splice(item, 1);
   return self.data;
 }

  self.find = function (array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == value) return i;
    }
    return -1;
  };

  self.del = function (item) {
    self.data.splice(item, 1);
    return self.data;
  }

  self.add = function (item) {
    self.data.push(item);
    return self.data;
  };

  self.editSave = function (i, item){
    self.data[i] = item;
    return self.data;
  };



};



function View(model){
  var self = this;

  self.elements = {
    addBtn: $('.addBtn'),
    left: $('.houseBlock'),
    right: $('.right'),
    cancelBtn: $('.addCancel'),
    openBtn: $('.openBtn'),
    delBtn: $('.gistDel'),
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
  self.init = function (data) {
    self.elements.left.html(data)
  };

  self.initate = function (data) {
    self.elements.right.html(data)
  };

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

  self.edit = function (data) {
    var right = self.elements.right;
    right.html(data);
  }



};




function Controller(model, view){
  var self = this;

  $(document).delegate( ".houseBtn", "click", open);
  $(document).delegate( ".gistDel", "click", del);
  $(document).delegate( ".gistEdit", "click", edit);
  $(document).delegate( ".addBtn", "click", add);
  $(document).delegate( ".roomAdd", "click", roomAdd);
  $(document).delegate( ".roomDel", "click", roomDel);

  $(document).delegate( ".addSave", "click", save);
  $(document).delegate( ".addCancel", "click", cancel);

  function open (){
    var id = $(this).attr('value');
    var i = model.find(model.data, id);
    var item = model.data[i];
    $.ajax({
      method: "POST",
      url: "/houses/open",
      data: item,
    }).done(function(data){
      view.open(data);
      view.addBtnShow();
      view.rightShow();
    });
    return false;
  };



  function del(){
    var id = $(this).attr('value');
    var i = model.find(model.data, id);

    model.del(i);

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
    var i = model.find(model.rooms, id);
    view.roomDel(id);
    model.roomDel(i);
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

  function edit () {
    var id = $(this).attr('value');
    var i = model.find(model.data, id);
    var item = model.data[i];
    $.ajax({
      method: "POST",
      url: "/houses/edit",
      data: item,
    }).done(function (data){
      view.edit(data);
      view.addBtnHide();
      view.rightShow();
      console.log('ok')
    });
    return false;
  };





  self.init = function () {
    $.ajax({
      method: "POST",
      url: "/houses/init",
      data: {
        houses: model.data,
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
      address: '9055-9057 Normandie Ave',
      id: 1,
      discription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      rooms: [],
    },
    {
      name: 'Soul 2',
      address: '9055 Normandie Ave',
      id: 2,
      discription: 'at.quis nostrud exercitation ullamco',
      rooms: [],
    },
    {
      name: 'Soul 3',
      address: '9055-9057 Normandie Str',
      id: 3,
      discription: 'xercitation ullamco laboris nisi ut aliquip ex ea ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      rooms: [],
    },
    {
      name: 'Soul 4',
      address: '9055-9057 Normandie Mordway Ave',
      id: 4,
      discription: 'rcitation ullamco laboris nisi ut aliquip ex eaullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex eaquis nostrud exercitation ullamco laboris nisi ut aliquip e llamco laboris nisi ut aliquip ex ea commodo consequat.aboris nisi ut aliquip ex eaquis nexercitation ullamco laboris nisi ut ali',
      rooms: [],
    },
    {
      name: 'Soul 5',
      address: '9057 Normandie',
      id: 5,
      discription: 's nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea .',
      rooms: [],
    },
    {
      name: 'Soul 6',
      address: '9055asd Normandie Ave',
      id: 6,
      discription: 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex eaullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex eaquis nostrud exercitation ullamco laboris nisi',
      rooms: [],
    },
  ];
  var model = new Model(data);
  var view = new View(model);
  var controller = new Controller(model, view);
});
