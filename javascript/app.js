var animalsArray=['dog','cat','rabbit','hamster','skunk','goldfish','bird','ferret','turtle','sugar glidder','chinchilla','hedgehog','hermit crab','gerbil','pygmy goat','chicken','capybara','teacup pig','serval','salamander','frog'];
var animal;
var activeAnimal;
var gifsCounter=10;
$(document).ready(function(){

    function loadAnimals(){
        $('#animalNames').html('')
        for(var i=0;i<animalsArray.length;i++){
            var element=`<button class='btn btn-info go' data-animal-name='${animalsArray[i]}'>${animalsArray[i]}</button>`;
            $('#animalNames').append(element);
        }
    }
    loadAnimals();
    $('#submitAnimal').click(function(){
        animalsArray.push($('#newAnimal').val());
        loadAnimals();
    });
    $('body').on('click','.go',function(){
        $("#gifs-appear-here").html('')
        animal=$(this).attr('data-animal-name');
        activeAnimal=animal;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
              var results = response.data;
              for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<span>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var t=$('<p>').text('Title: '+results[i].title).attr('style','width:200px');
                
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr('data-still',results[i].images.fixed_height_still.url);
                animalImage.attr('data-animate',results[i].images.fixed_height.url);
                animalImage.attr('class','move');
                animalDiv.append(p);
                animalDiv.append(t);
                animalDiv.append(animalImage);
                $("#gifs-appear-here").append(animalDiv);
              }
          })
    })
    $('body').on('click','.move',function(){
        if($(this).attr('src')!=$(this).attr('data-animate')){
           $(this).attr('src',$(this).attr('data-animate'))
        }else{$(this).attr('src',$(this).attr('data-still'))}
    })
    $('#moreGifs').on('click',function(){
        if(activeAnimal){
        animal=activeAnimal;
        //unfortunately, giphy API has a limit on gifs it returns = 25... so the code doesnt work as i want... but if there was no limit on gifs amount, the code would look like that:
        //so please, push the button moregifs just once:)
        gifsCounter=gifsCounter+10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit="+gifsCounter;
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
              var results = response.data;
              for (var i = results.length-1; i > results.length-10; i--) {
                var animalDiv = $("<span>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var t=$('<p>').text('Title: '+results[i].title).attr('style','width:200px');
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr('data-still',results[i].images.fixed_height_still.url);
                animalImage.attr('data-animate',results[i].images.fixed_height.url);
                animalImage.attr('class','move');
                animalDiv.append(p);
                animalDiv.append(t);
                animalDiv.append(animalImage);
                $("#gifs-appear-here").prepend(animalDiv);
              }
          })
        }
    })
});




