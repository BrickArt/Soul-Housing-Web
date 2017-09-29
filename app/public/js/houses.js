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
    cancelBtn: $('.addCancel'),
    openBtn: $('.openBtn'),
    delBtn: $('.gistDel'),
    houseBlock: $('.houseBlock'),



  };

  self.delete = function (block, id){
    $('#' + id).slideUp();
    console.log('ulala')
    $('.tatata').hide();
  };







  self.openBlock = function (block, addBtn){
    $.ajax({
      method: "POST",
      url: "/houses/add"
    }).done(function (data){
      block.html(data);
      addBtn.hide();
    });
  };

  self.cancelAdd = function (block, addBtn){
    $.ajax({
      method: "POST",
      url: "/houses/add/cancel",
    }).done(function (data){
      block.html(data);
      addBtn.show();
    });
  };


  self.addSave = function(title, adress, id, house, block){
    console.log(title);
    // if (addSave.isLoaded != true){
      $.ajax({
        method: "POST",
        url: "/houses/add/add",
        data: {
          name: title,
          adress: adress,
          id: id,
        },
      }).done(function (data){
        house.append(data);
        $('.tatata').slideUp();
        console.log('done');
      });
    // } addSave.isLoaded = true;
  };


};

function Controller(model, view){
  var self = this;

  view.elements.addBtn.on('click', add);
  view.elements.cancelBtn.on('click', cancel);

  $(document).delegate( ".openBtn", "click", open);
  $(document).delegate( ".gistDel", "click", del);
  $(document).delegate(".addSave", "click", addSave);


  function add() {
    var block = view.elements.block;
    var addBtn = view.elements.addBtn;
    view.openBlock(block, addBtn);
  };

  function cancel() {
    var block = view.elements.block;
    var addBtn = view.elements.addBtn;
    view.cancelAdd(block, addBtn);
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
        url: "/houses/open",
        data: {
          name: $('#houseName_' + id).html(),
          adress: $('#houseAdress_' + id).html(),
          id: id
        }
      }).done(function(data){
        block.html(data);
        addBtn.show();
      });
    };

    openHouse(id, block);
  };

  function del(){
    var block = view.elements.block;
    var id = $(this).attr('value');
    view.delete(block, id);
    console.log(id);
  };

  function addSave(){
    var title = $('.addTitle > input').val();
    var adress = $('.addAddress > input').val();
    var house = view.elements.houseBlock;
    var block = view.elements.block;
    var id = Date.now();
    console.log(id);
    view.addSave(title, adress, id, house, block);

  };
};

$(function(){
  var data = {username: 'admin', password: 'admin'};
  var model = new Model(data);
  var view = new View(model);
  var controller = new Controller(model, view);
});
