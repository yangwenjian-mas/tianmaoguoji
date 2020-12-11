
$(function () {

  $('#login').validate({

    rules: {
      username: {
        required: true,
        minlength: 5,
        maxlength: 10
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 12
      }
    },

    messages: {
      username: {
        required: '用户名错误',
        minlength: '最少 5 个字符',
        maxlength: '最多 10 个字符'
      },
      password: {
        required: '密码错误',
        minlength: '最少 6 个字符',
        maxlength: '最多 12 个字符'
      }
    },
 
    submitHandler (form) {

      const info = $(form).serialize()

      $.post('./server/login.php', info, null, 'json').then(res => {

        console.log(res)

        if (res.code === 0) {

          $('.login_error').css('display','inline')
        } else if (res.code === 1) {

          setCookie('nickname', res.nickname)
          
          window.location.href = './index.html'
        }
      })
    }
  })
})
