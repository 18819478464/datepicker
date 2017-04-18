var calendar = {
	init(json){
		this.currentYear = document.querySelector(".currentYear");
		this.currentMonth = document.querySelector(".currentMonth");
		this.prevMonth = document.querySelector(".prevMonth");
		this.nextMonth = document.querySelector(".nextMonth");
		this.calen = document.querySelector(".calendar");
		this.yearWrap = document.querySelector(".yearWrap");
		this.current = document.querySelector(".current");
		this.yearArr = json.years || [1932,2017];//年份数组
		this.afterSelect = json.afterSelect;//选择后回调
		this.selectedValue = [];//选中的日期
		this.singleSelect = json.singleSelect;
		var currentYear = this.currentYear;
		var currentMonth = this.currentMonth;
		var nextMonth = this.nextMonth;
		var prevMonth = this.prevMonth;
		var calen = this.calen;
		var yearWrap = this.yearWrap;
		var current = this.current;
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var days = date.getDate();
		var weekNum = this.getWeek(date);//获取当天星期几
		var oneDays = this.getWeek(new Date(year,month - 1,1));//获取当月1号星期几
		var monthDays= this.getDays(year,month);//获取当月有多少天
		currentYear.innerHTML = year;
		currentMonth.innerHTML = month;
		this.getList(oneDays,monthDays);
		this.setYears();
		nextMonth.addEventListener("click",this.changeNextMonth.bind(this,date),false);
		prevMonth.addEventListener("click",this.changePrevMonth.bind(this,date),false);
		calen.addEventListener("click",this.changeRadius.bind(this),false);
		yearWrap.addEventListener("click",this.changeYear.bind(this),false);
		current.addEventListener("click",this.openYear.bind(this),false);
	},
	//当天星期几
	getWeek(week){
		var day = week.getDay();
		var num = 0;
		switch (day){  
	        case 0 :  
			        num = 0;
	                break;  
	        case 1 :  
			        num = 1;
	                break;  
	        case 2 :  
			        num = 2;
	                break;  
	        case 3 :  
			        num = 3;
	                break;  
	        case 4 :  
			        num = 4;
	                break;  
	        case 5 :  
			        num = 5;
	                break;  
	        case 6 :  
			        num = 6;
	                break;  
		}
		return num; 
	},
	//当月一共多少天
	getDays(curYear,curMonth){
		var curDate = new Date(curYear,curMonth);
		curDate.setMonth(curMonth);
		curDate.setDate(0);
		return curDate.getDate();
	},
	//年份设置
	setYears(){
		var year = new Date().getFullYear();
		var yearWrap = this.yearWrap;
		yearWrap.innerHTML = "";
		var startYear = this.yearArr[0];
		var len = this.yearArr[1] - startYear;
		for(var i = 0;i <= len;i++){
			var div = document.createElement('div');
			div.innerHTML = startYear + i;
			if(year == startYear + i){
				div.classList.add('active');
				div.classList.add('current');
			}
			yearWrap.appendChild(div);
		}

	},
	//日期列表
	getList(oneDays,monthDays){
		var currentYear = this.currentYear.innerHTML * 1;
		var currentMonth = this.currentMonth.innerHTML * 1;
		var calen = this.calen;
		var currentDate = new Date();
		var year = currentDate.getFullYear();
		var month = currentDate.getMonth() + 1;
		var days = currentDate.getDate();
		var dayIndex = 1;
		calen.innerHTML = "";
		for(var i = 1; i <= 42; i++){
			if(i > oneDays && dayIndex <= monthDays){
				var div = document.createElement("div");
				var span = document.createElement("span");
				div.classList.add('pickerYesDay');
				if(currentYear == year && currentMonth == month && dayIndex == days){
					div.classList.add('current');
				}
				span.innerHTML = dayIndex;
				dayIndex++;
				div.appendChild(span);
				calen.appendChild(div);
			}else if(i <= oneDays){
				var div = document.createElement("div");
				var span = document.createElement("span");
				div.classList.add('pickerLastDay');
				span.innerHTML = '';
				div.appendChild(span);
				calen.appendChild(div);
			}else{
				var div = document.createElement("div");
				var span = document.createElement("span");
				div.classList.add('pickerNextDay');
				span.innerHTML = '';
				div.appendChild(span);
				calen.appendChild(div);
			}
		}
		var preMonthDays= this.getDays(currentYear,currentMonth-1);//获取上一个月有多少天
		var pickerLastDay = document.querySelectorAll('.pickerLastDay');
		var len = pickerLastDay.length;
		var lastStartNum = preMonthDays - pickerLastDay.length + 1;
		for(var i = 0; i < len;i++){
			pickerLastDay[i].querySelector("span").innerHTML = lastStartNum++ ;
		}

		var nextMonthDays= this.getDays(currentYear,currentMonth+1);//获取下一个月有多少天
		var pickerNextDay = document.querySelectorAll('.pickerNextDay');
		var len = pickerNextDay.length;
		var nextStartNum = 1;
		for(var i = 0; i < len;i++){
			pickerNextDay[i].querySelector("span").innerHTML = nextStartNum++ ;
		}
	},
	//下一个月
	changeNextMonth(dateObj,event){
		var evt = window.event || event;
		var type = evt.target.dataset.type;
		var currentMonth = this.currentMonth;
		var currentMonthNum = currentMonth.innerHTML * 1;
		if(currentMonthNum >= 12){
			return false;
		}
		currentMonthNum += 1;
		currentMonth.innerHTML = currentMonthNum;
		var year = this.currentYear.innerHTML * 1;
		var oneDays = this.getWeek(new Date(year,currentMonthNum - 1,1));
		var monthDays= this.getDays(year,currentMonthNum);
		this.getList(oneDays,monthDays);
		this.selectedValue = []

	},
	//上一个月
	changePrevMonth(event){
		var evt = window.event || event;
		var type = evt.target.dataset.type;
		var currentMonth = this.currentMonth;
		var currentMonthNum = currentMonth.innerHTML * 1;
		if(currentMonthNum <= 1){
			return false;
		}
		currentMonthNum -= 1;
		currentMonth.innerHTML = currentMonthNum;
		var year = this.currentYear.innerHTML * 1;
		var oneDays = this.getWeek(new Date(year,currentMonthNum - 1,1));
		var monthDays= this.getDays(year,currentMonthNum);
		this.getList(oneDays,monthDays);
		this.selectedValue = []

	},
	//选中状态
	changeRadius(event){
		var evt = window.event || event;
		var target = evt.target;
		if(target.tagName.toLowerCase() == 'span'){
			target = target.parentNode;
		}
		if(target.classList.contains('pickerYesDay')){
			var val = target.children[0].innerHTML;
			var yearVal = this.currentYear.innerHTML;
			var monthVal = this.currentMonth.innerHTML;
			if(this.singleSelect){
				var pickerYesDay = document.querySelectorAll('.pickerYesDay');
				var len = pickerYesDay.length;
				for(var i = 0; i < len; i++){
					pickerYesDay[i].classList.remove('active');
				}
				target.classList.add('active');
				this.selectedValue = [];
				this.selectedValue.push(yearVal+'-'+monthVal+'-'+val);
				this.afterSelect(this.selectedValue);//执行回调函数
			}else{
				if(target.classList.contains('active')){
					target.classList.remove("active");
					for(var i = 0;i < this.selectedValue.length;i++){
						var index = this.selectedValue.indexOf(yearVal+'-'+monthVal+'-'+val);
						if(index != -1){
							this.selectedValue.splice(index,1);
						}
					}
				}else{
					target.classList.add("active");
					this.selectedValue.push(yearVal+'-'+monthVal+'-'+val);
				}
				this.afterSelect(this.selectedValue);//执行回调函数
			}
			
		}

	},
	//打开年份选择
	openYear(){
		var yearWrap = this.yearWrap;
		if(yearWrap.classList.contains('yearWrapMove')){
			yearWrap.classList.remove('yearWrapMove');
		}else{
			yearWrap.classList.add('yearWrapMove');
		}
	},
	//改变年份
	changeYear(event){
		var evt = window.event || event;
		var target = evt.target;
		var allDiv = this.yearWrap.querySelectorAll('div');
		var len = allDiv.length;
		for(var i = 0;i < len;i++){
			allDiv[i].classList.remove('active');
		}
		target.classList.add('active');
		var year = target.innerHTML;
		var yearWrap = this.yearWrap;
		var currentYear = this.currentYear;
		var currentMonthNum = this.currentMonth.innerHTML;
		var oneDays = this.getWeek(new Date(year,currentMonthNum - 1,1));
		var monthDays= this.getDays(year,currentMonthNum);
		currentYear.innerHTML = year;
		this.getList(oneDays,monthDays);
		yearWrap.classList.remove('yearWrapMove');
		this.selectedValue = []
	},
}