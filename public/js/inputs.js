function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('preview');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}



document.getElementById("man").onclick = function () {
    var gender = "man";
    console.log("남자");

  };

document.getElementById("woman").onclick = function () {
    var gender = "woman";
    console.log("여자");
  };

export var gender;