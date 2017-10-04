function Model(data){
  var self = this;

  self.data = data;

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
    left: $('.userBlock'),
    right: $('.right'),
    addBtn: $('.addBtn'),

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

  self.edit = function (data) {
    var right = self.elements.right;
    right.html(data);
  };

  self.del = function (id) {
    $('#' + id).slideUp();
    return self.data;
  };

  self.add = function (data){
    var right = self.elements.right;
    right.html(data);
  };



};



function Controller(model, view){
  var self = this;

  $(document).delegate( ".userBtn", "click", open);
  $(document).delegate( ".userDel", "click", del);
  $(document).delegate( ".gistEdit", "click", edit);
  $(document).delegate( ".addBtn", "click", add);
  $(document).delegate( ".saveUser", "click", save);
  $(document).delegate( ".cancelUser", "click", cancel);

  $(document).delegate( ".editSaveUser", "click", editSave);
  $(document).delegate( ".pay", "click", pay);
  $(document).delegate( ".back", "click", open);
  $(document).delegate( ".history", "click", history);
  $(document).delegate( ".place", "click", place);


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

  function pay (){
    var id = $(this).attr('value');
    var i = model.find(model.data, id);
    var item = model.data[i];

    $.ajax({
      method: "POST",
      url: "/users/info",
      data: item
    }).done(function(data){
      console.log('ok')
       view.open(data);
       view.addBtnShow();
       view.rightShow();
    });
    return false;
  };

  function history (){
    var id = $(this).attr('value');
    var i = model.find(model.data, id);
    var item = model.data[i];

    $.ajax({
      method: "POST",
      url: "/users/history",
      data: item
    }).done(function(data){
      console.log('ok')
       view.open(data);
       view.addBtnShow();
       view.rightShow();
    });
    return false;
  };

  function place (){
    var id = $(this).attr('value');
    var i = model.find(model.data, id);
    var item = model.data[i];

    $.ajax({
      method: "POST",
      url: "/users/edit",
      data: item
    }).done(function(data){
      console.log('ok')
       view.open(data);
       view.addBtnShow();
       view.rightShow();
    });
    return false;
  };



  function del () {
    var id = $(this).attr('value');
    var i = model.find(model.data, id);

    model.del(i);
    view.del(id);
    view.addBtnShow();
    view.rightHide();
  }

  function add() {
    $.ajax({
      method: "POST",
      url: "/users/add",
    }).done(function (data){
      view.add(data);
      view.addBtnHide();
      view.rightShow();
      console.log('ok')
    });
    return false;
  };

  function edit () {
    var id = $(this).attr('value');
    var i = model.find(model.data, id);
    var item = model.data[i];
    $.ajax({
      method: "POST",
      url: "/users/edit",
      data: item,
    }).done(function (data){
      view.edit(data);
      view.addBtnHide();
      view.rightShow();
      console.log('ok')
    });
    return false;
  };

  function editSave () {
    var user = {
      name: $('.name').val(),
      lastName: $('.lastname').val(),
      date: $('.addDate > input').val(),
      sex: $('.addSex > select').val(),
      address: $('.addAddress > input').val(),
      phone: $('.addPhone > input').val(),
      program: $('.addProgram > select').val(),
      shelter: $('.addShelter > select').val(),
      discription: $('.addDiscription > textarea').val(),
    };
    console.log(user);
    var id = $(this).attr('value');
    var i = model.find(model.data, id);

    model.editSave(i, user);
    self.init();
    view.addBtnShow();

    return false;
  };

  function save () {
    var user = {
      name: $('.name').val(),
      lastName: $('.lastname').val(),
      // status: ,
      date: $('.addDate > input').val(),
      sex: $('.addSex > select').val(),
      address: $('.addAddress > input').val(),
      phone: $('.addPhone > input').val(),
      program: $('.addProgram > select').val(),
      shelter: $('.addShelter > select').val(),
      discription: $('.addDiscription > textarea').val(),
      id: Date.now(),
    };
    console.log(user);

    model.add(user);
    self.init();
    view.addBtnShow();
    view.rightHide();

    return false;
  };

  function cancel() {
    view.addBtnShow();
    view.rightHide();
    console.log('Cancel...');
    return false;
  };






  self.init = function () {
    var item = model.data[0];
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
    $.ajax({
      method: "PUT",
      url: "/users/init",
      data: item,
    }).done(function(data){
      view.initate(data);

    });
  };

  self.init();



};



$(function(){
  var data = [
    {
      name: 'Sarah',
      lastName: 'Conor',
      address: '9055-9057 Normandie Ave',
      status: 'Active',
      phone: '+380631553729',
      program: 'USSDA',
      sex: 'Famale',
      shelter: 'Soul 1',
      shelterHistory: [],
      discription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

      id: 1,
      date: '2017-10-06',
      payments:[
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
      ],
    },
    {
      name: 'John',
      lastName: 'Dou',
      address: '9055 Normandie Ave',
      status: 'Active',
      phone: '+123456789987',
      program: 'USSDA',
      sex: 'Male',
      shelter: 'Soul 1',
      shelterHistory: [],
      discription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

      id: 2,
      date: '1996-12-09',
      payments:[
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
      ],
    },
    {
      name: 'Lary',
      lastName: 'Zibherman',
      address: '9055-9057 Normandie Str',
      status: 'Active',
      phone: '+08004566541',
      program: 'USSDA',
      sex: 'Male',
      shelter: 'Soul 1',
      shelterHistory: [],
      discription: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

      id: 3,
      date: '2020-08-14',
      payments:[
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
        {date: '01.02.2013', sum: '1234', type: 'CASH'},
      ],
    },
  ];
  var model = new Model(data);
  var view = new View(model);
  var controller = new Controller(model, view);
});
