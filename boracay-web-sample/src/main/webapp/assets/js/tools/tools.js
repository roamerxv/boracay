(function(window) {
    window.formValidate = function(form,rules, messages) {
        $(form).validate({
            rules: rules,
            messages:messages
        })
    }
    var tools = {};
    tools["_isMobile"] = function(value){
        var length = value.length;

        //中国移动
        var cm = /(^1(3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\d{8}$)|(^1705\d{7}$)/;

        //中国联通
        var cu = /(^1(3[0-2]|4[5]|5[56]|7[6]|8[56])\d{8}$)|(^1709\d{7}$)/;

        //中国电信
        var ct = /(^1(33|53|77|8[019])\d{8}$)|(^1700\d{7}$)/;
        return (length == 11 && (cm.test(value) || cu.test(value) || ct.test(value)))
    }
        $.validator.addMethod("isMobile", function(value, element) {
            return (this.optional(element) || tools._isMobile(value));
        }, "请填写正确的手机号码");

        $.validator.addMethod("isVerificatCode", function(value, element) {
            var length = value.length;
            var verify = /^([0-9]{6})$/;
            return this.optional(element) || (length == 6 && verify.test(value));
        }, "请正确的验证码");

        $.validator.addMethod("isZipCode", function(value, element) {
            var zipCode = /^[0-9]{6}$/;
            return this.optional(element) || (zipCode.test(value));
        }, "请正确填写您的邮政编码");


// 侧边菜单开关
/*    function autoLeftNav() {
        $('.tpl-header-switch-button').on('click', function() {
            if ($('.left-sidebar').is('.active')) {
                if ($(window).width() > 1024) {
                    $('.content-wrapper').removeClass('active');
                }
                $('.left-sidebar').removeClass('active');
            } else {

                $('.left-sidebar').addClass('active');
                if ($(window).width() > 1024) {
                    $('.content-wrapper').addClass('active');
                }
            }
        })
        if ($(window).width() < 1024) {
            $('.left-sidebar').addClass('active');
        } else {
            $('.left-sidebar').removeClass('active');
        }
    }*/
// 侧边菜单
    $('.sidebar-nav-sub-title').on('click', function() {
        $(this).siblings('.sidebar-nav-sub').slideToggle(80)
            .end()
            .find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate');
    })


    /**
     *@Author Mona
     *date 2016-11-14
     *description ajax请求error回调中错误信息按照dom中请求参数的key对应的dom显示报错信息
     */
    function renderErrorMsg(jqXHR,textStatus,errorThrown){
        var jsonObj = JSON.parse(jqXHR.responseText);
        var errors_hashMap = {
            Set: function(key, value) {
                this[key] = value
            },
            Get: function(key) {
                return this[key]
            },
            Contains: function(key) {
                return this.Get(key) == null ? false : true
            },
            Remove: function(key) {
                delete this[key]
            }
        };

        for ( var i in jsonObj.errors) {
            var error = jsonObj.errors[i];
            for ( var j in error.nodesName) {
                var dom_name = (error.nodesName[j]);
                if (errors_hashMap.Contains(dom_name)) {
                    errors_hashMap.Set(dom_name, errors_hashMap.Get(dom_name) + "<br>" + error.errorMessage);
                } else {
                    errors_hashMap.Set(dom_name, error.errorMessage);
                }
            }
        }
        var keyList = Object.keys(errors_hashMap);
        for ( var i in keyList) {
            var keyName = keyList[i];
            if (typeof (errors_hashMap.Get(keyName)) == "string") {
                var node_name = keyName;
                var dom = $("[name='" + node_name + "']");
                if(node_name == 'publicError'){//pulicError 后端key未配置的错误信息提示位置
                    $(dom).html('');
                    var alert_box = $('<div>');
                    alert_box.attr({'class':'alert alert-warning alert-dismissible','role':'alert'});
                    var alert_box_btn = $('<button>');
                    alert_box_btn.attr({'type':'button','class':'close','data-dismiss':'alert'});
                    var alert_box_btn_span = $('<span>');
                    alert_box_btn_span.attr('aria-hidden','true');
                    alert_box_btn_span.html('&times;');
                    alert_box_btn.append(alert_box_btn_span);
                    var alert_box_strong = $('<strong>');
                    alert_box_strong.text('警告！');

                    var alert_box_p = $('<p>');
                    alert_box_p.text(errors_hashMap.Get(keyName));
                    alert_box.append(alert_box_btn)
                    alert_box.append(alert_box_strong)
                    alert_box.append(alert_box_p)
                    dom.append(alert_box);
                    $(dom).fadeIn();//显示publicError dom节点

                    $('html,body').animate({scrollTop:0},500);//页面回到顶部

                    setTimeout(function(){ $(dom).fadeOut();},5000)// 5s后消失也可以点击右上角关闭按钮

                }else{
                    var error_len = dom.parent().find('label.error').length>0;
                    if(error_len){
                        dom.parent().find('label.error').detach();
                    }
                    var label_dom = $('<label>');
                    label_dom.attr({'id':node_name+'-error','class':'error','for':node_name});
                    label_dom.text(errors_hashMap.Get(keyName));
                    dom.parent().append(label_dom);

                }
            }
        }
    }

    function renderNum(num){
        var cur_num = null;
        var string_num = (num||0).toString();
        var spot_index = string_num.indexOf('.');

        if(spot_index == -1){
            cur_num = toThousands(num);
            cur_num = cur_num+'.0';
        }else{
            var cur_spot_num = string_num.substring(spot_index);
            num = string_num.substring(0,spot_index);
            cur_num = toThousands(num);
            cur_num = cur_num+cur_spot_num;
        }

        return cur_num
    }

    //数字组件
    $.fn.whaleNumber = function(options) {

        var defaults = {
            max_int: 3,
            max_spot: 1,
            type:'money'
        }

        var settings = $.extend({}, defaults, options);
        return this.each(function() {
            var $this = $(this);
            var is_money = (settings.type=='money');

            //获取焦点时
            $this.on('input propertychange',function(e){
                var _this = this;
                var cur_val = $(_this).val();//当前值
                var spot_index = cur_val.indexOf('.');//当前小数点索引
                var int_val = null//整数值
                var int_len = null;//整数长度
                var decimal_val = null;//小数值
                var decimal_len = null;//小数长度

                //限制只能输入数字逗号和小数点
                for(var index=0;index<this.value.length;index++){
                    if(!/[0-9\.]/.test(this.value.charAt(index))){
                        this.value=this.value.substring(0,index);
                    }
                }

                //没有小数点
                if(spot_index == -1){
                    int_len = cur_val.length;
                    if(int_len >= settings.max_int){
                        $(_this).val(cur_val.substring(0,settings.max_int));
                    }
                    //有小数点
                }else{
                    var sopt_last_index = cur_val.lastIndexOf('.');

                    //有且只有一个小数点
                    if(sopt_last_index == spot_index){
                        int_val = cur_val.substring(0,spot_index);
                        int_len = cur_val.substring(0,spot_index).length;
                        decimal_len = cur_val.substring(spot_index+1).length;
                        if(int_len>3 || decimal_len>1){
                            if(int_len>3){
                                int_val = cur_val.substring(0,3);
                            }
                            decimal_val = cur_val.substring(spot_index+1,spot_index+2);
                            $(_this).val(int_val+'.'+decimal_val);
                        }

                        //有多个小数点
                    }else{
                        $(this).val(cur_val.substring(0,spot_index+1));
                    }

                }
            });

            // $this.on('focus',function(e){
            //     var cur_input_val = $(this).val();
            //     var cur_val_list = cur_input_val.split('');
            //     if($.inArray(',',cur_val_list)>-1){
            //         cur_input_val = cur_input_val.replace(/,/g,'');
            //         $(this).val(cur_input_val);
            //     }
            // });

        });

    };

    $(function(){
        $('[data-role="whale-money"]').whaleNumber({type:'money'});

        $('[data-role="whale-number"]').whaleNumber({type:'number'});
    })
})(window)
