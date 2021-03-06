/*
 * jQuery File Upload Plugin JS Example 6.7
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global $, window, document */

$(function () {
    'use strict';
   
    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload();
    $('#fileupload').bind('fileuploadcompleted',  
	function (e, data) {if(!data.result[0].error) 
						{ $("#Links").before('<li><a href="http://dev.codebender.cc/edit/'+(data.files[0].name).slice(0,-4)+'">'+(data.files[0].name).slice(0,-4)+'</a></li>');}
						else{  $('#fileupload').fileupload().data('fileupload')._disableFileInputButton(); 
							   $('.btn.btn-warning').click(function (e) { $('.template-download.fade.in').remove(); $('#fileupload').fileupload().data('fileupload')._enableFileInputButton(); }); }
		} );
	$('#fileupload').bind('fileuploadfailed',  
	function (e, data) {// $('#fileupload').fileupload().data('fileupload')._disableFileInputButton(); 
							   $('.btn.btn-warning').click(function (e) { $('.template-download.fade.in').remove(); /*$('#fileupload').fileupload().data('fileupload')._enableFileInputButton();*/ }); 
		} );
	
	
	
		
    // Enable iframe cross-domain access via redirect option: 
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    if (window.location.hostname === 'blueimp.github.com') {
        // Demo settings:
        $('#fileupload').fileupload('option', {
            url: '//jquery-file-upload.appspot.com/',
            maxFileSize: 5000000,
            acceptFileTypes: /(\.|\/)(pde|ino)$/i,  /*/.+$/i,*/
            process: [
                {
                    action: 'load',
                    fileTypes: /^image\/(gif|jpeg|png)$/,
                    maxFileSize: 20000000 // 20MB
                },
                {
                    action: 'resize',
                    maxWidth: 1440,
                    maxHeight: 900
                },
                {
                    action: 'save'
                }
            ]
        });
        // Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            $.ajax({
                url: '//jquery-file-upload.appspot.com/',
                type: 'HEAD'
            }).fail(function () {
                $('<span class="alert alert-error"/>')
                    .text('Upload server currently unavailable - ' +
                            new Date())
                    .appendTo('#fileupload');
            });
        }
    } else {
        // Load existing files:
        $('#fileupload').each(function () {
            var that = this;
            $.getJSON(this.action, function (result) {
                if (result && result.length) {
                    $(that).fileupload('option', 'done')
                        .call(that, null, {result: result});
                }
            });
        });
    }

});
