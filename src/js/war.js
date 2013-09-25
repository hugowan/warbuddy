var URL_RSS		= 'https://spreadsheets.google.com/feeds/list/0Avy8MPpnUhZvdF9iODVCTGZJTUpfR2pRZ3lKa09nc0E/od6/public/basic?alt=rss';
var URL_CATCH	= 'http://warsystem.oa.tvb.com/employee_projectstatus.php';
var URL_SUBMIT	= 'http://warsystem.oa.tvb.com/timesheet_process.php';
var TEMPLATE	= '<div id="buddy-wrapper"><div id="buddy-fixed"><div id="buddy-head"></div><div id="buddy-neck"><div id="neck-previous"><span>PREV</span></div><div id="neck-next"><span>NEXT</span></div></div><div id="buddy-hand"><input type="radio" id="ups1" name="handups" value="1" checked><label for="ups1">REPLACE</label><input type="radio" id="ups2" name="handups" value="2"><label for="ups2">INHERIT</label></div><div id="buddy-submit"><span>SUBMIT</span></div><div id="buddy-brain"><div class="title"><span>LOGs</span></div><div class="content"><ul id="buddy-memories"></ul></div></div></div><div id="buddy-float"><div id="buddy-stomach"><div class="control" id="buddy-mouth"></div><div class="content"><div id="rs-time"><select name="time"><option value=""></option><option value="0.5">0.5</option><option value="1.0">1.0</option><option value="1.5">1.5</option><option value="2.0">2.0</option><option value="2.5">2.5</option><option value="3.0">3.0</option><option value="3.5">3.5</option><option value="4.0">4.0</option><option value="4.5">4.5</option><option value="5.0">5.0</option><option value="5.5">5.5</option><option value="6.0">6.0</option><option value="6.5">6.5</option><option value="7.0">7.0</option><option value="7.5">7.5</option><option value="8.0">8.0</option><option value="8.5">8.5</option><option value="9.0">9.0</option><option value="9.5">9.5</option><option value="10.0">10.0</option><option value="10.5">10.5</option><option value="11.0">11.0</option><option value="11.5">11.5</option><option value="12.0">12.0</option><option value="12.5">12.5</option><option value="13.0">13.0</option><option value="13.5">13.5</option><option value="14.0">14.0</option><option value="14.5">14.5</option><option value="15.0">15.0</option><option value="15.5">15.5</option><option value="16.0">16.0</option><option value="16.5">16.5</option><option value="17.0">17.0</option><option value="17.5">17.5</option><option value="18.0">18.0</option><option value="18.5">18.5</option><option value="19.0">19.0</option><option value="19.5">19.5</option><option value="20.0">20.0</option><option value="20.5">20.5</option><option value="21.0">21.0</option><option value="21.5">21.5</option><option value="22.0">22.0</option><option value="22.5">22.5</option><option value="23.0">23.0</option><option value="23.5">23.5</option><option value="24.0">24.0</option></select></div><div id="rs-activity"><select name="activity"><option value=""></option><optgroup label="Admin"><option value="27">Annual Leave</option><option value="26">Compensation Leave</option><option value="14">Corporate Services</option><option value="12">General</option><option value="13">Sick Leave</option><option value="15">Team Management</option></optgroup><optgroup label="Operation"><option value="3">AV Editing</option><option value="8">Change &amp; Problem Management</option><option value="1">Content Preparation</option><option value="4">Customer Services</option><option value="30">Infrastructure Related Activity</option><option value="6">PC / LAN Support</option><option value="11">Periodic Content Development</option><option value="9">Product &amp; Release Maintenance</option><option value="10">Q.A. on Changes</option><option value="2">Sales Support</option><option value="7">Tech Support</option><option value="5">Website Maintenance</option></optgroup><optgroup label="Others"><option value="16">Business Development</option><option value="18">Marketing Support</option><option value="17">R &amp; D</option></optgroup><optgroup label="Project"><option value="24">Documentation</option><option value="21">Pre-Project Support</option><option value="25">Project Management</option><option value="23">Quality Assurance</option><option value="19">Software Development</option><option value="20">System Design &amp; Analysis</option><option value="28">UI Design</option><option value="22">Unit &amp; System Test</option></optgroup></select></div><div id="rs-project"><select name="project"><option value=""></option><option value="12">AD Tech - Middleware</option><option value="10">AD Tech - Mobile Ads</option><option value="11">AD Tech - Web Ads</option><option value="16">CDN - Framework</option><option value="20">Common Software Component</option><option value="2">Corporate Site</option><option value="17">Device / Network Sensitive Ad Dispatching</option><option value="18">E-Zone Phase 1</option><option value="19">E-Zone Phase 2</option><option value="8">eNews</option><option value="23">Event Site</option><option value="33">Game integration</option><option value="1">Home Entertainment</option><option value="4">HTC Data Feed</option><option value="14">Infrastructure Upgrade - Video Quality &amp; Live Streaming</option><option value="13">Infrastructure Upgrade - VIPO</option><option value="3">Live Event Voting</option><option value="22">Mini Site</option><option value="5">myTV - HD</option><option value="32">myTV - Macau</option><option value="30">myTV - SC version</option><option value="31">myTV - SmartTV porting</option><option value="29">myTV - TVBC co-operation</option><option value="25">myTV - Win 8 metro</option><option value="24">myTV 2.9</option><option value="9">myTV app - Take Over</option><option value="28">myTV Overseas (other than PRC)</option><option value="6">News 1.2</option><option value="7">News 2.0</option><option value="34">Nielsen Reporting</option><option value="21">PP</option><option value="15">Video Platform Infrastructure Upgrade</option><option value="27">WorldCup-Brazil 2014</option><option value="26">WorldCup-Conferderation/U20</option></select></div><textarea name="comments"></textarea></div></div><ul id="buddy-abdomen"></ul></div></div>';
var CAL 		= new Calendar();
// var SUB_STATUS	= 'Save to Draft'; // Submit / Save to Draft
var SUB_STATUS	= 'Submit'; // Submit / Save to Draft

