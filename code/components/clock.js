class Clock extends HTMLElement {
    constructor() {
        super();
        
        const template = document.createElement('template');
    //     template.innerHTML = `
    //         <style>
            
    //         .datetime{
    //             color: #fff;
    //             background: #10101E;
    //             font-family: "Segoe UI", sans-serif;
    //             width: 250px;
    //             padding: 10px 5px;
    //             border-radius: 5px;
    //             transition: 0.5s;
    //             transition-property: background, box-shadow;
    //           }
              
              
    //           .date{
    //             font-size: 15px;
    //             text-align: center;
    //             letter-spacing: 3px;
    //           }
              
    //           .time{
    //             font-size: 30px;
    //             display: flex;
    //             justify-content: center;
    //             align-items: center;
    //           }
              
    //           .time span:not(:last-child){
    //             position: relative;
    //             margin: 0 6px;
    //             font-weight: 400;
    //             text-align: center;
    //             letter-spacing: 3px;
    //           }
              
    //           .time span:last-child{
    //             font-size: 30px;
    //             font-weight: 400;
    //             text-transform: uppercase;
    //           }
                    
            
    //         </style>

    //         <!--digital clock start-->
            
    // <div class="datetime">
    //   <div class="date">
    //     <span id="dayname">Day</span>,
    //     <span id="month">Month</span>
    //     <span id="daynum">00</span>,
    //     <span id="year">Year</span>
    //   </div>
    //   <div class="time">
    //     <span id="hour">00</span>:
    //     <span id="minutes">00</span>:
    //     <span id="seconds">00</span>
    //     <span id="period">AM</span>
    //   </div>
    // </div>
    // <!--digital clock end-->
    //     `;
        this.showInfo = true;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

    
    // updateClock(){
    //     var now = new Date();
    //     var dname = now.getDay(),
    //         mo = now.getMonth(),
    //         dnum = now.getDate(),
    //         yr = now.getFullYear(),
    //         hou = now.getHours(),
    //         min = now.getMinutes(),
    //         sec = now.getSeconds(),
    //         pe = "AM";
  
    //         if(hou >= 12){
    //           pe = "PM";
    //         }
    //         if(hou == 0){
    //           hou = 12;
    //         }
    //         if(hou > 12){
    //           hou = hou - 12;
    //         }
  
    //         Number.prototype.pad = function(digits){
    //           for(var n = this.toString(); n.length < digits; n = 0 + n);
    //           return n;
    //         }
  
    //         var months = ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
    //         var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //         var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
    //         var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];
    //         for(var i = 0; i < ids.length; i++)
    //         document.getElementById(ids[i]).firstChild.nodeValue = values[i];
    //   }
  
    //   initClock(){
    //     updateClock();
    //     window.setInterval("updateClock()", 1);
    //   }

}

    var myDate = new Date();
    var myDay = myDate.getDay();

    // get hour value.
    var hours = myDate.getHours();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var minutes = myDate.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var myTime = hours + " " + " : " + minutes + ampm;
    document.write(myTime);
    document.write("<br/>");
 

    // Array of days.
    var weekday = ['Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    
    var datewnotime = new Date(myDate.getTime());
    datewnotime.setHours(0, 0, 0, 0);

    var d = new Date(); d.setHours(0, 0, 0, 0);

    var d = new Date();
    datestring = '';


    datestring = (d.getMonth()+1) + '-' + d.getDate() + '-' + d.getUTCFullYear();
    
    
    document.write( weekday[myDay] + ", " + datestring);
    

    customElements.define('clock-time', Clock);