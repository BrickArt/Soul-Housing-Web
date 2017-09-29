function Model(data){
  var self = this;



};

function View(model){
  var self = this;

  self.elements = {
    username: $('.username > input'),
    password: $('.password > input'),
    addBtn: $('.addBtn'),
    block: $('.right'),
    cancelBtn: $('.cancelUser'),
    openBtn: $('.openBtn'),
    delBtn: $('.gistDel'),
    userBlock: $('.userBlock'),
    add: $('.add')

  };

  self.addScreen = function (block, addBtn){
    $.ajax({
      method: "POST",
      url: "/users/add"
    }).done(function (data){
      block.html(data);
      addBtn.hide();
      console.log('ok')
    });
  };
  self.cancelAddUser = function (block, addBtn){
    $.ajax({
      method: "POST",
      url: "/users/add/cancel",
    }).done(function (data){
      $('.add').slideUp();
      addBtn.show();
    });
  };

  self.userSave = function (title, status, id, userBlock, add, block){
    $.ajax({
      method: "POST",
      url: "/users/add/add",
      data: {
        name: title,
        status: status,
        id: id,
      },
    }).done(function (data){
      userBlock.append(data);
      $('.tatata').slideUp();
      console.log('done');
    });
  };
  self.delete = function ( id){
    $('#' + id).slideUp();
    console.log('id is --- ' + id);
    $('.tatata').hide();
  };
};

function Controller(model, view){
  var self = this;

  $(document).delegate(".addBtn", "click", add);
  $(document).delegate( ".openBtn", "click", open);
  $(document).delegate( ".cancelUser", "click", cancelUser);
  $(document).delegate(".saveUser", "click", save);
  $(document).delegate( ".userDel", "click", del);

  function add(){
    var block = view.elements.block;
    var addBtn = view.elements.addBtn;

    view.addScreen(block, addBtn);
  };

  function open (){
    var block = view.elements.block;
    var openBtn = view.elements.openBtn;
    var addBtn = view.elements.addBtn;
    var id = $(this).attr('value');
    console.log(id);

    function openHouse (id, block){
      $.ajax({
        method: "POST",
        url: "/users/open",
        data: {
          name: $('#gistName_' + id).html(),
          adress: $('#gistStastus_' + id).html(),
          id: id
        }
      }).done(function(data){
        block.html(data);
        addBtn.show();
      });
    };

    openHouse(id, block);
  };

  function cancelUser() {
    var block = view.elements.block;
    var addBtn = view.elements.addBtn;

    view.cancelAddUser(block, addBtn);
  };

  function save(){
    var block = view.elements.block;
    var add = view.elements.add;
    var addBtn = view.elements.addBtn;
    var userBlock = view.elements.userBlock;
    var id = Date.now();
    var title = $('.addTitle > input').val();
    var status = $('.addStatus > input').val();

    view.userSave(title, status, id, userBlock, add, block);
  };

  function del (){
    var id = $(this).attr('value');
    console.log(del);
    view.delete(id);
  };


};

$(function(){
  var data = {username: 'admin', password: 'admin'};
  var model = new Model(data);
  var view = new View(model);
  var controller = new Controller(model, view);
});
