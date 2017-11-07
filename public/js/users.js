function Model(data){
  var self = this;

  self.user;



};



function View(model){
  var self = this;

  self.elements = {
    left: $('.userBlock'),
    right: $('.right'),
    addBtn: $('.addBtn'),
    openGist: $('.openGist'),
    ocerviewContent: $('.ocerviewContent')
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
  self.edit = function (data) {
    var right = self.elements.right;
    right.html(data);
  };

  self.delete = function (id) {
    $('#' + id).slideUp();
    return;
  };

  self.add = function (data){
    var right = self.elements.right;
    right.html(data);
  };

  self.history = function (data) {
    var rightContent = self.elements.ocerviewContent;
    rightContent.html(data);
  };



};



function Controller(model, view){
  var self = this;
  var files;


  //===========================================
  //-----------------Events--------------------
  //===========================================
  $(document).delegate( ".userBtn", "click", open);

  $(document).delegate( ".addBtn", "click", add);
  $(document).delegate( ".saveUser", "click", save);
  $(document).delegate( ".cancelUser", "click", cancel);
  $(document).delegate( ".userDel", "click", del);

  $(document).delegate( ".gistEdit", "click", edit);
  $(document).delegate( ".editCancel", "click", editCancel);
  $(document).delegate( ".editSave", "click", update);

  $(document).delegate( ".gistPaymentsHistory", "click", info);
  $(document).delegate( ".historyBtn", "click", history);
  $(document).delegate( ".historyCancel", "click", historyCancel);

  $(document).delegate( ".gistPlace", "click", place);
  $(document).delegate( ".replace", "click", replace);

  $(document).delegate('input[type=file]', 'change', function(){
    files = this.files;
    console.log(this.files)

  });

  $(document).delegate( ".navBtn", "click", nav);


//===========================================
//---------------Functions-------------------
//===========================================
function init(){
  var id = $('.gistEdit').val();
  if (id) {
    $.ajax({
      url: '/users/user_' + id,
      method: 'GET',
      dataType: 'json'
    }).done(function (data){
      model.user = data;
      console.log(model.user);
    });
  }else{
    return;
  }

};
init();

function nav(){
  var a = $(this).attr('value');
  console.log('function');
  sessvars.house = null;
  sessvars.user = null;
  window.location.href = a
};
//------------------ADD----------------------
  function add() {
    $('.openGist').hide();
    $('.add').show();
  };

//---------------CANCEL-------------------
  function cancel() {
    $('.add').hide();
    $('.openGist').show();
  };

//-----------------OPEN------------------
  function open (){
    var id = $(this).attr('value');
    window.location.href = "/users" + id;
    return false;
  };

//---------------EDIT-------------------
  function edit() {
    $('.openGist').hide();
    $('.edit').show();
  };

//-------------EDIT-CANCEL-----------------
  function editCancel() {
    $('.edit').hide();
    $('.openGist').show();

  };

//---------------DELETE-------------------
  function del(){
    var id = $(this).attr('value');
    var right = view.elements.openGist;
    console.log('id og del--- ' + id)

    $.ajax({
      method: "POST",
      url: "/users/delete/user_" + id,
      statusCode: {
        200: function() {
          right.html("User is deleted").addClass('alert-success');
          view.delete(id);
        },
        403: function(jqXHR) {
          var error = JSON.parse(jqXHR.responseText);
          $('.error', form).html(error.message);
        }
      }
    });
  };

//---------------SAVE-------------------
  function save () {
    event.stopPropagation(); // Остановка происходящего
    event.preventDefault();  // Полная остановка происходящего
    var formEvent = $(this);
    // Создадим данные формы и добавим в них данные файлов из files
    var form = $('.add').serializeArray();

    var data = new FormData();

    for (var key in form){
      data.append(form[key].name, form[key].value)
    }


    console.log(form)
    console.log(data)
    if (files){
      $.each( files, function( key, value ){
        data.append( key, value );
      });
    }
    $.ajax({
        url: '/users/add',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Не обрабатываем файлы (Don't process the files)
        contentType: false, // Так jQuery скажет серверу что это строковой запрос
        statusCode: {
          200: function() {
            formEvent.html("User is saved").addClass('alert-success');
            window.location.href = "/users";
          },
          403: function(jqXHR) {
            var error = JSON.parse(jqXHR.responseText);
            $('.error', formEvent).html(error.message);
          }
        },
        error: function( jqXHR, textStatus, errorThrown ){
            console.log('ОШИБКИ AJAX запроса: ' + textStatus );
        }
    });
  };


//---------------UPDATE-------------------
  function update(){
    var formEvent = $(this);
    var id = $('.editSave').attr('value');

    event.stopPropagation(); // Остановка происходящего
    event.preventDefault();  // Полная остановка происходящего
    // Создадим данные формы и добавим в них данные файлов из files
    var form = $('.edit').serializeArray();

    var data = new FormData();
    for (var key in form){
      data.append(form[key].name, form[key].value)
    }

    console.log(form)
    console.log(data)

    $.each( files, function( key, value ){
        data.append( key, value );
    });
    console.log('DATA is - ', data)
    $.ajax({
        url: "/users/update" + id,
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Не обрабатываем файлы (Don't process the files)
        contentType: false, // Так jQuery скажет серверу что это строковой запрос
        statusCode: {
          200: function() {
            formEvent.html("House is saved").addClass('alert-success');
            window.location.href = "/users" + id;
          },
          403: function(jqXHR) {
            var error = JSON.parse(jqXHR.responseText);
            $('.error', formEvent).html(error.message);
          }
        },
        error: function( jqXHR, textStatus, errorThrown ){
               console.log('ОШИБКИ AJAX запроса: ' + textStatus );
        }
    });
    return false;
  };

//-----------------place-----------------
  function place(){

    var userID = $(this).val().toString();
    $.session.set('userID', userID);
    // sessvars.user = {
    //   userID: $(this).val()
    // }
    var user = $.session.get('userID')
    var house = {
      houseID: $.session.get('houseID'),
      room: $.session.get('room'),
      bed: $.session.get('bed'),
      price: $.session.get('price'),
    }
    console.log($.session.get('userID'));

    if (house.houseID && house.room && house.bed && house.price) {
      console.log('place');
      //place
      $.ajax({
        url: '/api/residence/place',
        method: 'POST',
        data: {
          userID: user,
          houseID: house.houseID,
          room: house.room,
          bed: house.bed,
          price: house.price
        },
        statusCode: {
          200: function() {
            console.log('ok' );
            $.session.remove('houseID');
            $.session.remove('userID');
            $.session.remove('room');
            $.session.remove('bed');
            $.session.remove('price');
            // sessvars.house = null;
            // sessvars.user = null;
            window.location.href = '/houses'+ house.houseID;
          },
          403: function(jqXHR) {
            var error = JSON.parse(jqXHR.responseText);
            $('.error', formEvent).html(error.message);
          }
        },
        error: function( jqXHR, textStatus, errorThrown ){
          console.log('ОШИБКИ AJAX запроса: ' + textStatus );
        }
      });
    } else {
      window.location.href = '/houses';
    }

    // var id = $(this).val()
    // console.log('place');
    // $.ajax({
    //   url: "/users/place/user_" + id,
    //   type: 'POST',
    //   statusCode: {
    //     200: function() {
    //       window.location.href = "/houses";
    //     },
    //     403: function(jqXHR) {
    //       var error = JSON.parse(jqXHR.responseText);
    //       $('.error', formEvent).html(error.message);
    //     }
    //   },
    //   error: function( jqXHR, textStatus, errorThrown ){
    //          console.log('ОШИБКИ AJAX запроса: ' + textStatus );
    //   }
    // })
  }

//---------------------replace---------------------------
  function replace(){
    var id = $(this).val()
    console.log('place');
    $.ajax({
      url: "/users/replace/user_" + id,
      type: 'POST',
      statusCode: {
        200: function() {
          window.location.href = "/users";
        },
        403: function(jqXHR) {
          var error = JSON.parse(jqXHR.responseText);
          $('.error', formEvent).html(error.message);
        }
      },
      error: function( jqXHR, textStatus, errorThrown ){
             console.log('ОШИБКИ AJAX запроса: ' + textStatus );
      }
    })
  }



  //
  // function edit () {
  //   var id = $(this).attr('value');
  //
  //   $.ajax({
  //     method: "POST",
  //     url: "/users/edit",
  //     data: {
  //       id: id
  //     },
  //   }).done(function (data){
  //     view.edit(data);
  //     view.addBtnHide();
  //     view.rightShow();
  //   });
  //   return false;
  // };






  function info() {
    var id = $(this).attr('value');
    window.location.href = "/payments" + id;
    return false;
  };

  function history() {
    $('.ocerviewContent').hide();
    $('.history').show();
  };

  function historyCancel() {
    $('.ocerviewContent').show();
    $('.history').hide();
  };



};



$(function(){
  var model = new Model();
  var view = new View(model);
  var controller = new Controller(model, view);
});
