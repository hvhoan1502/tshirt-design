let canvas = new fabric.Canvas('tshirt-canvas');

function updateTshirtImage(imageURL){
    fabric.Image.fromURL(imageURL, function(img) {                   
        img.scaleToHeight(300);
        img.scaleToWidth(300); 
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
    });
}

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

document.getElementById("tshirt-color").addEventListener("change", function(){
  if (isImage(this.value)) {
    document.getElementById("tshirt-div").style.backgroundImage = `url('${this.value}')`;
    return;
  }

  document.getElementById("tshirt-div").style.backgroundColor = this.value;
});

document.getElementById("tshirt-design").addEventListener("change", function(){
  updateTshirtImage(this.value);
});

document.getElementById('tshirt-custompicture').addEventListener("change", function(e){
  const reader = new FileReader();
  reader.onload = function (event){
      const imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
          const img = new fabric.Image(imgObj);

          img.scaleToHeight(300);
          img.scaleToWidth(300); 
          canvas.centerObject(img);
          canvas.add(img);
          canvas.renderAll();
      };
  };

  e.target.files[0] && reader.readAsDataURL(e.target.files[0]);
});

document.addEventListener("keydown", function(e) {
  const keyCode = e.key;
  if(keyCode == 46 || keyCode == 'Backspace') {
      canvas.remove(canvas.getActiveObject());
  }
});