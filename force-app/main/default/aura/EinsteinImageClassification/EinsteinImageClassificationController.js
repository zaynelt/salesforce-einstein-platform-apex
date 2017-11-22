({
  readFile: function(component, event, helper) {
   
    var files = component.get("v.files");
    //files var is a proxy object w/ length of 1, even w/o file, so we've got to modify our null check
    var file = files[0][0];      
    if(file){
        console.log('ACTUALLY IS A FILE.');
        if (file.size>5000000) {
            return alert("The file exceeds the limit of 5MB.");
        }
        var reader = new FileReader();
        reader.onloadend = function() {
            var dataURL = reader.result;
            component.set("v.pictureSrc", dataURL);
            component.set("v.fileName", file.name);
            helper.upload(component, file.name, dataURL.match(/,(.*)$/)[1]);
        };
        reader.readAsDataURL(file);
    } else {
        console.log('NOT ACTUALLY IS A FILE.');
    }                 
  },
  switchDefaultUrl: function(component) {
      component.set(
          "v.defaultUrl",
          component.get("v.imageType") === "image"
          ? "https://s3-us-west-2.amazonaws.com/ztsfdc-demo-files/einstein-datasets/Cats.zip"
          : "https://s3-us-west-2.amazonaws.com/ztsfdc-demo-files/einstein-datasets/Cats.zip"
      );
  }
});