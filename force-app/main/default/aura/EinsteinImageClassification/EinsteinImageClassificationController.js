({
  readFile: function(component, event, helper) {
      var files = component.get("v.files");
      if (files && files.length > 0) {
          //we're getting a falsy value of 1, even w/o file
          var file = files[0][0];
          //so we have to implement our actual null check here:
          if(file){
              console.log('ACTUALLY IS A FILE.');
              if (file.size>900000) {
                  return alert("The file exceeds the limit of 900kb.");
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
      }
  },
  switchDefaultUrl: function(component) {
      component.set(
          "v.defaultUrl",
          component.get("v.imageType") === "image"
          ? "http://einstein.ai/images/mountainvsbeach.zip"
          : "http://einstein.ai/images/mountainvsbeach.zip"
      );
  }
});