# jquery.ime
Detect IME events and trigger custom events (ime.typing / ime.finish / ime.direct).

# Usage
    <input type="text" name="text-value" class="imecheck">  
      
    (function($){  
        $(function(){  
            $('.imecheck').ime().on('ime.finish ime.direct', function(){  
                // 文字入力確定！  
            });  
        });  
    })(jQuery);  
