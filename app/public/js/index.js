function Model(data){
  var self = this;
  self.data = data;

  self.authorization = function(user, pass){
    if (user.length === 0 && pass.length === 0){
      alert('Введите логин и пароль!');
    } else if (user.length === 0){
        alert('Введите логин!');
      } else if (pass.length === 0){
          alert('Введите пароль!');
        } else return auth(user, pass);
  };
  function auth(user, pass){
    if (user === self.data.username && pass === self.data.password){
      console.log('ok');
      $.ajax({
      url: "/login",
      method: "GET",
      complete: function() {
      },
      statusCode: {
        200: function() {
        //  form.html("Вы вошли в сайт").addClass('alert-success');
          window.location.href = "/houses";
        },
        403: function(jqXHR) {
        //  var error = JSON.parse(jqXHR.responseText);
        //  $('.error', form).html(error.message);
        }
      }
    });
    }else alert('Ошибка авторизации!');
    return false;
  };


};

function View(model){
  var self = this;

  self.elements = {
    username: $('.username > input'),
    password: $('.password > input'),
    button: $('.authBtn')
  }
};

function Controller(model, view){
  var self = this;

  view.elements.button.on('click', auth);

  function auth(){
    var user = view.elements.username.val();
    var pass = view.elements.password.val();
    model.authorization(user, pass);

    view.elements.password.val('');
  };
};

$(function(){
  var data = {username: 'admin', password: 'admin'};
  var model = new Model(data);
  var view = new View(model);
  var controller = new Controller(model, view);
});
