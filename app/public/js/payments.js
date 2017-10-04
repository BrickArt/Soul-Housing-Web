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

  self.add = function (item, payment) {
    var user = item.payments;
    user.push(payment);
    return self.data;
  };



};



function View(model){
  var self = this;

  self.elements = {
    left: $('.payBlock'),
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
    self.elements.left.html(data);
    console.log('view');
  };

  self.initate = function (data) {
    self.elements.right.html(data);
    console.log('view');
  };


  self.open = function (data){
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
  $(document).delegate( ".gistPaymentsHistory", "click", add);
  $(document).delegate( ".addSave", "click", save);
  $(document).delegate( ".addCancel", "click", cancel);
  $(document).delegate( ".gistShelterHistory", "click", info);

  function open (){
    var id = $(this).attr('value');
    var i = model.find(model.data, id);
    var item = model.data[i];

    $.ajax({
      method: "POST",
      url: "/payments/open",
      data: item
    }).done(function(data){
      console.log('ok')
       view.open(data);
       view.addBtnShow();
       view.rightShow();
    });
    return false;
  };

  function add() {
    var id = $(this).attr('value');
    $.ajax({
      method: "POST",
      url: "/payments/add",
      data:{
        id: id
      }
    }).done(function (data){
      view.add(data);
      view.addBtnHide();
      view.rightShow();
      console.log('ok')
    });
    return false;
  };

  function save () {
    var user = $('.addSave').val();
    var payment = {
      date: $('.addDate > input').val(),
      sum: $('.addCash > input').val(),
      type: $('.addType').val(),
      id: Date.now(),
    };
    console.log(user);
    console.log(payment);
    var i = model.find(model.data, user);
    console.log(i);
    var item = model.data[i];

    model.add(item, payment);
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

  function info () {
    var id = $(this).attr('value');
    var i = model.find(model.data, id);
    var item = model.data[i];
    console.log(item)
    $.ajax({
      method: "POST",
      url: "/payments/info",
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
    var item = model.data[0];
    console.log('init');
    $.ajax({
      method: "POST",
      url: "/payments/init",
      data: {
        users: model.data,
      }
    }).done(function(data){
      view.init(data);

    });
    console.log(item)
    $.ajax({
      method: "PUT",
      url: "/payments/init",
      data: item,
    }).done(function(data){
      view.initate(data);

    });
    return;
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
