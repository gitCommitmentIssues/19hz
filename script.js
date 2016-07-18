var bigAssString=""
var eventArr=[]
var genre="false"

$.ajax({
    url: "./test.csv",
    async: false,
    success: function (csvd) {
        bigAssString=csvd
        //split string into array based on new lines
        eventArr=bigAssString.split('\n')
        //for each event in event array
    },
    dataType: "text",
});

var sort = function(ageLimit){
    eventArr.forEach(function (event,index){
        //replace all double commas with "no info"    
        var currentEvent=eventArr[index].replace(',,',',No info,')
        currentEvent=currentEvent.replace(',,',',No info,')
        //create new subarray, each element seperated by a comma NOT IN QUOTES 
        currentEvent=currentEvent.match(/("[^"]*")|[^,]+|(^\d*$)/g)
        //remove extra empty cells
        if(currentEvent[currentEvent.length-1].length<2&&currentEvent.length===11) currentEvent.pop()
        //remove quotes
        if(currentEvent[1]&&currentEvent[1][0]==='"')currentEvent[1]=currentEvent[1].slice(1,currentEvent[1].length-1)
        if(currentEvent[2]&&currentEvent[2][0]==='"')currentEvent[2]=currentEvent[2].slice(1,currentEvent[2].length-1)
        if(currentEvent[3]&&currentEvent[3][0]==='"')currentEvent[3]=currentEvent[3].slice(1,currentEvent[3].length-1)
        // if(currentEvent[7][0]&&currentEvent[7][0]==='"')currentEvent[7]=currentEvent[7].slice(1,currentEvent[7].length-1)
        var facebookLink=false
        if(currentEvent[8]&&currentEvent[8].includes("facebook"&&"events")) facebookLink=currentEvent[8]
        if(currentEvent[9]&&currentEvent[9].includes("facebook"&&"events")) facebookLink=currentEvent[9]
        if(ageLimit){
            if(currentEvent[6]===ageLimit){
                $(".calendarBody").append("\
                    <tr>\
                        <td><small>"+currentEvent[0]+"<br>"+currentEvent[4]+"</small></td>\
                        <td><a href='"+currentEvent[currentEvent.length-2]+"'>"+currentEvent[1]+"</a> @<br>"+currentEvent[3]+"</td>\
                        <td>"+currentEvent[2]+"</td>\
                        <td>"+currentEvent[5]+" | "+currentEvent[6]+"</td>\
                        <td>"+currentEvent[7]+"</td>"+
                        (facebookLink ? "<td><a href='"+facebookLink+"'>facebook</a></td>" : "<td></td>")+"\
                    </tr>\
                ")
            }
        }
        else{
            $(".calendarBody").append("\
                <tr>\
                    <td><small>"+currentEvent[0]+"<br>"+currentEvent[4]+"</small></td>\
                    <td><a href='"+currentEvent[currentEvent.length-2]+"'>"+currentEvent[1]+"</a> @<br>"+currentEvent[3]+"</td>\
                    <td>"+currentEvent[2]+"</td>\
                    <td>"+currentEvent[5]+" | "+currentEvent[6]+"</td>\
                    <td>"+currentEvent[7]+"</td>"+
                    (facebookLink ? "<td><a href='"+facebookLink+"'>facebook</a></td>" : "<td></td>")+"\
                </tr>\
            ")
        }
    })
}

sort()

$("#allAges").click(function(){
    $(".calendarBody").empty()
    sort("All ages")
})
$("#eighteen").click(function(){
    $(".calendarBody").empty()
    sort("18+")
})

$("#twentyOne").click(function(){
    $(".calendarBody").empty()
    sort("21+")
})

$("#allEvents").click(function(){
    sort()
})