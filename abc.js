let showPassword = document.getElementById('showPassword');
let inputPassword = document.getElementById('password');
showPassword.onclick = function(){
    if(inputPassword.type == 'password'){
        inputPassword.type = 'text';
        showPassword.classList.add('show');
    }
    else{
        inputPassword.type = 'password';
        showPassword.classList.remove('show');
    }
}

// Lấy tham chiếu đến phần tử nút SignIn
const signInButton = document.querySelector(".signIn button");

// Gán sự kiện cho nút SignIn
signInButton.addEventListener("click", function() {
  // Lấy thông tin tài khoản và mật khẩu từ các trường nhập liệu
  const username = document.getElementById("username").value;
  const pass= document.getElementById("password").value;
  const email = document.getElementById("email").value;
  // Kiểm tra tính hợp lệ của tên đăng nhập và mật khẩu
  console.log(`Username: `,username,`Password: `,pass,`Email: `,email);

  // khởi tạo đối tượng XMLHttpRequest
  var xhttp = new XMLHttpRequest();

  // Xác định hành động khi nhận được phản hồi từ máy chủ
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Xử lý kết quả trả về từ máy chủ
      var data = JSON.parse(this.responseText);
      const nguoiDung = data.find(user => user.user === username || user.email === email );
      if (nguoiDung) {
        // Tài khoản đã tồn tại
        alert("Tài khoản hoặc email đã sử dụng");
      } else {
        // Tạo một đối tượng mới để chứa thông tin người dùng
        var newUser = {
          user: username,
          pass: pass,
          email: email
        };
      
        // Gửi yêu cầu HTTP POST đến địa chỉ '/users'
        var xhttp2 = new XMLHttpRequest();
        xhttp2.open("POST", "https://192.168.2.6:3000/users", true);
        xhttp2.setRequestHeader("Content-type", "application/json");

        // Gửi thông tin tài khoản và mật khẩu dưới dạng JSON
        var data = JSON.stringify(newUser);
        xhttp2.send(data);

        xhttp2.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            // Xử lý kết quả trả về từ máy chủ
            var data = JSON.parse(this.responseText);
            alert(data.message);
          }
        };
      }
    }
  };
  // Gửi yêu cầu HTTP GET đến địa chỉ '/users'
  xhttp.open("GET", "https://192.168.2.6:3000/users", true);
  xhttp.send();
});
