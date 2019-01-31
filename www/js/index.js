var curDate;
var prev;
Date.prototype.getWeek = function() {
    var dt = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - dt) / 86400000) + dt.getDay()+1)/7);
};
function init(){	
	prev = false;
	date = new Date();	
	var mm = date.getMonth();
	var yyyy = date.getFullYear();		
	curDate = date;	
	fill_calender(curDate);
	show_buttons(curDate);		
	show_leave(mm,yyyy,'leave');
	if(mm==0){
		mm=11;
		--yyyy;
	}
	else{
		--mm;
	}
	show_leave(mm,yyyy,'leave_prev');
}
function show_leave(mm,yyyy,id){
	//console.log(mm,yyyy,id);
	var date = new Date(yyyy,mm,1);
	num_days = number_of_days_in_month(date);
	console.log(id+"_s");
	console.log(id+"_p");	
	El = document.getElementById(id);
	Elp = document.getElementById(id+"_p");	
	Els = document.getElementById(id+"_s");
	Elsal = document.getElementById(id+"_sal");	
	Els.innerHTML = code_to_month(mm)+" "+yyyy;
	var cnt = 0.0;
	for(n = 1;n<=num_days;++n){
		var newdate = new Date(yyyy,mm,n);
		b = window.localStorage.getItem(get_date_str_v(newdate)+'b');	
		d = window.localStorage.getItem(get_date_str_v(newdate)+'d');	
		if(b == 'true')
			cnt+=0.5;
		if(d == 'true')
			cnt+=0.5;
	}
	El.innerHTML = cnt.toString();
	remcnt = Math.max(0.0,cnt-4.0);
	salary = Math.ceil((1-(remcnt/num_days))*4000);
	Elsal.innerHTML = salary.toString()+" /-";
	if(cnt<3)
		Elp.style.backgroundImage = 'linear-gradient(#43A047,#2E7D32)';
	else if(cnt<=4)
		Elp.style.backgroundImage = 'linear-gradient(#FF9800,#F57C00)';
	else
		Elp.style.backgroundImage = 'linear-gradient(#F44336,#E53935)';
}
function show_buttons(date){	
	b = window.localStorage.getItem(get_date_str_v(date)+'b');	
	d = window.localStorage.getItem(get_date_str_v(date)+'d');	
	b_button = document.getElementById("breakfast");
	d_button = document.getElementById("dinner");		

	if(b == 'true'){	
	b_button.innerHTML = "<b>Done</b>";
	b_button.disabled = true;
	}
	else{
	b_button.innerHTML = "<b>Breakfast</b>";
	b_button.disabled = false;	
	}
	if(d == 'true'){	
	d_button.innerHTML = "<b>Done</b>";
	d_button.disabled = true;
	}	
	else{
	d_button.innerHTML = "<b>Dinner</b>";
	d_button.disabled = false;
	}
}
function date_click(el){	
	//console.log(el.id);	
	DateEl = document.getElementsByClassName("dates");		
	for(i=0;i<DateEl.length;++i){
		TdEl = DateEl[i].getElementsByTagName("td");		
		for(j=0;j<TdEl.length;++j)
			if(TdEl[j].classList.contains('active'))
				TdEl[j].classList.remove('active');			
	}
	if(!el.classList.contains('active'))
		el.classList.add('active');		
	date = new Date();
	var mm = date.getMonth();
	var yyyy = date.getFullYear();	
	if(prev == true){
		if(mm==0){
		mm=11;
		--yyyy;
		}
		else{
		--mm;
		}
	}
	newdate = new Date(yyyy,mm,el.id);
	show_buttons(newdate);	
	fill_calender(newdate);
	if(prev == false)
		curDate = newdate;	
}
function month_change(code){
	date = new Date();
	var mm = date.getMonth();
	var yyyy = date.getFullYear();		
	if(code == 'prev'){				
	prev = true;
	if(mm==0){
		mm=11;
		--yyyy;
	}
	else{
		--mm;
	}	
	}
	else{
		prev = false;
	}
	date = new Date(yyyy,mm,1);
	fill_calender(date);
}
function reset_calendar(DateEls){
	for(i=0;i<DateEls.length;++i){		
		Tds = DateEls[i].getElementsByTagName("td");	
		for(j=0;j<Tds.length;++j){
			Tds[j].innerHTML = "";
			Tds[j].style.border = "none";			
			Tds[j].id = "";
			Tds[j].onclick = 'None';
			if(Tds[j].classList.contains('active'))
				Tds[j].classList.remove('active');
		}
	}
}
function fill_calender(today){
var dd = today.getDate();
var mm = today.getMonth();
var yyyy = today.getFullYear();
console.log(yyyy,mm,dd);		
document.getElementById("monthyear").innerHTML = code_to_month(mm)+" "+yyyy.toString();
num_days = number_of_days_in_month(today);
DateEls = document.getElementsByClassName("dates");
var xdate = new Date(yyyy,mm,1);
baseWeek = xdate.getWeek(); 
reset_calendar(DateEls);
for(n = 1;n<=num_days;++n){
	date = new Date(yyyy,mm,n);	
	i = date.getWeek()-baseWeek+1;
	j = date.getDay();	
	//console.log(i-1,j);
	DateEl = DateEls[i-1];	
	b = window.localStorage.getItem(get_date_str_v(date)+'b');	
	d = window.localStorage.getItem(get_date_str_v(date)+'d');
	Td = DateEl.getElementsByTagName("td")[j];		
	if(b == 'true' && d == 'true')
		Td.style.border = "1px solid white";
	else if(b == 'true' || d == 'true')		
		Td.style.border = "1px dotted white";		
	Td.innerHTML = n.toString();		
	Td.id = n.toString();
	Td.onclick = function(){date_click(this);};
	if(Td.classList.contains('active'))
			Td.classList.remove('active');
	if(dd == n && prev == false)
		if(!Td.classList.contains('active'))
			Td.classList.add('active');
	}
}
function get_date_str(){
var today = new Date();
var dd = today.getDate();
var mm = today.getcode_();
var yyyy = today.getFullYear();	
return yyyy+"/"+mm+"/"+dd;
}
function get_date_str_v(today){
var dd = today.getDate();
var mm = today.getMonth();
var yyyy = today.getFullYear();	
return yyyy+"/"+mm+"/"+dd;
}
function get_type_from_id(id){
	if(id == "breakfast")
		return 'b';
	if(id == "dinner")
		return 'd';
	return 'x';
}
function add_to_db(type){
	//window.localStorage.getItem(get_week_total_timestr());
	window.localStorage.setItem(get_date_str_v(curDate)+type,"true");	
}
function meal(el){		
	if(prev == false){
	el.disabled = true;
	add_to_db(get_type_from_id(el.id));
	show_buttons(curDate);	
	show_leave(curDate.getMonth(),curDate.getFullYear(),"leave");
	el.disabled = false;
	}
}
function code_to_month(code){
	if(code == '0')
		return "January";
	if(code == '1')
		return "February";
	if(code == '2')
		return "March";
	if(code == '3')
		return "April";
	if(code == '4')
		return "May";
	if(code == '5')
		return "June";
	if(code == '6')
		return "July";
	if(code == '7')
		return "August";
	if(code == '8')
		return "September";
	if(code == '9')
		return "October";
	if(code == '10')
		return "November";
	if(code == '11')
		return "December";
}
function number_of_days_in_month(anyDateInMonth){
    return new Date(anyDateInMonth.getFullYear(), 
                    anyDateInMonth.getMonth()+1, 
                    0).getDate();
}
function reset_data(){
	window.localStorage.clear();	
	init();
}