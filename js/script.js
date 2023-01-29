let BoxOpened ="";
let ImgOpened = "";
let Counter = 0;
let ingFound = 0;

let Source = "#boxcard";
let ImgSource = [
    "img/bet.png", // 1
    "img/budge.png", // 2
    "img/jug.png", // 3
    "img/lina.png", // 4
    "img/mom.png", // 5
    "img/puck.png", // 6
    "img/sf.png", // 7
    "img/tec.png", // 8
    "img/tinker.png", // 9
    "img/zom.png" // 10
]
function RandomFunction(){
    return Math.round(Math.random()*(MaxValue - MinValue) + MinValue)
}

function Shuff(){
    let ImgAll = $(Source).children();
    let imgthis = $(Source + "div:first-children");
    let ImgArr = new Array();

    for (let i = 0; i < ImgAll.length; i++){
        ImgArr[i] = $("#" + imgthis.attr("id") + " img").attr("src");
        imgthis.next();
    }
    
    ImgTHIS = $(Source + "div:first-children");
    for (let z = 0; z < ImgAll; z++){
        let RandomNum = RandomFunction(0, ImgArr.length -1);
        $('#' + ImgTHIS.attr("id") + " img").attr("src", ImgArr[RandomNum]);
        ImgArr.splice(RandomNum, 1);
        ImgTHIS = ImgTHIS.next();
    }
}

function ResetGame(){
    Shuff();
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    Counter = 0;
    $("#success").remove();
    $("#counter").html("" + Counter);
    BoxOpened = "";
    ImgOpened = "";
    ImgFound = 0;
    return false;
}
function OpenCard(){
    let id = $(this).attr("id");

    if ($("#" + id + " img").is(":hidden")){
        $(Source + " div").unbind("click", OpenCard);
        $("#" + id + " img").slideDown('fast');

        if (ImgOpened == ""){
            BoxOpened = id;
            ImgOpened = $("#" + id + " img").attr("src");
            setTimeout(function(){
                $(Source + " div").bind("click", OpenCard)}, 300);   
        } else {
            CurrentOpened = $("#" + id + " img").attr("src");
            if (ImgOpened != CurrentOpened){
                setTimeout(function(){
                    $("#" + id + " img").slideUp('fast');
                    $("#" + BoxOpened + " img").slideUp('fast');
                    BoxOpened = "";
                    ImgOpened = "";
                }, 400)
            } else {
                $("#" + id + " img").parent().css("visibility", "hidden");
                $("#" + BoxOpened + " img").parent().css("visibility", "hidden");
                ImgFound++;
                ImgOpened = "";
                BoxOpened = "";
            }
            setTimeout(function(){
                $(Source + " div").bind("click", OpenCard)
            }, 400)
            
        }
        Counter++;
        $("#counter").html("" + Counter);

        if (ImgFound == ImgDota.length){
            $('#counter').prepend('<span id = "success>Вы молодцы!</span>')
        }
    }
}

$(function(){

    for(let y = 1; y <3; y++){
        $.each(ImgSource, function(i, val) {
            $(Source).append("<div id=card" + y + i + "><img src = " + val + "/>")
        });
    }
    $(Source + "div").click(OpenCard);
    Shuff();
})