var warBuddy = {

	getName: function() {
		var text = $('.header_bg').find('table tbody tr:eq(3) td').text();
		return /\s\s\w+\s\w+/.exec(text)[0].trim();
	},

	getPast: function(date) {
		var date = date || '';

		if (date != '') {
			var rs_string = '';

			$.ajax({
				url: URL_CATCH,
				type: 'post',
				data: {date: date},
				async: false,
				success: function(data) {
					// split war javascript data
					var records = data.match(/presetRecord\([^\)]*\);/g);

					if (records != null) {
						$.each(records, function(k ,v){
							var params	= v.match(/("(?:[^"\\]|(?:\\\\)|(?:\\\\)*\\.{1})*")/g);
							var rs 		= {};
							var text	= '';

							$.each(params, function(key, val){
								text = val.substring(0, val.length - 1).substring(1);

								switch(key) {
									case 0: rs['id[]'] = text; break;
									case 4: rs['time_spent[]'] = text; break;
									case 1: rs['activity_id[]'] = text; break;
									case 2: rs['project_id[]'] = text; break;
									case 3: rs['comments[]'] = text; break;
									// case 5: rs['status[]'] = text; break;
								}
							})
							rs_string += '&' + $.param(rs);
						})
					}
				}
			})
			return rs_string;
		}
	},

	verify: function(login) {
		var is_exist = false;

		$.ajax({
			url: URL_RSS,
			dataType: 'xml',
			async: false,
			success: function(xml) {
				$('item', xml).each(function(k){
					desc = $(this).find('description').text();
					if (desc.indexOf(login) > 0) {
						is_exist = true;
					}
				})
			}
		});

		return is_exist;
	},

	buildBody: function() {
		$('head').html('');
		$('body').html(TEMPLATE);

		$("#rs-activity > select").minimalect({'placeholder': 'Activity'});
		$("#rs-project > select").minimalect({'placeholder': 'Project'});
		$("#rs-time > select").minimalect({'placeholder': 'Time'});
	},

	buildCalendarAction: function() {
		$neck_previous	= $('#neck-previous');
		$neck_next		= $('#neck-next');
		$buddy_head		= $('#buddy-head');

		$(document).on('click', '#buddy-wrapper td', function(){
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
			} else {
				$(this).addClass('selected');
			}
		})
		
		$neck_previous.click(function() {
			var y = CAL.getHumanYear();
			var m = CAL.getHumanMonth();
			
			if (m == 1) {
				CAL.setYear(y - 1);
				CAL.setMonth(11);
			} else {
				CAL.setMonth(m - 2);
			}
			
			$.reloadCalendar();
		});

		$neck_next.click(function() {
			var y = CAL.getHumanYear();
			var m = CAL.getHumanMonth();

			if (m == 12) {
				CAL.setYear(y + 1);
				CAL.setMonth(0);
			} else {
				CAL.setMonth(m);
			}

			$.reloadCalendar();
		});

		$.reloadCalendar = function() {
			$buddy_head.html(CAL.getHtml());
		}

		$.reloadCalendar();
	},

	buildFormAction: function() {
		var root 		= this;

		$buddy_head		= $('#buddy-head');
		$buddy_abdomen	= $('#buddy-abdomen');
		$buddy_mouth	= $('#buddy-mouth');
		$buddy_submit	= $('#buddy-submit');

		$rs_time		= $('select[name=time]');
		$rs_activity	= $('select[name=activity]');
		$rs_project		= $('select[name=project]');
		$rs_comment		= $('textarea[name=comments]');

		// NEW QUEUE
		$(document).on('click', '#buddy-mouth', function(){
			var time 		= $rs_time.find(':selected').val();
			var activity 	= $rs_activity.find(':selected').val();
			var activity_t 	= $rs_activity.find(':selected').text();
			var project 	= $rs_project.find(':selected').val();
			var project_t 	= $rs_project.find(':selected').text();
			var comment 	= $rs_comment.val();

			if (time == '') {
				root.actionAlert('TIME EMPTY JOR LOR!!');
				return false;
			}

			if (activity == '') {
				root.actionAlert('ACTIVITY EMPTY JOR LOR!!');
				return false;
			}

			var rs = {};
			rs['id[]']			= '';
			rs['time_spent[]']	= time;
			rs['activity_id[]']	= activity;
			rs['project_id[]']	= project;
			rs['comments[]']	= comment;
			var rs_string 		= $.param(rs);

			var food = $('<li />');
			var control = $('<div />').attr({'class': 'control'});
			var content = $('<div />').attr({'class': 'content'})
			.append($('<div />').attr({'class': 'activity'}).text(activity_t))
			.append($('<div />').attr({'class': 'project'}).text(project_t))
			.append($('<div />').attr({'class': 'comment'}).text(comment))
			.append($('<div />').attr({'class': 'time'}).text(time))
			.append($('<input />').attr({'type': 'hidden'}).val(rs_string));

			food.append(control).append(content);
			
			$buddy_abdomen.prepend(food);
			$.clearSubmit();
		});
		
		// REMOVE QUEUE
		$(document).on('click', '#buddy-abdomen .control', function(){
			$(this).parent().find('.content').remove();
			$(this).parent().animate({'width': '35px'}, 700).fadeOut(300, function(){
				$(this).remove();
			});
		});

		// CLEAR, WHEN NEW
		$.clearSubmit = function() {
			$('select[name=time]').prop('selectedIndex', 0);
			$('select[name=activity]').prop('selectedIndex', 0);
			$('select[name=project]').prop('selectedIndex', 0);

			$('#rs-time').find('input').attr('placeholder', 'Time').val('');
			$('#rs-activity').find('input').attr('placeholder', 'Activity').val('');
			$('#rs-project').find('input').attr('placeholder', 'Project').val('');

			$rs_comment.val('');
		}

		// SUBMIT TO WAR
		$buddy_submit.click(function(){
			var tasks 		= '';
			var tasks_count = 0;

			console.log('CLICK SIBMIT');

			// submit method (1 = replace / 2 = inherit)
			var handups = $('input[name=handups]:checked').val();



			// CATCH TASK
			$buddy_abdomen.find('input').each(function(k, v){
				tasks += '&' + $(this).val();
				tasks_count++;
			});

			if (tasks_count < 1) {
				root.actionAlert('WHAT 7 U SUBMIT!?');
			}

			// CATCH DATE
			$('#buddy-wrapper td').each(function(){
				if ($(this).hasClass('selected')) {
					var humandate = $(this).data('humandate');
					
					tasks += '&date=' + humandate + '&Submit=' + SUB_STATUS;

					// needs inherit
					if (handups == 2) {
						past_record = root.getPast(humandate);

						if (past_record != '') {
							tasks += past_record;
						}
						console.log(tasks);
					}

					$.post(URL_SUBMIT, tasks, function(results){
						root.actionFinish(humandate + ' / ' + tasks_count + ' TASKs / Added');
					});
				}
			});
		});
	},

	actionFinish: function(msg) {
		var msg = msg || '';
		$buddy_memories = $('#buddy-memories');
		$('#buddy-memories').prepend($('<li />').html(msg));
	},

	actionAlert: function(msg) {
		var msg = msg || '';

		$('.buddy-alert').remove();
		$('body').prepend($('<div />').attr({'class':'buddy-alert'}).html(msg));
		$('.buddy-alert').animate({'top':'8px', easing: 'swing'}).delay(500).fadeOut(400);
	},

	init: function() {
		$wpn_menu		= $('.wpn_menu');
		$wpn_content	= $('.wpn_content');

		var root 		= this;
		var btn_buddy 	= '<li><a href="" id="btn_buddy">WarBuddy</a></li>';
		var buddy		= '<div id="buddy"></div>';
		var login		= root.getName();

		console.log(login);

		if (root.verify(login) == false) {
			console.log('WAR FAIL');
			return false;
		}

		if ($wpn_menu.length) {
			console.log('WAR START');

			// APPEND WAR BUTTON
			$wpn_menu.find('ul').append(btn_buddy);

			// START WAR
			$(document).on('click', '#btn_buddy', function(e){
				e.preventDefault();
				
				root.buildBody();
				root.buildCalendarAction();
				root.buildFormAction();
				root.builddSubmitAnimate();
			});
		}
	},

	builddSubmitAnimate: function(){
		var root = this;
	
		// non-functional effect
		$('#buddy-submit').hover(function(){
			root.submitAnimate();
		}, function(){
			$(this)
			.children()
			.stop(true)
			.animate({'margin-top':8});
		});
	},

	submitAnimate: function(){
		var root = this;

		$('#buddy-submit > span')
		.animate({'margin-top':0})
		.animate({'margin-top':8}, 400, function(){
			root.submitAnimate();
		});
	}
}

$(function(){
	warBuddy.init();
	// warBuddy.getPast('2013-01-01');
	t = warBuddy.getPast('2013-06-24');
	console.log(t);
	
})


// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', 'UA-42749313-1']);
// _gaq.push(['_trackPageview']);

// (function() {
//   var ga = document.createElement('script');
//   ga.type = 'text/javascript';
//   ga.async = true;
//   ga.src = 'https://ssl.google-analytics.com/ga.js';
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(ga, s);
// })();

