$(document).ready(function(){
    $('#register').on('click', function(){
        var name = $.trim($('#name').val());
        var room = $.trim($('#room').val());
        var prof = $.trim($('#prof').val());
        var credit = $.trim($('#credit').val());
        var semester = $.trim($('#semester').val());
        //var website = $.trim($('#website').val());
        var img = $.trim($('#upload-input').val());
        
        var isValid = true;
        
        if(name == ''){
            isValid = false;
            $('#errorMsg1').html('<div class="alert alert-danger">Name field is empty</div>');
        }else{
            $('#errorMsg1').html('');
        }
        
        if(room == ''){
            isValid = false;
            $('#errorMsg2').html('<div class="alert alert-danger">Address field is empty</div>');
        }else{
            $('#errorMsg2').html('');
        }
        
        if(prof == ''){
            isValid = false;
            $('#errorMsg3').html('<div class="alert alert-danger">Professor field is empty</div>');
        }else{
            $('#errorMsg3').html('');
        }
        
        if(credit == ''){
            isValid = false;
            $('#errorMsg4').html('<div class="alert alert-danger">Credit field is empty</div>');
        }else{
            $('#errorMsg4').html('');
        }
        
        if(semester == ''){
            isValid = false;
            $('#errorMsg5').html('<div class="alert alert-danger">Semester field is empty</div>');
        }else{
            $('#errorMsg5').html('');
        }
        
        /*if(website == ''){
            isValid = false;
            $('#errorMsg6').html('<div class="alert alert-danger">Website field is empty</div>');
        }else{
            $('#errorMsg6').html('');
        }*/
        
        if(isValid == true){
            
            var courseData = {
                name: name,
                room: room,
                prof: prof,
                credit: credit,
                semester: semester,
                //website: website,
                img: img
            };
            
            $.ajax({
                url: '/company/create',
                type: 'POST',
                data: courseData,
                success: function(data){
                    $('#name').val('');
                    $('#room').val('');
                    $('#prof').val('');
                    $('#credit').val('');
                    $('#semester').val('');
                    //$('#website').val('');
                }
            });
            
        }else{
            return false;
        }
        
    });
})









































