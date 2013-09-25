var DayString = [
	{'short':'sun','full':'sunday'},
	{'short':'mon','full':'monday'},
	{'short':'tue','full':'tuesday'},
	{'short':'wed','full':'wednesday'},
	{'short':'thu','full':'thursday'},
	{'short':'fri','full':'friday'},
	{'short':'sat','full':'saturday'}
];

var Day = function(date, event) {
	this.date = (arguments.length >= 1) ? date : new Date();
	this.year = this.date.getFullYear();
	this.month = this.date.getMonth();
	this.event = (arguments.length >= 2) ? event : "";
};

(function() {
	this.toNumber = function() {
		return this.date.getDate();
	};
	this.getDay = function(){
		return this.date.getDay();
	};
	this.toString = function() {
		return String(this.toNumber());
	};
	this.isToday = function() {
		return ( (new Date()).toDateString() === this.date.toDateString() )? true : false;
	};
	this.toShortString = function() {
		return DayString[this.getDay()]['short'];
	};
	this.toFullString = function() {
		return DayString[this.getDay()]['full'];
	};
	this.getHtml = function() {
		return "<div class='number'>" + this.toNumber() + "</div>" + "<div class='event'>" + this.event + "</div>";
	};
}).apply(Day.prototype);


function DayArray(startDate, arraylength) {
	var arr = [];
	var yy = startDate.getFullYear();
	var mm = startDate.getMonth();
	var dd = startDate.getDate();
	for (i=0; i < arraylength; i++) {
		arr.push(new Day(new Date(yy,mm,dd+i),""));
	}
	return arr;
}

var Month = function(year,month) {
	if (arguments.length >= 2) {
		this.year = year;
    	this.month = month - 1; //January is 1
	} else {
		var d = new Date();
		this.year = d.getFullYear();
		this.month = d.getMonth();
	}

	this.date = new Date(this.year, this.month, 1);
	this.firstDayOfWeek = this.date.getDay();
	this.lastDate = new Date(this.year, this.month+1, 0);
	this.lastDay = this.lastDate.getDate();
	this.lastDayOfWeek = this.lastDate.getDay();
	this.days = DayArray(this.date,this.lastDay);
};

(function() {
	this.toString = function() {
    	return this.days.toString(); // date object of this month
	};

	this.setEvents = function(events) {
		for (i = 0; i < this.days.length; i++) {
			if (events[i] != undefined) {
				this.days[i]['event'] = (i < events.length) ? events[i] : "";
			}
		}
	};

	this.getEvents = function() {
		var arr = [];
		for (i = 0; i < this.days.length; i++) {
			arr[i] = this.days[i]['event'];
		}
		return arr;
	};

	this.setYearMonth = function(year,month) {
		this.year = year;
		this.month = month;
		this.date.setFullYear(year);
		this.date.setMonth(month);
		this.firstDayOfWeek = this.date.getDay();
		this.lastDate = new Date(this.year, this.month+1, 0);
		this.lastDay = this.lastDate.getDate();
		this.lastDayOfWeek = this.lastDate.getDay();
		var events = this.getEvents();
		this.days = DayArray(this.date,this.lastDay);
		this.setEvents(events);
	};

	this.setYear = function(year) {
		this.setYearMonth(year,this.month);
	};

	this.setMonth = function(month) {
		this.setYearMonth(this.year,month);
	};

}).apply(Month.prototype);

var Calendar = function(year,month,events) {
	Month.apply(this,arguments);
	if (arguments.length >= 3) {
		this.setEvents(events);
	}
};

Calendar.prototype = new Month();

(function() {
	this.toLocaleDateString = function() {
	    return this.date.toLocaleDateString(); // date object of this month
	};

	this.toCaptionString = function() {
		return this.year + "`" + ("0" + (this.month + 1)).slice(-2);
	};

	this.getLastMonthDays = function() {
		return DayArray(new Date(this.year, this.month, 1- this.firstDayOfWeek), this.firstDayOfWeek);
	};

	this.getNextMonthDays = function() {
		return DayArray(new Date(this.year, this.month, this.lastDay + 1), 6 - this.lastDayOfWeek);
	};

	this.getCalendarDays = function() {
		return this.getLastMonthDays().concat(this.days).concat(this.getNextMonthDays());
	};

	this.getHtml = function() {
		var str = "<table class='calendar'>"
		+ "<caption><div>" + this.toCaptionString() + "</div></caption>"
		+ "<thead><tr><th class='sun'>sun</th><th class='mon'>mon</th><th class='tue'>tue</th><th class='wed'>wed</th><th class='thu'>thu</th><th class='fri'>fri</th><th class='sat'>sat</th></tr></thead>"
		+ "<tbody>";
		var days = this.getCalendarDays();
		for (i=0; i < days.length; i++) {

			humanDate = days[i].date.getFullYear() + '-' + (days[i].date.getMonth() + 1) + '-' + days[i].date.getDate();

			str += (days[i].getDay() === 0) ? "<tr class='week'>" : "";
			str += "<td class='day " + (days[i].isToday() ? " today " : "") + days[i].toShortString() + ((this.month==days[i]['month']) ? " currentMonth" : " otherMonth") + "' data-humandate='" + humanDate + "'>";
			str += days[i].getHtml();
			str += "</td>";
			str += (days[i].getDay()==6) ? "</tr>" : "";
		}
		str += "</tbody></table>";
		return str;
	};

	this.getHumanYear = function() {
		return this.year;		
	}
	
	this.getHumanMonth = function() {
		return this.month + 1;
	}
}).apply(Calendar.prototype);