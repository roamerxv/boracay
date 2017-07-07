/**
 * Created by yugang on 2017/5/31.
 */
var HttpUtils = (function () {
    /**
     * 封装基本请求方式
     */

        //还款管理的所有请求接口对象
    var application = {};
    /**
     * 基本信息提交
     */

    application.post_songdelete = function (param, callback) {
        var url = '/music/special/daleteSongs';
        BaseRequest.post(param, url, callback)
    }

    application.post_info_data = function (param, callback) {
        var url = '/album/upload';
        BaseRequest.post_multipart_form_data(param, url, callback)
    }
    application.post_song_data = function (param, callback) {
        var url = '/music/special/song';
        BaseRequest.post(param, url, callback)
    }
    application.post_albumsong_data = function (param, callback) {
        var url = '/music/special/save';
        BaseRequest.post(param, url, callback)
    }
    application.post_albumInfo_data = function (param, callback) {
        var url = '/album/base_info/create';
        BaseRequest.post_multipart_form_data(param, url, callback)
    }

    application.post_songsave_data = function (param, callback) {
        var url = '/music/role/save';
        BaseRequest.post(param, url, callback)
    }
    application.post_performer_data = function (param, callback) {
        var url = '/performer/add';
        BaseRequest.post_multipart_form_data(param, url, callback)
    }
    application.post_record_data = function (param, callback) {
        var url = '/recordcompanys';
        BaseRequest.post_multipart_form_data(param, url, callback)
    }
    application.get_album_song_list_data = function (param, callback) {
        var url = '/album/song/list';
        BaseRequest.sync_get(param, url, callback, 'url')
    }
    application.get_album_info_data = function (param, callback) {
        var url = '/album/base_info';
        BaseRequest.get(param, url, callback, 'url')
    }
    //创建专辑
    application.post_albumData = function (param, callback) {
        var url = '/album/base_info/create';
        BaseRequest.post(param, url, callback)
    }
    //删除专辑封面
    application.del_pic = function (param, callback) {
        var url = '/album/cover/delete';
        BaseRequest.delete(param, url, callback, 'url')
    }
    //修改语种
    application.post_album_language = function (param, callback) {
        var url = '/album/update/language';
        BaseRequest.post(param, url, callback)
    }
    //修改专辑类型
    application.post_album_type = function (param, callback) {
        var url = '/album/update/type';
        BaseRequest.post(param, url, callback)
    }
    //修改流派
    application.post_album_style = function (param, callback) {
        var url = '/album/update/style';
        BaseRequest.post(param, url, callback)
    }
    //修改唱片公司
    application.post_album_company = function (param, callback) {
        var url = '/album/update/company';
        BaseRequest.post(param, url, callback)
    }
    //修改表演人
    application.post_album_performer = function (param, callback) {
        var url = '/album/update/performer';
        BaseRequest.post(param, url, callback)
    }
    //添加其他表演人
    application.post_album_AddPerformer = function (param, callback) {
        var url = '/album/add/otherperformer';
        BaseRequest.post(param, url, callback)
    }
    //修改表演人
    application.modify_album_otherPerformer = function (param, callback) {
        var url = '/album/update/otherperformer';
        BaseRequest.post(param, url, callback)
    }
    //删除其他表演人
    application.del_album_otherPerformer = function (param, callback) {
        var url = '/album/delete/otherperformer';
        BaseRequest.delete(param, url, callback, 'url')
    }
    //获取流派
    application.get_style = function (callback) {
        var url = '/music/genre/rest/list';
        BaseRequest.get('', url, callback)
    }
    //获取专辑类型
    application.get_albumType = function (callback) {
        var url = '/album/type/list';
        BaseRequest.get('', url, callback)
    }
    //获取唱片公司
    application.get_recordCompany = function (callback) {
        var url = '/recordcompanys/list4Select2';
        BaseRequest.get('', url, callback)
    }

    //下载歌曲
    application.get_album_download = function (param, callback) {
        var url = '/download';
        BaseRequest.get(param, url, callback, 'url')
    }
    //修改基本信息
    application.post_echo_baseInfo = function (param, callback) {
        var url = '/stst';
        BaseRequest.post(param, url, callback)
    }
    //预览回显信息
    application.get_album_echoInfo = function (param, callback) {
        var url = '/album/preview';
        BaseRequest.get(param, url, callback, 'url')
    }
    application.special_songs = function (param, callback) {
        var url = '/music/special/Songs'
        BaseRequest.post(param, url, callback)
    }
    //专辑下的单曲列表
    application.list_album_song = function (param, callback) {
        var url = '/album/song/list';
        BaseRequest.get(param, url, callback, 'url')
    }
    //从列表中选择单曲添加到专辑中
    application.add_song_from_list = function (param, callback) {
        var url = '/album/song/add';
        BaseRequest.post(param, url, callback)
    }


    return application;
})();
