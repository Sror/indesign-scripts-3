﻿


//Display a standard open file dialog box to select a graphic file.
var myFolder = Folder.selectDialog("Select the folder containing the images", ""); 
var myError;
gerarTemplate (myFolder);
function gerarTemplate(folder){
var pastaDestino;
myFiles = folder.getFiles("*.jpg"); 

try {
    app.open(File("N:/INDD/TEMP "+myFiles.length+".indt" ));
    }
catch(myError){
    alert ("Falha");
    }

    var myDocument= app.activeDocument;
//If a graphic file was selected, and if you didn't press Cancel, 
//place the graphic file on the page.
    if((myFiles.length != 0)&&(myFiles != null)){
    
        for (myCounter = 0; myCounter < myDocument.rectangles.length-1; myCounter++){  
                var myRectangle = myDocument.rectangles.item(myCounter); 
                var arquivo = new File(myFiles[myCounter]);
                pastaDestino =new Folder(arquivo.path);
                var myGraphic = myRectangle.place(arquivo); 
                myRectangle.fit(FitOptions.centerContent); 
                myRectangle.fit(FitOptions.proportionally); 
                myRectangle.fit(FitOptions.frameToContent); 
                }    



    } 

app.activeDocument.save(new File(pastaDestino +"/"+pastaDestino.displayName+" Teste.indd"));


//INICIO script EXPORTAR TUDO JPEG

                if (app.documents.length != 0) {  
                    var myDoc = app.activeDocument;  
                    var myBaseName = myDoc.filePath.displayName;
                if (myBaseName != null) MakeJPEGfile();  
                    }  
                else{    
                        alert("Please open a document and try again.");    
                    }   
  
    function MakeJPEGfile() {   
     for(var myCounter = 0; myCounter < myDoc.pages.length; myCounter++) {  
            if (myDoc.pages.item(myCounter).appliedSection.name != "") {  
               myDoc.pages.item(myCounter).appliedSection.name = "";  
            }  
            var myPageName = myDoc.pages.item(myCounter).name;  
            app.jpegExportPreferences.jpegQuality = JPEGOptionsQuality.maximum; // low medium high maximum  
            app.jpegExportPreferences.exportResolution = 300;
            app.jpegExportPreferences.jpegExportRange = ExportRangeOrAllPages.exportRange;  
            app.jpegExportPreferences.pageString = myPageName;  
            
            var myFilePath = new Folder(myDoc.filePath+ "/exportado/");  
            myFilePath.create();
            var myFilePath = myDoc.filePath+ "/exportado/"+ myBaseName  + "_" + myPageName + ".jpg";  
            var myFile = new File(myFilePath);  
            myDoc.exportFile(ExportFormat.jpg, myFile, false);  
           }  
         }  
  
    function GetFileNameOnly(myFileName) {  
        var myString = "";  
        var myResult = myFileName.lastIndexOf(".");  
        if (myResult == -1) {  
            myString = myFileName;  
            }  
        else {  
                 myString = myFileName.substr(0, myResult);  
                }  
        return myString;  
      } 

//FIM script EXPORTAR TUDO JPEG


app.activeDocument.close(SaveOptions.no);
}