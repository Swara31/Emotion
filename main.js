var preediction_1 = "";
var preediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});


camera=document.getElementById("camera");
Webcam.attach('#camera');


function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version=',ml5.version);

Classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/odoSGDhiF/model.json',modelloaded);


function modelloaded()
    {
        console.log('modelloaded');
    }


function speak()
{
    var Synth=window.speechSynthesis;
    speakdata1="The first prediction is "+preediction_1;
    speakdata2="The second prediction is "+preediction_2;

    var Utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    Synth.speak(Utterthis);
}


function check()
{
    img = document.getElementById('captured_img');
    Classifier.classify(img,gotresult);
}


function gotresult(error,results)
{
 if(error)
 {
     console.error(error);
 }
 else
 {
     console.log(results);
     document.getElementById("result_emotion_name_1").innerHTML=results[0].label;
     document.getElementById("result_emotion_name_2").innerHTML=results[1].label;
     preediction_1=results[0].label;
     preediction_2=results[1].label;

     speak();

    if(results[0].label == "Happy")
    {
        document.getElementById("update_emoji_1").innerHTML="&#128522;";
    }


    if(results[0].label == "Sad")
    {
        document.getElementById("update_emoji_1").innerHTML="&#128532;";
    }


    if(results[0].label == "Angry")
    {
        document.getElementById("update_emoji_1").innerHTML="&#128548;";
    }


    if(results[1].label == "Happy")
    {
        document.getElementById("update_emoji_2").innerHTML="&#128512;";
    }


    if(results[1].label == "Sad")
    {
        document.getElementById("update_emoji_2").innerHTML="&#128546;";
    }


    if(results[1].label == "Angry")
    {
        document.getElementById("update_emoji_2").innerHTML="&#128545;";
    }
}
}