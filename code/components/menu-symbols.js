/* global HTMLElement, customElements */

class MenuSymbols extends HTMLElement {
  constructor () {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
        <style>
   
   
        #menuToggle
        {
          display: block;
          position: absolute;
          bottom: 0;
          left: 15px;
          
          z-index: 1;
          
          -webkit-user-select: none;
          user-select: none;
        }
        
        #menuToggle a
        {
          text-decoration: none;
          color: #232323;
          
          transition: color 0.3s ease;
        }
        
        #menuToggle a:hover
        {
          color: tomato;
        }
        
        
        #menuToggle input
        {
          display: block;
          width: 40px;
          height: 32px;
          position: absolute;
          top: -7px;
          left: -5px;
          
          cursor: pointer;
          
          opacity: 0; /* hide this */
          z-index: 2; /* and place it over the hamburger */
          
          -webkit-touch-callout: none;
        }
        
        /*
         * Just a quick hamburger
         */
        #menuToggle span
        {
          display: block;
          width: 33px;
          height: 4px;
          margin-bottom: 5px;
          position: relative;
          
          background: #cdcdcd;
          border-radius: 3px;
          
          z-index: 1;
          
          transform-origin: 4px 0px;
          
          transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                      background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                      opacity 0.55s ease;
        }
        
        #menuToggle span:first-child
        {
          transform-origin: 0% 0%;
        }
        
        #menuToggle span:nth-last-child(2)
        {
          transform-origin: 0% 100%;
        }
        
        /* 
         * Transform all the slices of hamburger
         * into a crossmark.
         */
        #menuToggle input:checked ~ span
        {
          opacity: 1;
          transform: rotate(45deg) translate(-2px, -1px);
          background: #232323;
        }
        
        /*
         * But let's hide the middle one.
         */
        #menuToggle input:checked ~ span:nth-last-child(3)
        {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }
        
        /*
         * Ohyeah and the last one should go the other direction
         */
        #menuToggle input:checked ~ span:nth-last-child(2)
        {
          transform: rotate(-45deg) translate(0, -1px);
        }
        
        #menu
        {
            position: absolute;
            bottom: 0;
            left: 30px;
            color: black;
            border: 1px solid black;
            width: 300px;
            height: 150px;
            padding: 10px;
            border-radius: 3px;
            font-family: "Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif;
            line-height: 50px;
            list-style-type: none;
            -webkit-font-smoothing: antialiased;
            /* to stop flickering of text in safari */
            
            transform-origin: 0% 0%;
            transform: translate(-300%, 0);
            
            transition-duration: 0.5s;
            transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        }
        
        
        /*
         * And let's slide it in from the left
         */
        #menuToggle input:checked ~ ul
        {
          transform: none;
        }
     
        table tr th {
            font-size: 10px;
            padding-right: 50px;
            text-align: left;
        }
       
       
        i {
            padding-right: 10px;  
        }

        </style>
     
            <nav role="navigation">
            <div id="menuToggle">
                <!--
                A fake / hidden checkbox is used as click reciever,
                so you can use the :checked selector on it.
                -->
                <input type="checkbox" />
                
                <!--
                Some spans to act as a hamburger.
                
                They are acting like a real hamburger,
                not that McDonalds stuff.
                -->
                <span></span>
                <span></span>
                <span></span>
                
                
                <ul id="menu">
                <table>
                <tr>
                    <th><i class="fa fa-home"></i>Task Incomplete</th>
                    <th><i class="fa fa-search"></i>Task Complete</th>
                </tr>
                <tr>
                    <th><i class="fa fa-cloud"></i>Task Migrated</th>
                    <th><i class="fa fa-trash"></i>Task Scheduled</th>
                </tr>
                <tr>
                    <th><i class="fa fa-cloud"></i>Events</th>
                    <th><i class="fa fa-trash"></i>Priority</th>
                </tr>
                </table>
                </ul>
            </div>
            </nav>
        `;

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  myFunction () {
    document.getElementById('menu').classList.toggle('show');
  }
}

customElements.define('menu-symbol', MenuSymbols);