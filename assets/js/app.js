;(function($){

    var storeBase = (function(){
      $.getJSON('./../prov.json', function(data){
            var oFragProv = document.createDocumentFragment();
            $.each(data[0].prov, function(i, item){
                  var opProv = document.createElement('option');
                  opProv.value = item.id;
                  opProv.text = item.name;
                  oFragProv.appendChild(opProv);
            });
            $('#prov').append(oFragProv);

            $('#prov').on('change', function(){
                  var _this = $(this);
                  var oFragCode = document.createDocumentFragment();
                  var oFragStore = document.createDocumentFragment();
                  $.each(data[0].city, function(i, v){
                        if(v.pid == _this.val()) {
                              var opCode = document.createElement('option');
                              var opStore = document.createElement('option');

                              opCode.value = v.name;
                              opCode.text = v.code;

                              opStore.value = v.code;
                              opStore.text = v.name;

                              oFragCode.appendChild(opCode);
                              oFragStore.appendChild(opStore);
                        }
                  });
                  $('#code').html(oFragCode).show();
                  $('#store').html(oFragStore).show();
            });

            $('#code').on('change', function(){
                  var _this = $(this);
                  var _text = _this.find('option').not(function(){ return !this.selected }).text();
                  $('#store').find('option[value='+_text+']').prop('selected',true);
                  console.log(_text);
            });
            $('#store').on('change', function(){
                  var _this = $(this);
                  var _text = _this.find('option').not(function(){ return !this.selected }).text();
                  $('#code').find('option[value='+_text+']').prop('selected',true);
                  console.log(_text);
            });
      });
    });

    var dialog = (function(text,callback) {
        var html = '<div class="dialog">\
                        <div class="dialog-wrap">\
                            <div class="dialog-body">{{text}}</div>\
                            <div class="dialog-btn" id="btnOk">OK</div>\
                        </div>\
                    </div>';

        $('body').append(html.replace(/{{text}}/, text));
        $('.dialog').find('#btnOk').on('tap', function(){
            if(callback && typeof callback === 'function'){
              callback();
            }
            $('.dialog').remove();
        });
    });

    var music = function() {
          document.addEventListener("WeixinJSBridgeReady", function () {
              WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                  network = e.err_msg.split(":")[1];
                  $('audio').get(0).play();
              });
            }, false);

            $('.music').on('touchstart',function(){
                if($(this).hasClass('on')){
                    $('audio').get(0).pause();
                    $(this).removeClass('on music-off');
                    $(this).attr('src','images/off.png');
                }else {
                    $('audio').get(0).play();
                    $(this).addClass('on music-off');
                    $(this).attr('src','images/on.png');
                }  
            });
    }

    var reload = function(){
        window.location.href = window.location.href + "?t=" + 10000 * Math.random();
    }

    var _Swiper = new Swiper ('.swiper-container', {
        direction : 'vertical',
        pagination: '.swiper-pagination',
        onInit: function(swiper){
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画

            storeBase(); 
            music();
            $('#submit').on('tap', function(e){
                e.preventDefault();
                var name = $.trim($('#name').val());
                var mobile = $.trim($('#mobile').val());
                //门店选择
                var prov = $.trim($('#prov').find('option').not(function(){ return !this.selected }).text());
                var code = $.trim($('#code').find('option').not(function(){ return !this.selected }).text());
                var store = $.trim($('#store').find('option').not(function(){ return !this.selected }).text());

                if(name.length == 0 || mobile.length == 0 || prov === '-1' || code === '-1' || store === '-1') {
                    dialog('请完善表单信息!');
                    //return false;
                }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(mobile))) {
                    dialog('手机号码不正确!');
                    //return false;
                }else{
                  $.ajax({
                    type: 'POST',
                    url: '../post.php',
                    data: { name:name, mobile:mobile, prov:prov, code:code, store:store },
                    dataType: 'json',
                    success: function(res){
                        if(res.status == 'success') {
                            dialog('报名成功!', function(){
                                //reload();
                                $('.success').show();
                                $('.arrow').hide();
                            });
                        }
                    },
                    error: function(err) {
                        dialog(err);
                        return false;
                    }
                  });
                }
            });
        },
        onSlideChangeEnd: function(swiper) {
            swiperAnimate(swiper);

            if(swiper.activeIndex == 5) {
                $('.arrow').hide();
            }else {
                $('.arrow').show();
            }
        }
    });
})(Zepto);